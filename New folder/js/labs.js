document.addEventListener('DOMContentLoaded', () => {
    const tabs = [...document.querySelectorAll('[data-lab-tab]')];
    const panels = [...document.querySelectorAll('[data-lab-panel]')];
    const editors = new Map();
    const defaults = new Map();
    const renderPreview = (value) => {
        const source = value.replace(/<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '');
        document.querySelector('[data-preview]').srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src 'unsafe-inline';">${source}`;
    };
    document.querySelectorAll('[data-editor]').forEach((textarea) => {
        defaults.set(textarea.dataset.editor, textarea.value);
        if (window.CodeMirror) {
            const editor = CodeMirror.fromTextArea(textarea, { lineNumbers: true, mode: ({ python: 'python', javascript: 'javascript', html: 'htmlmixed', sql: 'text/x-sql', hash: 'text', base64: 'text', url: 'text', regex: 'text', jwt: 'text' })[textarea.dataset.editor], indentUnit: 2, lineWrapping: true });
            textarea.codeMirrorEditor = editor;
            editors.set(textarea.dataset.editor, editor);
            if (textarea.dataset.editor === 'html') editor.on('change', (instance) => renderPreview(instance.getValue()));
        } else if (textarea.dataset.editor === 'html') {
            textarea.addEventListener('input', () => renderPreview(textarea.value));
        }
    });
    const getEditor = (name) => editors.get(name)?.getValue() ?? document.querySelector(`[data-editor="${name}"]`).value;
    const setEditor = (name, value) => editors.has(name) ? editors.get(name).setValue(value) : document.querySelector(`[data-editor="${name}"]`).value = value;
    const output = (name, value) => { document.querySelector(`[data-output="${name}"]`).textContent = value; };
    renderPreview(getEditor('html'));
    const loadScript = (src) => new Promise((resolve, reject) => {
        const existing = [...document.scripts].find((script) => script.src === src);
        if (existing?.dataset.loaded === 'true') return resolve();
        const script = existing || Object.assign(document.createElement('script'), { src });
        script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
        script.onerror = () => reject(new Error('تعذر تحميل المحرك الخارجي؛ تحقق من اتصال الإنترنت.'));
        if (!existing) document.head.append(script);
    });
    tabs.forEach((tab) => tab.addEventListener('click', () => {
        tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
        panels.forEach((panel) => { panel.hidden = panel.dataset.labPanel !== tab.dataset.labTab; });
        editors.get(tab.dataset.labTab)?.refresh();
    }));
    document.querySelectorAll('[data-example]').forEach((button) => button.addEventListener('click', () => {
        setEditor(button.dataset.example, defaults.get(button.dataset.example));
    }));
    document.querySelector('[data-run="python"]').addEventListener('click', async () => {
        const target = document.querySelector('[data-output="python"]');
        target.textContent = 'جارٍ تحميل بيئة Python لأول مرة...';
        try {
            if (!window.loadPyodide) await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
            window.localPyodide ||= await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
            let text = '';
            window.localPyodide.setStdout({ batched: (line) => { text += `${line}\n`; } });
            window.localPyodide.setStderr({ batched: (line) => { text += `${line}\n`; } });
            const result = await window.localPyodide.runPythonAsync(getEditor('python'));
            if (result !== undefined) text += `${result}\n`;
            target.textContent = text.trimEnd() || 'تم التنفيذ دون مخرجات.';
        } catch (error) { target.textContent = error.message; }
    });
    document.querySelector('[data-run="javascript"]').addEventListener('click', () => {
        const runner = document.createElement('iframe');
        runner.hidden = true;
        runner.sandbox = 'allow-scripts';
        const code = getEditor('javascript').replace(/</g, '\\u003c');
        runner.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline';"><script>const send=(...args)=>parent.postMessage({kind:'lab-log',text:args.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' ')},'*');console.log=send;console.info=send;console.warn=send;console.error=send;try{\n${code}\n}catch(e){send('خطأ:',e.message)}<\/script>`;
        document.body.append(runner);
        const listener = (event) => {
            if (event.source !== runner.contentWindow || event.data?.kind !== 'lab-log') return;
            const target = document.querySelector('[data-output="javascript"]');
            target.textContent = target.textContent === 'جارٍ التنفيذ...' ? event.data.text : `${target.textContent}\n${event.data.text}`;
        };
        window.addEventListener('message', listener);
        output('javascript', 'جارٍ التنفيذ...');
        window.setTimeout(() => { runner.remove(); window.removeEventListener('message', listener); if (document.querySelector('[data-output="javascript"]').textContent === 'جارٍ التنفيذ...') output('javascript', 'اكتمل التنفيذ دون مخرجات.'); }, 1200);
    });
    document.querySelector('[data-run="html"]').addEventListener('click', () => {
        renderPreview(getEditor('html'));
    });
    document.querySelector('[data-run="sql"]').addEventListener('click', async () => {
        const target = document.querySelector('[data-output="sql"]');
        try {
            if (!window.initSqlJs) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js');
            window.localSql ||= await initSqlJs({ locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}` });
            window.localDb ||= new localSql.Database();
            if (!window.localDbInitialized) {
                window.localDb.run("CREATE TABLE learners(name TEXT, role TEXT); INSERT INTO learners VALUES ('ليلى','مدافعة'),('عمر','متعلم'),('سلمى','محللة');");
                window.localDbInitialized = true;
            }
            const results = window.localDb.exec(getEditor('sql'));
            target.textContent = results.length ? results.map((result) => `${result.columns.join(' | ')}\n${result.values.map((row) => row.join(' | ')).join('\n')}`).join('\n\n') : 'اكتمل الاستعلام دون صفوف معادة.';
        } catch (error) { target.textContent = error.message; }
    });
    document.querySelector('[data-run="hash"]').addEventListener('click', async () => {
        try {
            if (!window.CryptoJS) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js');
            const algorithm = document.querySelector('[data-hash-algorithm]').value;
            const digest = CryptoJS[algorithm](getEditor('hash')).toString();
            output('hash', `${algorithm}: ${digest}`);
        } catch (error) { output('hash', error.message); }
    });
    document.querySelectorAll('[data-run="base64-encode"],[data-run="base64-decode"],[data-run="url-encode"],[data-run="url-decode"],[data-run="regex"],[data-run="jwt"]').forEach((button) => button.addEventListener('click', () => {
        const action = button.dataset.run;
        try {
            if (action === 'base64-encode') output('base64', btoa(String.fromCharCode(...new TextEncoder().encode(getEditor('base64')))));
            if (action === 'base64-decode') { const bytes = Uint8Array.from(atob(getEditor('base64').trim()), (char) => char.charCodeAt(0)); output('base64', new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
            if (action === 'url-encode') output('url', encodeURIComponent(getEditor('url')));
            if (action === 'url-decode') output('url', decodeURIComponent(getEditor('url')));
            if (action === 'regex') {
                const pattern = document.querySelector('[data-regex-pattern]').value;
                const flags = document.querySelector('[data-regex-flags]').value;
                const globalFlags = flags.includes('g') ? flags : `${flags}g`;
                const matches = [...getEditor('regex').matchAll(new RegExp(pattern, globalFlags))].map((match) => `${match[0]} (موضع ${match.index})`);
                output('regex', matches.length ? matches.join('\n') : 'لا توجد مطابقات.');
            }
            if (action === 'jwt') {
                const parts = getEditor('jwt').trim().split('.');
                if (parts.length < 2) throw new Error('صيغة JWT غير مكتملة.');
                const decode = (part) => JSON.stringify(JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(part.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(part.length / 4) * 4, '=')), (char) => char.charCodeAt(0)))), null, 2);
                output('jwt', `Header:\n${decode(parts[0])}\n\nPayload:\n${decode(parts[1])}\n\nالتوقيع لم يتم التحقق منه.`);
            }
        } catch (error) { output(action.startsWith('base64') ? 'base64' : action.startsWith('url') ? 'url' : action, `خطأ: ${error.message}`); }
    }));
});
