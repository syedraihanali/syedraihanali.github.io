/* ============================================================
   Portfolio v2 — interactions
   - Reveal-on-scroll (IntersectionObserver, no library)
   - Mobile nav toggle
   - Active nav-link highlighter
   - Live GitHub card with 1h localStorage cache
   - Formspree async contact submit
   ============================================================ */

(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Reveal-on-scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Mobile nav toggle ---------- */
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (toggle && nav && menu) {
        const close = () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        menu.addEventListener('click', (e) => {
            if (e.target.matches('a')) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    /* ---------- Active nav-link on scroll ---------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const setActive = (id) => {
            navLinks.forEach((link) => {
                const match = link.getAttribute('href') === '#' + id;
                if (match) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
        };
        const navObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActive(visible.target.id);
        }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
        sections.forEach((s) => navObserver.observe(s));
    }

    /* ---------- Live GitHub card ---------- */
    const ghCard = document.getElementById('gh-card');
    if (ghCard) {
        const user = ghCard.dataset.ghUser || 'syedraihanali';
        const CACHE_KEY = `gh-cache-${user}-v2`;
        const CACHE_TTL = 60 * 60 * 1000; // 1 hour

        const elContrib = ghCard.querySelector('[data-gh-contributions]');
        const elFollowers = ghCard.querySelector('[data-gh-followers]');
        const elEvents = ghCard.querySelector('[data-gh-events]');
        const elRefresh = ghCard.querySelector('[data-gh-refresh]');
        const elHeatmap = ghCard.querySelector('[data-gh-heatmap]');

        const relTime = (iso) => {
            const diff = Date.now() - new Date(iso).getTime();
            const m = Math.round(diff / 60000);
            if (m < 1) return 'just now';
            if (m < 60) return `${m}m ago`;
            const h = Math.round(m / 60);
            if (h < 24) return `${h}h ago`;
            const d = Math.round(h / 24);
            if (d < 30) return `${d}d ago`;
            const mo = Math.round(d / 30);
            return `${mo}mo ago`;
        };

        const escapeHtml = (str) => String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        const truncate = (str, n) => (str.length > n ? str.slice(0, n - 1) + '…' : str);

        const formatNum = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : '—');

        const renderHeatmap = (contributions) => {
            if (!Array.isArray(contributions) || !contributions.length) {
                elHeatmap.innerHTML = '';
                return;
            }
            // First cell needs to start on the correct day-of-week row.
            // CSS uses grid-auto-flow: column; row 1 = Sunday.
            const firstDate = new Date(contributions[0].date);
            const startDay = firstDate.getDay(); // 0=Sun..6=Sat
            const cells = [];
            for (let i = 0; i < startDay; i++) {
                cells.push('<span class="gh-day" data-level="0" aria-hidden="true" style="visibility:hidden"></span>');
            }
            for (const day of contributions) {
                const lvl = Math.max(0, Math.min(4, day.level || 0));
                const label = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`;
                cells.push(`<span class="gh-day" data-level="${lvl}" title="${label}" aria-label="${label}"></span>`);
            }
            elHeatmap.innerHTML = cells.join('');
        };

        const render = (data, fromCacheFlag) => {
            elContrib.textContent = formatNum(data.total_contributions);
            elFollowers.textContent = formatNum(data.followers);

            renderHeatmap(data.contributions);

            if (data.events && data.events.length) {
                elEvents.innerHTML = data.events.map((e) => `
                    <li class="gh-event">
                        <span>
                            <strong>${escapeHtml(e.repo)}</strong>
                            ${e.message ? `<span style="color:var(--text-soft)"> — ${escapeHtml(truncate(e.message, 60))}</span>` : ''}
                            <time datetime="${e.created_at}">${relTime(e.created_at)}</time>
                        </span>
                    </li>
                `).join('');
            } else {
                elEvents.innerHTML = '<li class="gh-event"><span style="color:var(--text-soft)">no recent public push events</span></li>';
            }

            elRefresh.textContent = fromCacheFlag ? `cached · ${relTime(data._fetchedAt)}` : 'just now';
        };

        const renderError = () => {
            elContrib.textContent = '—';
            elFollowers.textContent = '—';
            elHeatmap.innerHTML = '<span style="color:var(--text-soft);font-family:var(--font-mono);font-size:0.78rem">heatmap unavailable</span>';
            elEvents.innerHTML = '<li class="gh-event"><span style="color:var(--text-soft)">github data unavailable · <a href="https://github.com/' + user + '" target="_blank" rel="noopener" style="color:var(--accent-deep)">view profile ↗</a></span></li>';
            elRefresh.textContent = 'offline';
        };

        const readCache = () => {
            try {
                const raw = localStorage.getItem(CACHE_KEY);
                if (!raw) return null;
                const parsed = JSON.parse(raw);
                if (Date.now() - parsed._fetchedAt > CACHE_TTL) return null;
                return parsed;
            } catch (_) { return null; }
        };

        const saveCache = (data) => {
            try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (_) {}
        };

        const fetchFresh = async () => {
            const headers = { 'Accept': 'application/vnd.github+json' };
            const [userRes, eventsRes, contribRes] = await Promise.all([
                fetch(`https://api.github.com/users/${user}`, { headers }),
                fetch(`https://api.github.com/users/${user}/events/public?per_page=10`, { headers }),
                fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`),
            ]);
            if (!userRes.ok) throw new Error(`HTTP user ${userRes.status}`);
            const profile = await userRes.json();
            const events = eventsRes.ok ? await eventsRes.json() : [];
            const contrib = contribRes.ok ? await contribRes.json() : null;

            const pushEvents = (Array.isArray(events) ? events : [])
                .filter((e) => e.type === 'PushEvent')
                .slice(0, 2)
                .map((e) => ({
                    repo: e.repo?.name?.split('/')?.[1] || e.repo?.name || 'repo',
                    message: e.payload?.commits?.[0]?.message || '',
                    created_at: e.created_at,
                }));

            return {
                followers: profile.followers,
                total_contributions: contrib?.total?.lastYear ?? null,
                contributions: contrib?.contributions ?? [],
                events: pushEvents,
                _fetchedAt: Date.now(),
            };
        };

        const cached = readCache();
        if (cached) {
            render(cached, true);
        } else {
            fetchFresh()
                .then((data) => { saveCache(data); render(data, false); })
                .catch((err) => { console.warn('GitHub fetch failed:', err); renderError(); });
        }
    }

    /* ---------- Contact form: validation + rate limit + Formspree ---------- */
    const form = document.getElementById('contact-form');
    if (form) {
        const status = form.querySelector('.form-status');
        const submitBtn = form.querySelector('button[type="submit"]');

        const fields = {
            name:    form.querySelector('#cf-name'),
            email:   form.querySelector('#cf-email'),
            message: form.querySelector('#cf-message'),
        };

        const errorEls = {
            name:    form.querySelector('[data-error-for="cf-name"]'),
            email:   form.querySelector('[data-error-for="cf-email"]'),
            message: form.querySelector('[data-error-for="cf-message"]'),
        };

        const counterEl = form.querySelector('[data-counter-for="cf-message"]');

        // Rate-limit constants
        const RL_KEY = 'contact-form-rl';
        const RL_MIN_INTERVAL = 30 * 1000;          // 30s between submissions
        const RL_WINDOW = 60 * 60 * 1000;            // 1 hour rolling window
        const RL_MAX_PER_WINDOW = 3;                 // max 3 successful sends / hour

        // Validators return null on success or an error message string.
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const URL_RE   = /\b(https?:\/\/|www\.)\S+/i;
        const validators = {
            name: (v) => {
                v = v.trim();
                if (!v) return 'Please enter your name.';
                if (v.length < 2) return 'Name is too short.';
                if (v.length > 80) return 'Name is too long.';
                if (URL_RE.test(v)) return 'No URLs in the name field.';
                return null;
            },
            email: (v) => {
                v = v.trim();
                if (!v) return 'Please enter your email.';
                if (v.length > 120) return 'Email is too long.';
                if (!EMAIL_RE.test(v)) return 'That email looks off — check it again.';
                return null;
            },
            message: (v) => {
                const t = v.trim();
                if (!t) return 'Please write a message.';
                if (t.length < 10) return `A bit more, please (${t.length}/10 chars).`;
                if (t.length > 2000) return 'Message is too long (max 2000).';
                // crude link-spam heuristic — more than 3 URLs is almost always spam
                const urlMatches = t.match(/\bhttps?:\/\/\S+/gi) || [];
                if (urlMatches.length > 3) return 'Too many links — please trim them down.';
                return null;
            },
        };

        const setStatus = (msg, kind) => {
            if (!status) return;
            status.textContent = msg;
            status.classList.remove('success', 'error', 'warn');
            if (kind) status.classList.add(kind);
        };

        const setFieldError = (name, msg) => {
            const input = fields[name];
            const errEl = errorEls[name];
            if (msg) {
                input.classList.add('is-invalid');
                input.setAttribute('aria-invalid', 'true');
                errEl.textContent = msg;
            } else {
                input.classList.remove('is-invalid');
                input.removeAttribute('aria-invalid');
                errEl.textContent = '';
            }
        };

        const validateField = (name) => {
            const msg = validators[name](fields[name].value);
            setFieldError(name, msg);
            return msg === null;
        };

        const validateAll = () => {
            let firstInvalid = null;
            for (const name of Object.keys(fields)) {
                const ok = validateField(name);
                if (!ok && !firstInvalid) firstInvalid = fields[name];
            }
            if (firstInvalid) firstInvalid.focus();
            return !firstInvalid;
        };

        // Live validation: clear errors as the user types, validate on blur
        for (const name of Object.keys(fields)) {
            fields[name].addEventListener('blur', () => validateField(name));
            fields[name].addEventListener('input', () => {
                if (fields[name].classList.contains('is-invalid')) {
                    validateField(name);
                }
            });
        }

        // Message character counter
        if (counterEl) {
            const update = () => {
                const len = fields.message.value.length;
                counterEl.textContent = `${len} / 2000`;
                counterEl.classList.toggle('is-near-limit', len >= 1700 && len < 2000);
                counterEl.classList.toggle('is-at-limit', len >= 2000);
            };
            fields.message.addEventListener('input', update);
            update();
        }

        // Rate-limit helpers
        const readRL = () => {
            try {
                const raw = localStorage.getItem(RL_KEY);
                if (!raw) return [];
                const arr = JSON.parse(raw);
                return Array.isArray(arr) ? arr.filter((t) => Date.now() - t < RL_WINDOW) : [];
            } catch (_) { return []; }
        };
        const writeRL = (arr) => {
            try { localStorage.setItem(RL_KEY, JSON.stringify(arr)); } catch (_) {}
        };
        const checkRL = () => {
            const sends = readRL();
            const now = Date.now();
            if (sends.length >= RL_MAX_PER_WINDOW) {
                const oldest = Math.min(...sends);
                const waitMs = RL_WINDOW - (now - oldest);
                const mins = Math.ceil(waitMs / 60000);
                return { ok: false, msg: `You've hit the hourly limit (${RL_MAX_PER_WINDOW} messages). Try again in ~${mins} min, or email directly.` };
            }
            const last = sends.length ? Math.max(...sends) : 0;
            const since = now - last;
            if (last && since < RL_MIN_INTERVAL) {
                const wait = Math.ceil((RL_MIN_INTERVAL - since) / 1000);
                return { ok: false, msg: `Easy there — please wait ${wait}s before sending another message.` };
            }
            return { ok: true };
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot — bot caught
            const gotcha = form.querySelector('[name="_gotcha"]');
            if (gotcha && gotcha.value.trim()) {
                setStatus('Thanks!', 'success');
                form.reset();
                return;
            }

            // Rate limit (before validation, so we don't waste cycles)
            const rl = checkRL();
            if (!rl.ok) {
                setStatus(rl.msg, 'warn');
                return;
            }

            // Per-field validation
            if (!validateAll()) {
                setStatus('Please fix the highlighted fields.', 'error');
                return;
            }

            const action = form.getAttribute('action') || '';
            if (action.includes('YOUR_FORM_ID')) {
                setStatus("Form not configured yet — replace YOUR_FORM_ID in index.html with your Formspree endpoint.", 'error');
                return;
            }

            submitBtn.disabled = true;
            const originalLabel = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending…';
            setStatus('');

            try {
                const data = new FormData(form);
                const res = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' },
                });
                if (res.ok) {
                    // Record successful send for rate-limit window
                    const sends = readRL();
                    sends.push(Date.now());
                    writeRL(sends);
                    setStatus("Message sent — I'll reply within a day or two.", 'success');
                    form.reset();
                    if (counterEl) counterEl.textContent = '0 / 2000';
                } else {
                    const json = await res.json().catch(() => ({}));
                    const msg = json?.errors?.map((x) => x.message).join(', ') || `Couldn't send (HTTP ${res.status}).`;
                    setStatus(msg, 'error');
                }
            } catch (err) {
                setStatus('Network error — try again or email me directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalLabel;
            }
        });
    }
})();
