document.addEventListener('DOMContentLoaded', () => {
    const host = document.querySelector('[data-curriculum-list]');
    if (!host || !window.curriculumPhases) return;
    host.parentElement.querySelectorAll(':scope > .stage').forEach((stage) => stage.remove());
    const search = document.querySelector('[data-curriculum-search]');
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const levelClass = (level) => /متقدم/.test(level) ? 'badge-advanced' : /متوسط/.test(level) ? 'badge-intermediate' : 'badge-beginner';
    host.innerHTML = window.curriculumPhases.map((phase) => {
        const lessons = phase.lessons.map(([title, description], index) => `<article class="lesson-card curriculum-lesson" data-reveal data-search="${escapeHtml(`${title} ${description}`)}"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><div class="curriculum-lesson-foot"><span class="badge ${levelClass(phase.level)}">${escapeHtml(phase.level)}</span><a class="text-link" href="curriculum/phase-${phase.id}.html#lesson-${index + 1}">فتح الدرس <i class="fa-solid fa-arrow-left" aria-hidden="true"></i></a></div></article>`).join('');
        return `<section class="stage curriculum-phase" id="phase-${phase.id}"><button class="stage-toggle" type="button" data-accordion aria-expanded="${phase.id === 0}" aria-controls="phase-panel-${phase.id}"><span class="stage-num">${String(phase.id).padStart(2, '0')}</span><span class="stage-title">${escapeHtml(phase.title)}</span><span class="stage-meta">${phase.lessons.length} درس · ${escapeHtml(phase.level)}</span><i class="fa-solid fa-chevron-down stage-chevron" aria-hidden="true"></i></button><div class="stage-body" id="phase-panel-${phase.id}" ${phase.id === 0 ? '' : 'hidden'}><div class="lesson-grid">${lessons}</div><a class="button button-quiet phase-open" href="curriculum/phase-${phase.id}.html">افتح صفحة المرحلة <i class="fa-solid fa-arrow-left" aria-hidden="true"></i></a></div></section>`;
    }).join('');
    if (search) {
        search.addEventListener('input', () => {
            const term = search.value.trim().toLocaleLowerCase('ar');
            host.querySelectorAll('.curriculum-phase').forEach((phase) => {
                let count = 0;
                phase.querySelectorAll('.curriculum-lesson').forEach((lesson) => {
                    const matches = lesson.dataset.search.toLocaleLowerCase('ar').includes(term);
                    lesson.hidden = !matches;
                    if (matches) count++;
                });
                phase.hidden = count === 0;
                if (term && count) {
                    const button = phase.querySelector('[data-accordion]');
                    button.setAttribute('aria-expanded', 'true');
                    phase.querySelector('.stage-body').hidden = false;
                }
            });
        });
    }
});
