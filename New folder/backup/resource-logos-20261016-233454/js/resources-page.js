document.addEventListener('DOMContentLoaded', () => {
    const host = document.querySelector('[data-resources-list]');
    if (!host || !window.freeResources) return;

    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
    const badgeClass = (kind, value) => {
        if (kind === 'level') return /مبتدئ.*متقدم/.test(value) ? 'resource-badge-level-mixed' : /متقدم/.test(value) ? 'resource-badge-level-advanced' : /متوسط/.test(value) ? 'resource-badge-level-intermediate' : 'resource-badge-level-beginner';
        return '';
    };
    let sourceIndex = 0;
    host.innerHTML = window.freeResources.map((group) => {
        const cards = group.items.map((item) => {
            sourceIndex++;
            const languageTerms = `${/عربي/.test(item.language) ? 'لغة عربية عربي Arabic' : ''} ${/إنجليزي/.test(item.language) ? 'لغة إنجليزية إنجليزي English' : ''}`;
            const searchable = `${item.name} ${item.description} ${item.level} ${item.type} ${item.language} ${languageTerms}`;
            return `<article class="info-card resource-card" data-reveal data-resource-search="${escapeHtml(searchable)}">
        <span class="resource-index">${String(sourceIndex).padStart(2, '0')}</span>
        <h3 class="resource-title" aria-label="${escapeHtml(item.name)}">${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="resource-badges" aria-label="تصنيف المصدر">
          <span class="resource-badge ${badgeClass('level', item.level)}"><i class="fa-solid fa-signal" aria-hidden="true"></i>${escapeHtml(item.level)}</span>
          <span class="resource-badge resource-badge-type"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${escapeHtml(item.type)}</span>
          <span class="resource-badge resource-badge-language"><i class="fa-solid fa-language" aria-hidden="true"></i>${escapeHtml(item.language)}</span>
        </div>
        <a class="button button-quiet resource-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">اذهب للمصدر <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </article>`;
        }).join('');
        return `<section class="resource-block resource-section" data-resource-section><div class="section-heading resource-section-heading" data-reveal><div><div class="eyebrow">OPEN LEARNING / ${String(sourceIndex + 1).padStart(2, '0')}</div><h2>${escapeHtml(group.section)}</h2></div><span class="resource-section-count">${group.items.length} مصدر</span></div><div class="resource-grid">${cards}</div></section>`;
    }).join('');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        host.querySelectorAll('.resource-section-heading h2').forEach((heading) => {
            const completeText = heading.textContent;
            heading.setAttribute('aria-label', completeText);
            heading.classList.add('terminal-heading');
            const observer = new IntersectionObserver((entries, currentObserver) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                const characters = [...completeText];
                let visible = 0;
                heading.textContent = '';
                const timer = window.setInterval(() => {
                    visible++;
                    heading.textContent = characters.slice(0, visible).join('');
                    if (visible >= characters.length) window.clearInterval(timer);
                }, 24);
                currentObserver.disconnect();
            }, { threshold: 0.5 });
            observer.observe(heading);
        });

        host.addEventListener('pointerover', (event) => {
            const heading = event.target.closest('.resource-title');
            if (!heading || heading.contains(event.relatedTarget) || heading.dataset.scrambling === 'true') return;
            heading.dataset.scrambling = 'true';
            const original = heading.textContent;
            const symbols = '█▓▒░<>/\\#[]{}=+*01';
            const start = performance.now();
            const scramble = (now) => {
                const progress = Math.min((now - start) / 450, 1);
                const settled = Math.floor(progress * original.length);
                heading.textContent = [...original].map((character, index) => {
                    if (index < settled || character === ' ') return character;
                    return symbols[Math.floor(Math.random() * symbols.length)];
                }).join('');
                if (progress < 1) requestAnimationFrame(scramble);
                else {
                    heading.textContent = original;
                    heading.dataset.scrambling = 'false';
                }
            };
            requestAnimationFrame(scramble);
        });
    }

    const search = document.querySelector('[data-resource-search]');
    const resultCount = document.querySelector('[data-resource-count]');
    const emptyState = document.querySelector('[data-resource-empty]');
    if (!search) return;
    const cards = [...host.querySelectorAll('[data-resource-search]')];
    const updateResults = () => {
        const term = search.value.trim().toLocaleLowerCase('ar');
        let visibleCount = 0;
        cards.forEach((card) => {
            const matches = card.dataset.resourceSearch.toLocaleLowerCase('ar').includes(term);
            card.hidden = !matches;
            if (matches) visibleCount++;
        });
        host.querySelectorAll('[data-resource-section]').forEach((section) => {
            section.hidden = !section.querySelector('.resource-card:not([hidden])');
        });
        if (resultCount) resultCount.textContent = `${visibleCount} مصدر`;
        if (emptyState) emptyState.style.display = visibleCount ? 'none' : 'block';
    };
    search.addEventListener('input', updateResults);
    updateResults();
});
