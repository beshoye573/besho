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

    const observedRevealItems = new WeakSet();
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        const observeRevealItems = (root) => {
            if (root.matches?.('[data-reveal]') && !observedRevealItems.has(root)) {
                observedRevealItems.add(root);
                observer.observe(root);
            }
            root.querySelectorAll?.('[data-reveal]').forEach((item) => {
                if (observedRevealItems.has(item)) return;
                observedRevealItems.add(item);
                observer.observe(item);
            });
        };
        observeRevealItems(document);
        new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) observeRevealItems(node);
        }))).observe(document.body, { childList: true, subtree: true });
    } else {
        document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
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

    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-accordion]');
        if (!button) return;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        button.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
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

    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionReduced) {
        document.querySelectorAll('main h2').forEach((heading) => {
            const fullText = heading.textContent.trim();
            if (!fullText) return;
            heading.classList.add('terminal-heading');
            heading.setAttribute('aria-label', fullText);
            const typeHeading = () => {
                const characters = [...fullText];
                let visibleCount = 0;
                heading.textContent = '';
                const timer = window.setInterval(() => {
                    visibleCount += 1;
                    heading.textContent = characters.slice(0, visibleCount).join('');
                    if (visibleCount >= characters.length) window.clearInterval(timer);
                }, 24);
            };
            if ('IntersectionObserver' in window) {
                const headingObserver = new IntersectionObserver((entries, observer) => {
                    if (!entries.some((entry) => entry.isIntersecting)) return;
                    typeHeading();
                    observer.disconnect();
                }, { threshold: 0.5 });
                headingObserver.observe(heading);
            } else typeHeading();
        });

        const headings = document.querySelectorAll('main h1:not(:has([data-typing])), main h2');
        const symbols = '█▓▒░<>/\\#[]{}=+*01';
        headings.forEach((heading) => {
            if (!heading.textContent.trim()) return;
            heading.classList.add('glitch-hover');
            heading.addEventListener('mouseenter', () => {
                if (heading.dataset.scrambling === 'true') return;
                const original = heading.textContent.trim();
                if (!original) return;
                heading.dataset.scrambling = 'true';
                const started = performance.now();
                const scramble = (now) => {
                    const progress = Math.min((now - started) / 500, 1);
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
        });

        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-rain';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.prepend(canvas);
        const context = canvas.getContext('2d');
        if (context) {
            const alphabet = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let columns = [];
            let frame = 0;
            const resize = () => {
                const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = Math.floor(window.innerWidth * ratio);
                canvas.height = Math.floor(window.innerHeight * ratio);
                context.setTransform(ratio, 0, 0, ratio, 0, 0);
                columns = Array.from({ length: Math.ceil(window.innerWidth / 22) }, () => Math.random() * -30);
            };
            const draw = () => {
                frame++;
                if (frame % 2) {
                    requestAnimationFrame(draw);
                    return;
                }
                context.fillStyle = 'rgba(8,17,15,.12)';
                context.fillRect(0, 0, window.innerWidth, window.innerHeight);
                context.fillStyle = '#00ff9d';
                context.font = '12px monospace';
                columns.forEach((row, column) => {
                    const glyph = alphabet[Math.floor(Math.random() * alphabet.length)];
                    context.fillText(glyph, column * 22, row * 18);
                    if (row * 18 > window.innerHeight && Math.random() > .98) columns[column] = 0;
                    else columns[column] += .35;
                });
                requestAnimationFrame(draw);
            };
            resize();
            window.addEventListener('resize', resize, { passive: true });
            requestAnimationFrame(draw);
        }
    }

    const backToTop = document.createElement('button');
    backToTop.type = 'button';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    document.body.append(backToTop);
    const updateBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 300);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: motionReduced ? 'auto' : 'smooth' }));
});
