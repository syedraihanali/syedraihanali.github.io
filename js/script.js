/* ============================================================
   Syed Raihan Ali — Portfolio v3 · interactions
   No dependencies. The page stays fully readable without JS.
   ------------------------------------------------------------
    1. Helpers                 9. Project filters
    2. Intro                  10. GitHub live data
    3. Theme                  11. Dhaka live environment card
    4. Nav + mobile menu      12. Dhaka clock
    5. Scroll effects         13. Copy + toast
    6. Reveal on scroll       14. Contact form (Formspree)
    7. Rotator + counters     15. Misc
    8. Pointer effects
   ============================================================ */

(() => {
    'use strict';

    /* ---------- 1. Helpers ---------- */
    const doc = document.documentElement;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const nf = new Intl.NumberFormat('en-US');
    const hasIO = 'IntersectionObserver' in window;

    const store = {
        getJSON(key) {
            try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; }
        },
        setJSON(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* storage blocked */ }
        },
        set(key, value) {
            try { localStorage.setItem(key, value); } catch (_) { /* storage blocked */ }
        },
    };

    const relTime = (date) => {
        const mins = Math.round((Date.now() - date.getTime()) / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins} min ago`;
        const hours = Math.round(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.round(hours / 24);
        return days === 1 ? 'yesterday' : `${days} days ago`;
    };

    const withTimeout = (promise, ms) => Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
    ]);

    const fetchJSON = async (url) => {
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    const track = (name, params) => {
        if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    };

    // Run a callback once, the first time an element gets close to the viewport.
    const whenNear = (el, cb, margin = '300px') => {
        if (!el) return;
        if (!hasIO) { cb(); return; }
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                io.disconnect();
                cb();
            }
        }, { rootMargin: margin });
        io.observe(el);
    };

    /* ---------- 2. Intro ---------- */
    const markReady = () => requestAnimationFrame(() => doc.classList.add('is-ready'));
    if (document.fonts && document.fonts.ready) {
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(markReady);
    } else {
        markReady();
    }

    /* ---------- 3. Theme ---------- */
    const themeBtn = $('[data-theme-toggle]');
    const metaTheme = $('meta[name="theme-color"]');
    const THEME_COLORS = { light: '#F2F8FE', dark: '#060F1D' };
    const currentTheme = () => (doc.dataset.theme === 'dark' ? 'dark' : 'light');

    const syncThemeUI = () => {
        const t = currentTheme();
        if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        if (metaTheme) metaTheme.setAttribute('content', THEME_COLORS[t]);
    };
    syncThemeUI();

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            const apply = () => {
                doc.dataset.theme = next;
                store.set('theme', next);
                syncThemeUI();
            };

            if (reduceMotion) { apply(); return; }

            if (!document.startViewTransition) {
                doc.classList.add('theme-fade');
                apply();
                setTimeout(() => doc.classList.remove('theme-fade'), 500);
                return;
            }

            const rect = themeBtn.getBoundingClientRect();
            const x = e.clientX || rect.left + rect.width / 2;
            const y = e.clientY || rect.top + rect.height / 2;
            const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
            const vt = document.startViewTransition(apply);
            vt.ready.then(() => {
                doc.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
                    { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
                );
            }).catch(() => { /* transition skipped */ });
        });
    }

    /* ---------- 4. Nav + mobile menu ---------- */
    const nav = $('#nav');
    const navLinks = $$('.nav-link');
    const indicator = $('.nav-indicator');

    const moveIndicator = (link) => {
        if (!indicator) return;
        if (!link || !link.offsetWidth) {
            indicator.style.opacity = '0';
            return;
        }
        indicator.style.opacity = '1';
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };

    const setActive = (id) => {
        let active = null;
        navLinks.forEach((link) => {
            const on = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', on);
            if (on) {
                link.setAttribute('aria-current', 'location');
                active = link;
            } else {
                link.removeAttribute('aria-current');
            }
        });
        moveIndicator(active);
    };

    if (hasIO) {
        const sectionIds = ['home', ...navLinks.map((l) => l.getAttribute('href').slice(1))];
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });
    }

    window.addEventListener('resize', () => moveIndicator($('.nav-link.is-active')), { passive: true });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => moveIndicator($('.nav-link.is-active')));
    }

    const menuBtn = $('[data-menu-toggle]');
    const menu = $('#mobile-menu');
    let menuOpen = false;
    let menuTimer;

    const openMenu = () => {
        menuOpen = true;
        clearTimeout(menuTimer);
        menu.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => nav.classList.add('menu-open')));
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Close menu');
        doc.classList.add('no-scroll');
        setTimeout(() => { const first = $('a', menu); if (first) first.focus({ preventScroll: true }); }, 80);
    };

    const closeMenu = (returnFocus = true) => {
        menuOpen = false;
        nav.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        doc.classList.remove('no-scroll');
        menuTimer = setTimeout(() => { if (!menuOpen) menu.hidden = true; }, reduceMotion ? 0 : 380);
        if (returnFocus) menuBtn.focus({ preventScroll: true });
    };

    if (menuBtn && menu && nav) {
        menuBtn.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
        menu.addEventListener('click', (e) => {
            if (e.target.closest('a')) closeMenu(false);
        });
        document.addEventListener('keydown', (e) => {
            if (!menuOpen) return;
            if (e.key === 'Escape') {
                closeMenu();
                return;
            }
            if (e.key !== 'Tab') return;
            const focusables = [menuBtn, ...$$('a, button', menu)];
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            } else if (!focusables.includes(document.activeElement)) {
                e.preventDefault();
                first.focus();
            }
        });
        window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
            if (e.matches && menuOpen) closeMenu(false);
        });
    }

    /* ---------- 5. Scroll effects ---------- */
    const progress = $('.scroll-progress');
    const toTop = $('[data-to-top]');
    const timeline = $('[data-timeline]');
    const tlItems = timeline ? $$('.tl-item', timeline) : [];
    let lineInset = { top: 0, bottom: 0 };

    const measureTimeline = () => {
        if (!timeline) return;
        const cs = getComputedStyle(timeline, '::before');
        lineInset = { top: parseFloat(cs.top) || 0, bottom: parseFloat(cs.bottom) || 0 };
    };

    const updateTimeline = () => {
        if (!timeline) return;
        if (reduceMotion) {
            timeline.style.setProperty('--progress', '1');
            tlItems.forEach((item) => item.classList.add('is-reached'));
            return;
        }
        const rect = timeline.getBoundingClientRect();
        const anchor = window.innerHeight * 0.62;
        const lineTop = rect.top + lineInset.top;
        const lineLen = Math.max(1, rect.height - lineInset.top - lineInset.bottom);
        const p = Math.min(1, Math.max(0, (anchor - lineTop) / lineLen));
        timeline.style.setProperty('--progress', p.toFixed(4));
        tlItems.forEach((item) => {
            const dot = $('.tl-dot', item);
            if (!dot) return;
            const r = dot.getBoundingClientRect();
            item.classList.toggle('is-reached', r.top + r.height / 2 <= anchor);
        });
    };

    let ticking = false;
    const onScroll = () => {
        ticking = false;
        const y = window.scrollY;
        const max = doc.scrollHeight - window.innerHeight;
        if (nav) nav.classList.toggle('is-scrolled', y > 12);
        if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
        if (toTop) toTop.classList.toggle('is-visible', y > window.innerHeight * 0.9);
        updateTimeline();
    };
    const requestTick = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }
    };

    measureTimeline();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', () => { measureTimeline(); requestTick(); }, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            const brand = $('.brand');
            if (brand) brand.focus({ preventScroll: true });
        });
    }

    // Pause the hero's decorative loops while it is off-screen.
    const hero = $('.hero');
    if (hero && hasIO) {
        new IntersectionObserver(([entry]) => {
            hero.classList.toggle('is-paused', !entry.isIntersecting);
        }).observe(hero);
    }

    /* ---------- 6. Reveal on scroll ---------- */
    const revealEls = $$('[data-reveal], [data-reveal-group]');
    $$('[data-reveal-group]').forEach((group) => {
        Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
    });

    const reveal = (el) => {
        el.classList.add('in');
        el.dispatchEvent(new CustomEvent('revealed'));
    };

    if (reduceMotion || !hasIO) {
        revealEls.forEach(reveal);
    } else {
        doc.classList.add('reveal-on');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                reveal(entry.target);
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    /* ---------- 7. Rotator + counters ---------- */
    const rotator = $('.rotator');
    if (rotator) {
        const words = $$('.rotator-word', rotator);
        let index = 0;
        let timer = null;

        const fit = () => {
            const w = words[index].getBoundingClientRect().width;
            if (w) rotator.style.width = `${Math.ceil(w)}px`;
        };
        const next = () => {
            const current = words[index];
            current.classList.remove('is-active');
            current.classList.add('is-leaving');
            setTimeout(() => current.classList.remove('is-leaving'), 700);
            index = (index + 1) % words.length;
            words[index].classList.add('is-active');
            fit();
        };
        const start = () => {
            if (!timer && !reduceMotion && words.length > 1) timer = setInterval(next, 2800);
        };
        const stop = () => {
            clearInterval(timer);
            timer = null;
        };

        fit();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
        window.addEventListener('resize', fit, { passive: true });
        start();
        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    }

    const animateCount = (el, from, to) => {
        if (reduceMotion || from === to) {
            el.textContent = nf.format(to);
            return;
        }
        const duration = 1600;
        const t0 = performance.now();
        const step = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = nf.format(Math.round(from + (to - from) * eased));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const countEls = $$('[data-count]');
    if (hasIO && !reduceMotion) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                countObserver.unobserve(el);
                const delay = el.closest('.hero') ? 650 : 0;
                el.textContent = '0';
                setTimeout(() => {
                    el.dataset.counted = '1';
                    animateCount(el, 0, parseFloat(el.dataset.count) || 0);
                }, delay);
            });
        }, { threshold: 0.6 });
        countEls.forEach((el) => countObserver.observe(el));
    } else {
        countEls.forEach((el) => { el.dataset.counted = '1'; });
    }

    // Update a (possibly counting) number with a live value.
    const setCount = (el, value) => {
        if (!el.hasAttribute('data-count')) {
            el.textContent = nf.format(value);
            return;
        }
        const old = parseFloat(el.dataset.count) || 0;
        el.dataset.count = String(value);
        if (el.dataset.counted === '1') animateCount(el, old, value);
    };

    /* ---------- 8. Pointer effects ---------- */
    if (finePointer && !reduceMotion) {
        // Card spotlight that follows the cursor
        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest && e.target.closest('.spotlight');
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }, { passive: true });

        // Magnetic buttons
        $$('.magnetic').forEach((el) => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.22;
                const y = (e.clientY - r.top - r.height / 2) * 0.32;
                el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
            });
            el.addEventListener('pointerleave', () => { el.style.translate = ''; });
        });

        // 3D tilt on featured project visuals
        $$('.tilt').forEach((el) => {
            const host = el.closest('.project-visual') || el;
            let frame = 0;
            host.addEventListener('pointermove', (e) => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(() => {
                    const r = host.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`);
                    el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
                });
            });
            host.addEventListener('pointerleave', () => {
                cancelAnimationFrame(frame);
                el.style.setProperty('--rx', '0deg');
                el.style.setProperty('--ry', '0deg');
            });
        });

        // Soft glow that follows the cursor across the hero
        if (hero) {
            hero.addEventListener('pointermove', (e) => {
                const r = hero.getBoundingClientRect();
                hero.style.setProperty('--hx', `${e.clientX - r.left}px`);
                hero.style.setProperty('--hy', `${e.clientY - r.top}px`);
            }, { passive: true });
        }
    }

    /* ---------- 9. Project filters ---------- */
    const grid = $('[data-projects]');
    const filterBtns = $$('[data-filter]');
    if (grid && filterBtns.length) {
        const cards = $$('.project', grid);
        const matches = (card, f) => f === 'all' || (card.dataset.cat || '').split(' ').includes(f);

        filterBtns.forEach((btn) => {
            const count = cards.filter((c) => matches(c, btn.dataset.filter)).length;
            const badge = $('.filter-count', btn);
            if (badge) badge.textContent = String(count);
        });

        let busy = false;
        const applyFilter = (f) => {
            const leaving = cards.filter((c) => !c.classList.contains('is-hidden') && !matches(c, f));
            const entering = cards.filter((c) => c.classList.contains('is-hidden') && matches(c, f));

            if (reduceMotion || !Element.prototype.animate) {
                cards.forEach((c) => c.classList.toggle('is-hidden', !matches(c, f)));
                entering.forEach(reveal);
                return;
            }

            busy = true;
            const staying = cards.filter((c) => !c.classList.contains('is-hidden') && matches(c, f));
            const first = new Map(staying.map((c) => [c, c.getBoundingClientRect()]));

            const fadeOuts = leaving.map((c) => c.animate(
                [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.96)' }],
                { duration: 180, easing: 'ease-in', fill: 'forwards' }
            ).finished.catch(() => { }));

            Promise.all(fadeOuts).then(() => {
                leaving.forEach((c) => {
                    c.classList.add('is-hidden');
                    c.getAnimations().forEach((a) => a.cancel());
                });
                entering.forEach((c) => {
                    c.classList.remove('is-hidden');
                    reveal(c);
                });

                staying.forEach((c) => {
                    const last = c.getBoundingClientRect();
                    const f0 = first.get(c);
                    const dx = f0.left - last.left;
                    const dy = f0.top - last.top;
                    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                        c.animate(
                            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
                            { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
                        );
                    }
                });
                entering.forEach((c, i) => {
                    c.animate(
                        [{ opacity: 0, transform: 'translateY(18px) scale(0.98)' }, { opacity: 1, transform: 'none' }],
                        { duration: 500, delay: 60 + i * 60, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
                    );
                });
                setTimeout(() => {
                    busy = false;
                    requestTick();
                }, 300);
            });
        };

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (busy || btn.classList.contains('is-active')) return;
                filterBtns.forEach((b) => {
                    const on = b === btn;
                    b.classList.toggle('is-active', on);
                    b.setAttribute('aria-pressed', String(on));
                });
                applyFilter(btn.dataset.filter);
            });
        });
    }

    /* ---------- 10. GitHub live data ---------- */
    const GH_USER = 'syedraihanali';
    const GH_CACHE = 'gh-cache-v3';
    const GH_TTL = 60 * 60 * 1000; // 1 hour
    const ghCard = $('[data-gh-card]');
    const heatmapEl = $('[data-gh-heatmap]');
    const monthsEl = $('[data-gh-months]');

    const loadGitHub = async () => {
        const cached = store.getJSON(GH_CACHE);
        if (cached && Date.now() - cached.t < GH_TTL) return cached;

        const [user, repos, contrib] = await Promise.allSettled([
            withTimeout(fetchJSON(`https://api.github.com/users/${GH_USER}`), 8000),
            withTimeout(fetchJSON(`https://api.github.com/users/${GH_USER}/repos?per_page=100&type=owner`), 8000),
            withTimeout(fetchJSON(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`), 8000),
        ]);

        const data = { t: Date.now() };
        if (user.status === 'fulfilled') {
            data.repos = user.value.public_repos;
            data.followers = user.value.followers;
        }
        if (repos.status === 'fulfilled' && Array.isArray(repos.value)) {
            const own = repos.value.filter((r) => !r.fork);
            data.stars = own.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
            data.byRepo = Object.fromEntries(repos.value.map((r) => [r.name, [r.stargazers_count || 0, r.forks_count || 0]]));
        }
        if (contrib.status === 'fulfilled' && contrib.value) {
            data.contributions = contrib.value.total && contrib.value.total.lastYear;
            const days = contrib.value.contributions;
            if (Array.isArray(days)) data.days = days.map((d) => [d.date, d.count, d.level]);
        }

        if (data.repos == null && data.contributions == null) throw new Error('GitHub data unavailable');
        store.setJSON(GH_CACHE, data);
        return data;
    };

    const renderHeatmap = (days) => {
        if (!heatmapEl || !days.length) return;
        const first = new Date(`${days[0][0]}T00:00:00`);
        const offset = first.getDay(); // rows start on Sunday
        const dayFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short' });
        const cells = [];
        const labels = [];
        let lastMonth = -1;

        for (let i = 0; i < offset; i++) cells.push('<i class="pad"></i>');

        days.forEach(([date, count, level], idx) => {
            const pos = idx + offset;
            const col = Math.floor(pos / 7);
            const d = new Date(`${date}T00:00:00`);
            if (pos % 7 === 0 || idx === 0) {
                const m = d.getMonth();
                if (m !== lastMonth) {
                    labels.push({ col, text: monthFmt.format(d) });
                    lastMonth = m;
                }
            }
            const lvl = Math.max(0, Math.min(4, level || 0));
            const label = `${nf.format(count)} contribution${count === 1 ? '' : 's'} · ${dayFmt.format(d)}`;
            cells.push(`<i data-l="${lvl}" style="--c:${col}" title="${label}"></i>`);
        });

        heatmapEl.innerHTML = cells.join('');

        if (monthsEl) {
            const cs = getComputedStyle(heatmapEl);
            const colW = (parseFloat(cs.gridAutoColumns) || 12) + (parseFloat(cs.columnGap) || 3);
            // Drop a label that would collide with the next one.
            const kept = labels.filter((l, i) => !labels[i + 1] || labels[i + 1].col - l.col >= 3);
            monthsEl.innerHTML = kept.map((l) => `<span style="left:${(l.col * colW).toFixed(0)}px">${l.text}</span>`).join('');
        }

        const total = days.reduce((s, d) => s + (d[1] || 0), 0);
        heatmapEl.setAttribute('aria-label', `GitHub contribution calendar: ${nf.format(total)} contributions in the last twelve months`);

        if (!reduceMotion) heatmapEl.classList.add('is-animated');
        const scroller = heatmapEl.closest('.heatmap-scroll');
        if (scroller) scroller.scrollLeft = scroller.scrollWidth;
    };

    const applyGitHub = (data) => {
        $$('[data-gh]').forEach((el) => {
            const value = data[el.dataset.gh];
            if (typeof value !== 'number' || !isFinite(value)) return;
            setCount(el, value);
            const optional = el.closest('[data-gh-optional]');
            if (optional) optional.hidden = false;
        });

        if (data.byRepo) {
            $$('[data-repo]').forEach((card) => {
                const stats = data.byRepo[card.dataset.repo];
                const box = $('[data-repo-stats]', card);
                if (!stats || !box) return;
                const [stars, forks] = stats;
                const starEl = $('[data-stars]', box);
                const forkEl = $('[data-forks]', box);
                if (starEl) {
                    starEl.textContent = nf.format(stars);
                    starEl.parentElement.hidden = stars === 0;
                }
                if (forkEl) {
                    forkEl.textContent = nf.format(forks);
                    forkEl.parentElement.hidden = forks === 0;
                }
                box.hidden = stars === 0 && forks === 0;
            });
        }

        if (Array.isArray(data.days) && data.days.length) renderHeatmap(data.days);
    };

    // Stars live on the project cards above the GitHub card, so start loading
    // as soon as the projects section gets close.
    whenNear($('#projects'), () => {
        loadGitHub().then(applyGitHub).catch(() => {
            if (heatmapEl && !heatmapEl.children.length) {
                heatmapEl.outerHTML = `<p class="heatmap-fallback">Live activity is unavailable right now — <a class="link-arrow" href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer">view it on GitHub</a>.</p>`;
            }
        });
    }, '600px');

    /* ---------- 11. Dhaka live environment card ---------- */
    const env = $('[data-env]');
    if (env) {
        const ENV_BASE = 'https://raw.githubusercontent.com/syedraihanali/dhaka-environment-logger/main/data/csv/';
        const ENV_CACHE = 'env-cache-v1';
        const ENV_TTL = 20 * 60 * 1000; // the logger writes roughly every few hours
        const AQI = { 1: 'Good', 2: 'Fair', 3: 'Moderate', 4: 'Poor', 5: 'Very poor' };
        const SERIES = {
            temp: { label: 'Temperature', unit: '°C', digits: 0 },
            pm25: { label: 'PM2.5', unit: 'µg/m³', digits: 0 },
            humidity: { label: 'Humidity', unit: '%', digits: 0 },
        };
        // Last known readings, used if the live fetch fails.
        const SNAPSHOT = {
            last: { time: '2026-11-04 10:45:47 PM BDT', temp: 25.02, humidity: 78, weather: 'haze', wind: 2.57, pm25: 88.59, aqi: 5, uv: 0 },
            series: {
                temp: [34, 30, 28, 28, 35, 33, 30, 27, 26, 33, 27, 27, 26, 29, 30, 26, 27, 27, 30, 26, 26, 27, 26, 26, 26, 26, 26, 32, 27, 27, 25, 32, 27, 25, 31, 28, 26, 26, 29, 25],
                pm25: [39.3, 67.5, 63.4, 56.1, 33.4, 26.4, 34, 26.9, 29.3, 27.1, 23, 42.4, 31.5, 17.9, 12.4, 14.9, 12.4, 7.9, 13.1, 17.4, 19.2, 21, 15, 16.3, 20.3, 21.9, 27.1, 33.4, 62.8, 87.8, 114.8, 64.1, 101.9, 142.2, 115.8, 93.4, 112.4, 108.6, 90.1, 88.6],
                humidity: [43, 66, 78, 74, 46, 49, 70, 83, 89, 55, 74, 78, 83, 70, 66, 83, 83, 89, 70, 89, 83, 78, 89, 89, 89, 89, 94, 62, 83, 83, 88, 58, 78, 83, 58, 74, 83, 73, 54, 78],
            },
        };

        const spark = $('[data-spark]', env);
        const seriesBtns = $$('[data-series]', env);
        const statusEl = $('[data-env-status]', env);
        const statusText = $('[data-env-status-text]', env);
        let state = null;
        let currentSeries = 'temp';

        const set = (key, value) => {
            const el = $(`[data-env="${key}"]`, env);
            if (el) el.textContent = value;
        };
        const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
        const uvLabel = (u) => (u < 3 ? 'Low' : u < 6 ? 'Moderate' : u < 8 ? 'High' : u < 11 ? 'Very high' : 'Extreme');
        const weatherIcon = (w) => {
            if (/rain|drizzle|thunder|shower/i.test(w)) return 'rain';
            if (/haze|mist|smoke|fog|dust|sand|ash/i.test(w)) return 'haze';
            if (/clear/i.test(w)) return 'sun';
            return 'cloud';
        };

        // "2026-11-04 10:45:47 PM BDT" → Date (Dhaka is UTC+6, no DST)
        const parseTime = (s) => {
            const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)/.exec(s || '');
            if (!m) return null;
            let h = Number(m[4]) % 12;
            if (m[7] === 'PM') h += 12;
            const d = new Date(`${m[1]}-${m[2]}-${m[3]}T${String(h).padStart(2, '0')}:${m[5]}:${m[6]}+06:00`);
            return isNaN(d) ? null : d;
        };

        const parseCSV = (text) => {
            const rows = [];
            text.split(/\r?\n/).forEach((line) => {
                if (!line.trim()) return;
                const cells = [];
                let cur = '';
                let quoted = false;
                for (let i = 0; i < line.length; i++) {
                    const ch = line[i];
                    if (quoted) {
                        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
                        else if (ch === '"') quoted = false;
                        else cur += ch;
                    } else if (ch === '"') quoted = true;
                    else if (ch === ',') { cells.push(cur); cur = ''; }
                    else cur += ch;
                }
                cells.push(cur);
                rows.push(cells);
            });
            const [head, ...body] = rows;
            if (!head) return [];
            return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), r[i]])));
        };

        const monthTag = (monthsBack) => {
            const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit' })
                .formatToParts(new Date());
            let y = Number(parts.find((p) => p.type === 'year').value);
            let m = Number(parts.find((p) => p.type === 'month').value) - monthsBack;
            while (m < 1) { m += 12; y -= 1; }
            return `${y}_${String(m).padStart(2, '0')}`;
        };

        const fetchMonth = async (tag) => {
            const res = await fetch(`${ENV_BASE}environment_${tag}.csv`);
            if (!res.ok) return [];
            return parseCSV(await res.text());
        };

        const loadEnv = async () => {
            const cached = store.getJSON(ENV_CACHE);
            if (cached && Date.now() - cached.t < ENV_TTL) return cached;

            let rows = await fetchMonth(monthTag(0)).catch(() => []);
            if (rows.length < 40) {
                const prev = await fetchMonth(monthTag(1)).catch(() => []);
                rows = prev.concat(rows);
            }
            rows = rows.filter((r) => r && r.time_local && isFinite(parseFloat(r.temp_c)));
            if (!rows.length) throw new Error('No environment data');

            const recent = rows.slice(-40);
            const r = recent[recent.length - 1];
            const num = (v) => (isFinite(parseFloat(v)) ? parseFloat(v) : 0);
            const data = {
                t: Date.now(),
                last: {
                    time: r.time_local,
                    temp: num(r.temp_c),
                    humidity: num(r.humidity),
                    weather: r.weather || '',
                    wind: num(r.wind_speed),
                    pm25: num(r.air_pm2_5),
                    aqi: Math.round(num(r.air_aqi)),
                    uv: num(r.uv_index),
                },
                series: {
                    temp: recent.map((x) => num(x.temp_c)),
                    pm25: recent.map((x) => num(x.air_pm2_5)),
                    humidity: recent.map((x) => num(x.humidity)),
                },
            };
            store.setJSON(ENV_CACHE, data);
            return data;
        };

        const smoothPath = (pts) => {
            let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[i - 1] || pts[i];
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const p3 = pts[i + 2] || p2;
                const t = 1 / 6;
                const c1x = p1[0] + (p2[0] - p0[0]) * t;
                const c1y = p1[1] + (p2[1] - p0[1]) * t;
                const c2x = p2[0] - (p3[0] - p1[0]) * t;
                const c2y = p2[1] - (p3[1] - p1[1]) * t;
                d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
            }
            return d;
        };

        const drawSpark = (animate) => {
            if (!spark || !state) return;
            const values = state.series[currentSeries] || [];
            const line = $('.spark-line', spark);
            const area = $('.spark-area', spark);
            const dot = $('.spark-dot', spark);
            if (values.length < 2) {
                line.setAttribute('d', '');
                area.setAttribute('d', '');
                return;
            }
            const w = Math.max(120, Math.round(spark.getBoundingClientRect().width || 320));
            const h = 84;
            const padX = 4;
            const padY = 10;
            spark.setAttribute('viewBox', `0 0 ${w} ${h}`);
            spark.setAttribute('preserveAspectRatio', 'none');

            const min = Math.min(...values);
            const max = Math.max(...values);
            const span = max - min || 1;
            const pts = values.map((v, i) => [
                padX + (i / (values.length - 1)) * (w - padX * 2),
                padY + (1 - (v - min) / span) * (h - padY * 2),
            ]);
            const d = smoothPath(pts);
            const end = pts[pts.length - 1];
            line.setAttribute('d', d);
            area.setAttribute('d', `${d} L ${end[0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`);
            dot.setAttribute('cx', end[0].toFixed(1));
            dot.setAttribute('cy', end[1].toFixed(1));

            const meta = SERIES[currentSeries];
            const fmt = (v) => v.toFixed(meta.digits);
            spark.setAttribute('aria-label', `${meta.label} over the last ${values.length} readings: from ${fmt(min)} to ${fmt(max)} ${meta.unit}, latest ${fmt(values[values.length - 1])} ${meta.unit}`);

            if (animate && !reduceMotion && line.getTotalLength) {
                const len = line.getTotalLength();
                line.style.transition = 'none';
                line.style.strokeDasharray = `${len}`;
                line.style.strokeDashoffset = `${len}`;
                area.style.opacity = '0';
                dot.style.opacity = '0';
                line.getBoundingClientRect();
                line.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
                line.style.strokeDashoffset = '0';
                setTimeout(() => { area.style.opacity = '1'; }, 350);
                setTimeout(() => { dot.style.opacity = '1'; }, 1100);
            } else {
                line.style.strokeDasharray = '';
                line.style.strokeDashoffset = '';
                area.style.opacity = '1';
                dot.style.opacity = '1';
            }
        };

        const render = (data, live) => {
            state = data;
            const L = data.last;
            set('temp', String(Math.round(L.temp)));
            set('weather', cap(L.weather) || '—');
            const aqiEl = $('[data-env="aqi"]', env);
            if (aqiEl) {
                aqiEl.textContent = AQI[L.aqi] || '—';
                aqiEl.dataset.level = String(L.aqi);
            }
            set('pm25', L.pm25.toFixed(1));
            set('humidity', String(Math.round(L.humidity)));
            set('uv', String(Math.round(L.uv * 10) / 10));
            set('uv-label', uvLabel(L.uv));
            const icon = $('[data-env-icon]', env);
            if (icon) icon.setAttribute('href', `#i-${weatherIcon(L.weather)}`);
            const when = parseTime(L.time);
            set('updated', when ? `Logged ${relTime(when)}` : 'Logged recently');
            set('range', `Last ${data.series.temp.length} readings`);
            if (statusEl) statusEl.classList.toggle('is-snapshot', !live);
            if (statusText) statusText.textContent = live ? 'Live' : 'Snapshot';
            drawSpark(true);
        };

        seriesBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute('aria-pressed') === 'true') return;
                currentSeries = btn.dataset.series;
                seriesBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
                drawSpark(true);
            });
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => drawSpark(false), 150);
        }, { passive: true });

        whenNear(env, () => {
            let settled = false;
            // Show the last known readings if the network is slow, then upgrade.
            const fallback = setTimeout(() => {
                if (!settled) render(SNAPSHOT, false);
            }, 3500);
            loadEnv()
                .then((data) => {
                    settled = true;
                    clearTimeout(fallback);
                    render(data, true);
                })
                .catch(() => {
                    settled = true;
                    clearTimeout(fallback);
                    render(SNAPSHOT, false);
                });
        }, '150px');
    }

    /* ---------- 12. Dhaka clock ---------- */
    const clockEl = $('[data-clock]');
    if (clockEl) {
        const clockFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: 'numeric', minute: '2-digit' });
        const tick = () => { clockEl.textContent = clockFmt.format(new Date()); };
        tick();
        setInterval(tick, 20000);
    }

    /* ---------- 13. Copy + toast ---------- */
    const toastEl = $('[data-toast]');
    let toastTimer;
    const toast = (message) => {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2400);
    };

    const legacyCopy = (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
        ta.remove();
        return ok;
    };

    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-copy]');
        if (!btn) return;
        const text = btn.dataset.copy;
        let ok = false;
        try {
            await navigator.clipboard.writeText(text);
            ok = true;
        } catch (_) {
            ok = legacyCopy(text);
        }
        if (ok) {
            btn.classList.add('is-copied');
            toast('Email address copied');
            setTimeout(() => btn.classList.remove('is-copied'), 1800);
        } else {
            toast(text);
        }
    });

    /* ---------- 14. Contact form (Formspree) ---------- */
    const form = $('#contact-form');
    if (form) {
        const statusMsg = $('.form-status', form);
        const submitBtn = $('.btn-submit', form);
        const submitLabel = $('.btn-label', submitBtn);
        const success = $('.form-success');
        const successText = $('[data-success-text]');
        const subjectInput = $('input[name="_subject"]', form);
        const counter = $('[data-counter]', form);
        const MAX_LEN = 2000;

        const fields = {
            name: $('#cf-name', form),
            email: $('#cf-email', form),
            message: $('#cf-message', form),
        };
        const errors = {
            name: $('#cf-name-error', form),
            email: $('#cf-email-error', form),
            message: $('#cf-message-error', form),
        };

        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const URL_RE = /\b(https?:\/\/|www\.)\S+/i;
        const validators = {
            name: (v) => {
                const t = v.trim();
                if (!t) return 'Please enter your name.';
                if (t.length < 2) return 'That name looks a little short.';
                if (t.length > 80) return 'Please keep your name under 80 characters.';
                if (URL_RE.test(t)) return 'Links are not allowed in the name field.';
                return null;
            },
            email: (v) => {
                const t = v.trim();
                if (!t) return 'Please enter your email so I can reply.';
                if (t.length > 120) return 'That email is too long.';
                if (!EMAIL_RE.test(t)) return 'That email doesn’t look right — please check it.';
                return null;
            },
            message: (v) => {
                const t = v.trim();
                if (!t) return 'Please write a short message.';
                if (t.length < 10) return `A little more detail, please (${t.length}/10 characters).`;
                if (t.length > MAX_LEN) return `Please keep it under ${nf.format(MAX_LEN)} characters.`;
                const links = t.match(/\bhttps?:\/\/\S+/gi) || [];
                if (links.length > 3) return 'Too many links — please trim them down.';
                return null;
            },
        };

        const setStatus = (msg, kind) => {
            statusMsg.textContent = msg || '';
            statusMsg.className = `form-status${kind ? ` ${kind}` : ''}`;
        };

        const setFieldError = (name, msg) => {
            const input = fields[name];
            input.classList.toggle('is-invalid', Boolean(msg));
            if (msg) input.setAttribute('aria-invalid', 'true');
            else input.removeAttribute('aria-invalid');
            errors[name].textContent = msg || '';
        };

        const validateField = (name) => {
            const msg = validators[name](fields[name].value);
            setFieldError(name, msg);
            return !msg;
        };

        const validateAll = () => {
            let firstInvalid = null;
            Object.keys(fields).forEach((name) => {
                if (!validateField(name) && !firstInvalid) firstInvalid = fields[name];
            });
            if (firstInvalid) firstInvalid.focus();
            return !firstInvalid;
        };

        Object.keys(fields).forEach((name) => {
            fields[name].addEventListener('blur', () => {
                if (fields[name].value.trim()) validateField(name);
            });
            fields[name].addEventListener('input', () => {
                if (fields[name].classList.contains('is-invalid')) validateField(name);
            });
        });

        const updateCounter = () => {
            if (!counter) return;
            const len = fields.message.value.length;
            counter.textContent = `${nf.format(len)} / ${nf.format(MAX_LEN)}`;
            counter.classList.toggle('is-near', len >= MAX_LEN * 0.85 && len < MAX_LEN);
            counter.classList.toggle('is-max', len >= MAX_LEN);
        };
        fields.message.addEventListener('input', updateCounter);
        updateCounter();

        // Light client-side rate limit (the real spam filtering happens at Formspree).
        const RL_KEY = 'contact-form-rl';
        const RL_MIN_GAP = 30 * 1000;
        const RL_WINDOW = 60 * 60 * 1000;
        const RL_MAX = 3;
        const readRL = () => {
            const arr = store.getJSON(RL_KEY);
            return Array.isArray(arr) ? arr.filter((t) => Date.now() - t < RL_WINDOW) : [];
        };
        const checkRL = () => {
            const sends = readRL();
            const now = Date.now();
            if (sends.length >= RL_MAX) {
                const mins = Math.ceil((RL_WINDOW - (now - Math.min(...sends))) / 60000);
                return `You've sent ${RL_MAX} messages this hour. Please try again in about ${mins} min, or email me directly.`;
            }
            const last = sends.length ? Math.max(...sends) : 0;
            if (last && now - last < RL_MIN_GAP) {
                return `Please wait ${Math.ceil((RL_MIN_GAP - (now - last)) / 1000)}s before sending another message.`;
            }
            return null;
        };

        const setLoading = (on) => {
            submitBtn.disabled = on;
            submitBtn.classList.toggle('is-loading', on);
            if (submitLabel) submitLabel.textContent = on ? 'Sending…' : 'Send message';
        };

        const showSuccess = (name) => {
            const firstName = (name || '').trim().split(/\s+/)[0];
            if (successText) {
                successText.textContent = `Thanks${firstName ? `, ${firstName}` : ''}! Your message is on its way — I'll get back to you within a day or two.`;
            }
            form.hidden = true;
            if (success) {
                success.hidden = false;
                success.focus({ preventScroll: true });
            }
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            setStatus('');

            const gotcha = $('[name="_gotcha"]', form);
            if (gotcha && gotcha.value.trim()) {
                showSuccess('');
                form.reset();
                return;
            }

            if (!validateAll()) {
                setStatus('Please fix the highlighted fields.', 'error');
                return;
            }

            const limited = checkRL();
            if (limited) {
                setStatus(limited, 'warn');
                return;
            }

            const name = fields.name.value.trim();
            const topicInput = $('input[name="topic"]:checked', form);
            const topic = topicInput ? topicInput.value : '';
            if (subjectInput) subjectInput.value = `New message from ${name}${topic ? ` · ${topic}` : ''} — syedraihanali.me`;

            setLoading(true);
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                if (res.ok) {
                    const sends = readRL();
                    sends.push(Date.now());
                    store.setJSON(RL_KEY, sends);
                    track('generate_lead', { method: 'contact_form', topic: topic || 'none' });
                    showSuccess(name);
                    form.reset();
                    updateCounter();
                } else {
                    const json = await res.json().catch(() => ({}));
                    const msg = Array.isArray(json.errors) && json.errors.length
                        ? json.errors.map((x) => x.message).join(' ')
                        : `Couldn't send your message (error ${res.status}). Please try again or email me directly.`;
                    setStatus(msg, 'error');
                }
            } catch (_) {
                setStatus('Network error — please check your connection and try again, or email me directly.', 'error');
            } finally {
                setLoading(false);
            }
        });

        const resetBtn = $('[data-form-reset]');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (success) success.hidden = true;
                form.hidden = false;
                setStatus('');
                fields.name.focus();
            });
        }
    }

    /* ---------- 15. Misc ---------- */
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

    $$('a[href$=".pdf"]').forEach((link) => link.addEventListener('click', () => track('cv_download')));
})();
