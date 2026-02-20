/* ============================================
   LA BIBLIOTECA GAMER — main.js
   Vanilla JS: mobile menu, scroll effects,
   RAWG API game loading, filters, search,
   contact form, scroll-to-top, animations.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile Menu ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Sticky Header Shadow ---------- */
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    /* ---------- Scroll-to-Top Button ---------- */
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Animate on Scroll ---------- */
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('animated'));
    }

    /* ========================================
       RAWG API — Biblioteca de juegos
       ======================================== */
    const RAWG_KEY = 'f5ed341cd9f6487182ae5e4b62d42fd8';
    const RAWG_BASE = 'https://api.rawg.io/api/games';
    const PAGE_SIZE = 12;

    const gamesGrid = document.getElementById('games-grid');
    const noResults = document.getElementById('no-results');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterButtons = document.getElementById('filter-buttons');
    const searchInput = document.getElementById('search-input');

    if (gamesGrid) {
        let currentPage = 1;
        let currentGenre = '';
        let currentSearch = '';
        let isLoading = false;
        let hasMore = true;
        let searchTimeout = null;

        // Platform slug → display name mapping
        const platformNames = {
            pc: 'PC',
            playstation: 'PS',
            xbox: 'Xbox',
            nintendo: 'Switch',
            mac: 'Mac',
            linux: 'Linux',
            ios: 'iOS',
            android: 'Android',
            web: 'Web'
        };

        // Generate star rating
        function renderStars(rating) {
            const full = Math.floor(rating);
            const half = rating - full >= 0.25;
            let stars = '';
            for (let i = 0; i < full; i++) stars += '★';
            if (half) stars += '☆';
            return stars;
        }

        // Create skeleton loading cards
        function showSkeletons(count = PAGE_SIZE) {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="skeleton-card">
                        <div class="skeleton-img"></div>
                        <div class="skeleton-body">
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line"></div>
                        </div>
                    </div>`;
            }
            return html;
        }

        // Create a single game card HTML
        function createGameCard(game) {
            const imgSrc = game.background_image || '';
            const name = game.name || 'Sin nombre';
            const rating = game.rating || 0;
            const genres = (game.genres || []).slice(0, 3);
            const platforms = (game.parent_platforms || []).map(p => p.platform);

            const genreTags = genres.map(g =>
                `<span class="tag tag-red">${g.name}</span>`
            ).join('');

            const platformList = platforms.map(p =>
                platformNames[p.slug] || p.name
            ).join(' · ');

            return `
                <article class="game-card">
                    ${imgSrc
                    ? `<img class="game-card-img" src="${imgSrc}" alt="${name}" loading="lazy">`
                    : `<div class="game-card-img" style="display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:.85rem;">Sin imagen</div>`
                }
                    <div class="game-card-body">
                        <h3>${name}</h3>
                        <div class="game-rating">
                            <span class="stars">${renderStars(rating)}</span>
                            <span class="rating-num">${rating.toFixed(1)}</span>
                        </div>
                        <div class="game-meta">${genreTags}</div>
                        ${platformList
                    ? `<p class="platforms">🎮 ${platformList}</p>`
                    : ''
                }
                    </div>
                </article>`;
        }

        // Fetch games from RAWG API
        async function fetchGames(page = 1, append = false) {
            if (isLoading) return;
            isLoading = true;

            // Show skeletons on first load
            if (!append) {
                gamesGrid.innerHTML = showSkeletons();
                noResults.classList.remove('visible');
            }

            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Cargando…';
                loadMoreBtn.disabled = true;
            }

            try {
                let url = `${RAWG_BASE}?key=${RAWG_KEY}&page_size=${PAGE_SIZE}&page=${page}&ordering=-rating`;

                if (currentGenre) {
                    url += `&genres=${currentGenre}`;
                }

                if (currentSearch) {
                    url += `&search=${encodeURIComponent(currentSearch)}`;
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                const games = data.results || [];
                hasMore = !!data.next;

                if (!append) {
                    gamesGrid.innerHTML = '';
                }

                if (games.length === 0 && !append) {
                    noResults.classList.add('visible');
                    if (loadMoreContainer) loadMoreContainer.style.display = 'none';
                } else {
                    noResults.classList.remove('visible');
                    games.forEach(game => {
                        gamesGrid.insertAdjacentHTML('beforeend', createGameCard(game));
                    });

                    if (loadMoreContainer) {
                        loadMoreContainer.style.display = hasMore ? '' : 'none';
                    }
                }
            } catch (err) {
                console.error('Error cargando juegos:', err);
                if (!append) {
                    gamesGrid.innerHTML = `
                        <div class="no-results visible" style="display:block">
                            <p>⚠️ Error al cargar juegos. Inténtalo de nuevo más tarde.</p>
                        </div>`;
                }
            } finally {
                isLoading = false;
                if (loadMoreBtn) {
                    loadMoreBtn.textContent = 'Cargar más juegos';
                    loadMoreBtn.disabled = false;
                }
            }
        }

        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                fetchGames(currentPage, true);
            });
        }

        // Filter by genre
        if (filterButtons) {
            filterButtons.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;

                filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentGenre = btn.dataset.filter;
                currentPage = 1;
                fetchGames(1, false);
            });
        }

        // Search with debounce
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    currentSearch = searchInput.value.trim();
                    currentPage = 1;
                    fetchGames(1, false);
                }, 400);
            });
        }

        // Check for URL param ?genre= to pre-select
        const urlParams = new URLSearchParams(window.location.search);
        const genreParam = urlParams.get('genre');
        if (genreParam) {
            currentGenre = genreParam;
            if (filterButtons) {
                filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.filter === genreParam);
                });
            }
        }

        // Initial load
        fetchGames(1, false);
    }

    /* ========================================
       CONTACT FORM — mailto fallback
       ======================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (contactForm.action.endsWith('#') || contactForm.action === window.location.href) {
                e.preventDefault();

                const name = document.getElementById('contact-name')?.value || '';
                const email = document.getElementById('contact-email')?.value || '';
                const message = document.getElementById('contact-message')?.value || '';

                const subject = encodeURIComponent(`Contacto desde La Biblioteca Gamer — ${name}`);
                const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);

                const mailtoLink = `mailto:roberttozion@gmail.com?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
            }
        });
    }

    /* ========================================
       NEWSLETTER FORM — placeholder handler
       ======================================== */
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
        nlForm.addEventListener('submit', (e) => {
            if (nlForm.action.endsWith('#') || nlForm.action === window.location.href) {
                e.preventDefault();
                const btn = nlForm.querySelector('button[type="submit"]');
                if (btn) {
                    const originalText = btn.textContent;
                    btn.textContent = '✅ ¡Gracias! Te avisaremos pronto.';
                    btn.disabled = true;
                    btn.style.background = '#22c55e';
                    btn.style.boxShadow = 'none';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                        btn.style.boxShadow = '';
                        nlForm.reset();
                    }, 3000);
                }
            }
        });
    }

});
