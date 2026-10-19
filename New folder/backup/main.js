document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
            menuButton.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`;
        });
        navLinks.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                navLinks.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const revealItems = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const typingTarget = document.querySelector('[data-typing]');
    if (typingTarget && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const phrases = typingTarget.dataset.phrases.split('|');
        let phraseIndex = 0;
        let characterIndex = phrases[0].length;
        let deleting = true;
        const typeNext = () => {
            const phrase = phrases[phraseIndex];
            characterIndex += deleting ? -1 : 1;
            typingTarget.textContent = phrase.slice(0, characterIndex);
            let delay = deleting ? 42 : 72;
            if (characterIndex <= 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 350;
            } else if (characterIndex >= phrases[phraseIndex].length) {
                deleting = true;
                delay = 1500;
            }
            window.setTimeout(typeNext, delay);
        };
        window.setTimeout(typeNext, 1800);
    }

    document.querySelectorAll('[data-accordion]').forEach((button) => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            const panel = document.getElementById(button.getAttribute('aria-controls'));
            button.setAttribute('aria-expanded', String(!expanded));
            panel.hidden = expanded;
        });
    });

    const categoryNav = document.querySelector('.hack-nav');
    if (categoryNav) {
        categoryNav.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-category-target]');
            if (!button) return;
            categoryNav.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
            document.getElementById(button.dataset.categoryTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const searchInput = document.querySelector('[data-hack-search]');
    if (searchInput) {
        const cards = [...document.querySelectorAll('.command-card')];
        const count = document.querySelector('[data-result-count]');
        const empty = document.querySelector('.empty-state');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLocaleLowerCase('ar');
            let visibleCount = 0;
            cards.forEach((card) => {
                const matches = card.dataset.search.toLocaleLowerCase('ar').includes(query);
                card.hidden = !matches;
                if (matches) visibleCount++;
            });
            document.querySelectorAll('.hack-category').forEach((category) => {
                category.hidden = !category.querySelector('.command-card:not([hidden])');
            });
            count.textContent = `${visibleCount} نتيجة`;
            empty.style.display = visibleCount ? 'none' : 'block';
        });
    }

    document.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-copy]');
        if (!button) return;
        const text = button.dataset.copy;
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const temporary = document.createElement('textarea');
            temporary.value = text;
            temporary.style.position = 'fixed';
            temporary.style.opacity = '0';
            document.body.append(temporary);
            temporary.select();
            document.execCommand('copy');
            temporary.remove();
        }
        const oldLabel = button.textContent;
        button.textContent = 'تم النسخ';
        button.classList.add('copied');
        window.setTimeout(() => {
            button.textContent = oldLabel;
            button.classList.remove('copied');
        }, 1300);
    });

    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            document.querySelector('.form-status').textContent = 'شكرًا لرسالتك. هذا النموذج تجريبي ولا يرسل البيانات إلى خادم.';
            contactForm.reset();
        });
    }
});
