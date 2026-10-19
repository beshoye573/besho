document.addEventListener('DOMContentLoaded', () => {
    const phaseId = Number(document.body.dataset.phase);
    const phase = window.curriculumPhases?.find((item) => item.id === phaseId);
    const sidebar = document.querySelector('[data-phase-sidebar]');
    const lessonsHost = document.querySelector('[data-phase-lessons]');
    if (!phase || !sidebar || !lessonsHost) return;
    const key = `bishoy-cyber-phase-${phase.id}`;
    const done = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const durationFor = (index) => 20 + ((index * 7 + phase.id * 3) % 4) * 10;
    const levelClass = (level) => /متقدم/.test(level) ? 'badge-advanced' : /متوسط/.test(level) ? 'badge-intermediate' : 'badge-beginner';
    document.title = `${phase.title} | بيشوي سايبر سكيورتي`;
    document.querySelector('[data-phase-title]').textContent = phase.title;
    document.querySelector('[data-phase-meta]').textContent = `${phase.lessons.length} درس · ${phase.level}`;
    const updateProgress = () => {
        const percent = Math.round(done.size / phase.lessons.length * 100);
        document.querySelector('[data-progress-value]').style.width = `${percent}%`;
        document.querySelector('[data-progress-text]').textContent = `${done.size} من ${phase.lessons.length} · ${percent}%`;
    };
    sidebar.innerHTML = phase.lessons.map(([title], index) => `<a href="#lesson-${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(title)}</a>`).join('');
    lessonsHost.innerHTML = phase.lessons.map(([title, description], index) => {
        const number = index + 1;
        return `<article class="phase-lesson ${done.has(number) ? 'is-complete' : ''}" data-reveal id="lesson-${number}"><button class="phase-lesson-toggle" type="button" data-accordion aria-expanded="${index === 0}" aria-controls="lesson-panel-${number}"><span class="phase-lesson-number">${String(number).padStart(2, '0')}</span><span class="phase-lesson-title">${escapeHtml(title)}</span><span class="badge ${levelClass(phase.level)}">${escapeHtml(phase.level)}</span><i class="fa-solid fa-chevron-down stage-chevron" aria-hidden="true"></i></button><div class="phase-lesson-body" id="lesson-panel-${number}" ${index === 0 ? '' : 'hidden'}><div class="lesson-meta"><span><i class="fa-regular fa-clock" aria-hidden="true"></i> ${durationFor(index)} دقيقة</span><span><i class="fa-solid fa-signal" aria-hidden="true"></i> ${escapeHtml(phase.level)}</span></div><p>${escapeHtml(description)}</p><div class="lesson-safety-note"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> طبّق المفاهيم في جهازك أو مختبر تدريبي مصرح به فقط.</div><button class="button ${done.has(number) ? 'button-primary' : 'button-quiet'} lesson-complete" type="button" data-complete="${number}" aria-pressed="${done.has(number)}">${done.has(number) ? 'مكتمل' : 'علّم كمكتمل'} <i class="fa-solid ${done.has(number) ? 'fa-check' : 'fa-circle-check'}" aria-hidden="true"></i></button></div></article>`;
    }).join('');
    lessonsHost.addEventListener('click', (event) => {
        const button = event.target.closest('[data-complete]');
        if (!button) return;
        const number = Number(button.dataset.complete);
        if (done.has(number)) done.delete(number); else done.add(number);
        localStorage.setItem(key, JSON.stringify([...done].sort((a, b) => a - b)));
        const article = button.closest('.phase-lesson');
        article.classList.toggle('is-complete', done.has(number));
        button.setAttribute('aria-pressed', String(done.has(number)));
        button.classList.toggle('button-primary', done.has(number));
        button.classList.toggle('button-quiet', !done.has(number));
        button.innerHTML = `${done.has(number) ? 'مكتمل' : 'علّم كمكتمل'} <i class="fa-solid ${done.has(number) ? 'fa-check' : 'fa-circle-check'}" aria-hidden="true"></i>`;
        updateProgress();
    });
    updateProgress();
});
