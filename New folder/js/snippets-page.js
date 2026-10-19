document.addEventListener('DOMContentLoaded', () => {
    const host = document.querySelector('[data-snippet-groups]');
    if (!host || !window.snippetGroups) return;
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    host.innerHTML = window.snippetGroups.map((group, index) => `<details class="snippet-group" data-reveal ${index === 0 ? 'open' : ''}><summary>${escapeHtml(group.title)} <span class="stage-meta">${group.items.length} مثالًا</span></summary><p class="lab-caption">${escapeHtml(group.note)}</p><div class="snippet-items">${group.items.map(([code, description]) => `<article class="snippet-item" data-reveal><p>${escapeHtml(description)}</p><div class="snippet-code"><code>${escapeHtml(code)}</code><button class="copy-button" type="button" data-copy="${escapeHtml(code)}" aria-label="نسخ المثال: ${escapeHtml(description)}">نسخ <i class="fa-regular fa-copy" aria-hidden="true"></i></button></div></article>`).join('')}</div></details>`).join('');
});
