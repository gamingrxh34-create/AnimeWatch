// ═══════════════════════════════════════
// ANIMEWATCH — Main App
// ═══════════════════════════════════════

// ── NAVIGATION ──
function navigateToPage(pageName) {
  if (requireAuth(pageName) && !isLoggedIn()) {
    showToast('Please login to continue', 'error');
    navigateToPage('login');
    return;
  }

  // Stop iframe audio + progress tracking when leaving watch
  if (pageName !== 'watch') {
    const iframe = document.getElementById('videoIframe');
    if (iframe) iframe.src = '';
    if (typeof stopProgressTracking === 'function') stopProgressTracking();
    // Show miniplayer when navigating away from watch
    if (typeof currentAnime !== 'undefined' && currentAnime) {
      const watchPage = document.getElementById('page-watch');
      if (watchPage && watchPage.style.display !== 'none') {
        if (typeof showMiniPlayer === 'function') showMiniPlayer();
      }
    }
  } else {
    if (typeof hideMiniPlayer === 'function') hideMiniPlayer();
  }

  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const target = document.getElementById(`page-${pageName}`);
  if (target) target.style.display = 'block';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });
  window.location.hash = pageName;
  if      (pageName === 'movies')   renderMoviesPage();
  else if (pageName === 'series')   renderSeriesPage();
  else if (pageName === 'history')  renderHistoryPage();
  else if (pageName === 'mylist')   renderMyListPage();
  else if (pageName === 'filter')   renderFilterPage();
  else if (pageName === 'profile')  renderProfilePage();
  else if (pageName === 'settings') { if (typeof renderSettingsPage === 'function') renderSettingsPage(); }
  else if (pageName === 'home') {
    if (typeof renderAnimeQuote === 'function') renderAnimeQuote();
    if (typeof renderDailyChallenge === 'function') renderDailyChallenge();
  }
  closeMobileNav();
  window.scrollTo(0, 0);
}

// ── TOAST ──
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ── ANIME CARD ──
function renderAnimeCard(anime, opts = {}) {
  const { showRating = false, continueEp = null } = opts;
  const card = document.createElement('div');
  card.className = 'anime-card';

  const thumb = document.createElement('div');
  thumb.className = 'anime-card-thumb';

  const img = document.createElement('img');
  img.src = anime.cover; img.alt = anime.title; img.loading = 'lazy';

  const overlay = document.createElement('div');
  overlay.className = 'anime-card-overlay';
  const playBtn = document.createElement('div');
  playBtn.className = 'anime-card-play';
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  overlay.appendChild(playBtn);

  // Hover info card — slides up on hover showing synopsis + meta
  const hoverCard = document.createElement('div');
  hoverCard.className = 'card-hover-info';
  hoverCard.innerHTML = `
    <div class="chi-genres">${anime.genre.slice(0,3).map(g=>`<span>${g}</span>`).join('')}</div>
    <div class="chi-synopsis">${(anime.synopsis||'').slice(0,110)}${(anime.synopsis||'').length>110?'…':''}</div>
    <div class="chi-meta">
      ${anime.malScore?`<span class="chi-score"><i class="fas fa-star"></i>${anime.malScore}</span>`:''}
      <span class="chi-status ${anime.status==='Ongoing'?'ongoing':''}">${anime.status||''}</span>
      <span class="chi-eps">${anime.episodes.length>0?anime.episodes.length+' ep':'Coming Soon'}</span>
    </div>
    <div class="chi-action">${anime.episodes.length>0?'<i class="fas fa-play"></i> Watch Now':'<i class="fas fa-clock"></i> Coming Soon'}</div>
  `;
  thumb.appendChild(hoverCard);

  const typeBadge = document.createElement('div');
  typeBadge.className = `anime-card-type-badge ${anime.type === 'movie' ? 'movie' : ''}`;
  typeBadge.textContent = anime.type === 'movie' ? 'MOVIE' : 'SERIES';

  // Fav button
  const favBtn = document.createElement('button');
  favBtn.className = `card-fav-btn ${isFavorite(anime.slug) ? 'active' : ''}`;
  favBtn.innerHTML = `<i class="fas fa-heart"></i>`;
  favBtn.title = 'Add to My List';
  favBtn.addEventListener('click', e => {
    e.stopPropagation();
    const added = toggleFavorite(anime.slug);
    favBtn.classList.toggle('active', added);
  });

  thumb.appendChild(img);
  thumb.appendChild(overlay);
  thumb.appendChild(typeBadge);
  thumb.appendChild(favBtn);

  // MAL score badge
  if (anime.malScore) {
    const score = document.createElement('div');
    score.className = 'card-score-badge';
    score.innerHTML = `<i class="fas fa-star"></i> ${anime.malScore}`;
    thumb.appendChild(score);
  }

  // Progress bar for continue watching
  if (continueEp !== null) {
    const epIdx = continueEp.episodeIndex;
    const total = anime.episodes.length;
    const pct   = total > 1 ? Math.round((epIdx / (total - 1)) * 100) : 100;
    const bar   = document.createElement('div');
    bar.className = 'card-progress-bar';
    bar.innerHTML = `<div class="card-progress-fill" style="width:${pct}%"></div>`;
    thumb.appendChild(bar);
  }

  const info = document.createElement('div');
  info.className = 'anime-card-info';

  const title = document.createElement('div');
  title.className = 'anime-card-title';
  title.title = anime.title;
  title.textContent = anime.title;

  const genres = document.createElement('div');
  genres.className = 'anime-card-genres';
  anime.genre.slice(0, 2).forEach(g => {
    const span = document.createElement('span');
    span.className = 'anime-card-genre';
    span.textContent = g;
    genres.appendChild(span);
  });

  if (showRating) {
    const userRating = getUserRating(anime.slug);
    const stars = document.createElement('div');
    stars.className = 'card-stars';
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('i');
      s.className = `fas fa-star ${i <= userRating ? 'filled' : ''}`;
      stars.appendChild(s);
    }
    info.appendChild(stars);
  }

  info.appendChild(title);
  info.appendChild(genres);
  card.appendChild(thumb);
  card.appendChild(info);

  // Click: continue ep overrides modal
  if (continueEp !== null) {
    card.addEventListener('click', () => watchAnime(anime.slug, continueEp.episodeIndex));
  } else {
    card.addEventListener('click', () => openAnimeModal(anime.slug));
  }

  return card;
}

// ── ANIME DETAIL MODAL (Full info like Animovitch) ──
function openAnimeModal(slug) {
  const anime = animeData.find(a => a.slug === slug);
  if (!anime) return;

  const modal      = document.getElementById('animeModal');
  const userRating = getUserRating(slug);
  const favActive  = isFavorite(slug) ? 'active' : '';
  const histItem   = getWatchHistory().find(h => h.slug === slug);
  const resumeEp   = histItem ? histItem.episodeIndex : 0;
  const resumeLabel = histItem ? `Resume Ep ${resumeEp + 1}` : 'Watch Now';
  const synopsis   = anime.synopsis || `${anime.title} is a ${anime.genre.join(', ')} ${anime.type}. Click Watch Now to start streaming.`;

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeAnimeModal()"></div>
    <div class="modal-card">
      <button class="modal-close" onclick="closeAnimeModal()"><i class="fas fa-times"></i></button>

      <div class="modal-layout">
        <!-- Left: Cover -->
        <div class="modal-cover-col">
          <img src="${anime.cover}" alt="${anime.title}" class="modal-cover-img" />
          <div class="modal-actions">
            ${anime.episodes.length > 0
              ? `<button class="btn-watch modal-watch-btn" onclick="closeAnimeModal(); watchAnime('${slug}', ${resumeEp})">
                  <i class="fas fa-play"></i> ${resumeLabel}
                </button>`
              : `<button class="btn-watch modal-watch-btn" disabled style="opacity:0.5;cursor:not-allowed">
                  <i class="fas fa-clock"></i> Coming Soon
                </button>`
            }
            <button class="modal-fav-btn ${favActive}" id="modalFavBtn" onclick="handleModalFav('${slug}')">
              <i class="fas fa-heart"></i> <span id="modalFavText">${isFavorite(slug) ? 'In My List' : 'My List'}</span>
            </button>
            <div class="modal-list-wrap">
              <button class="modal-list-btn" id="modalListStatusBtn" onclick="toggleListDropdown('${slug}')"></button>
              <div class="list-status-dropdown" id="listStatusDropdown" style="display:none"></div>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="modal-info-col">
          <div class="modal-badges">
            <span class="modal-type-badge ${anime.type === 'movie' ? 'movie' : ''}">${anime.type === 'movie' ? '🎬 Movie' : '📺 Series'}</span>
            <span class="modal-ep-badge">${anime.episodes.length} ep</span>
            ${anime.status ? `<span class="modal-status-badge">${anime.status}</span>` : ''}
          </div>
          <h2 class="modal-title">${anime.title}</h2>
          <div class="modal-genres">${anime.genre.map(g => `<span class="genre-badge" onclick="closeAnimeModal(); filterByGenre('${g}')">${g}</span>`).join('')}</div>

          <!-- Info table like Animovitch -->
          <div class="modal-info-table">
            ${anime.malScore ? `<div class="modal-info-row"><span>MAL Score</span><b><i class="fas fa-star" style="color:var(--gold)"></i> ${anime.malScore}</b></div>` : ''}
            ${anime.aired    ? `<div class="modal-info-row"><span>Aired</span><b>${anime.aired}</b></div>` : ''}
            ${anime.status   ? `<div class="modal-info-row"><span>Status</span><b>${anime.status}</b></div>` : ''}
            ${anime.duration ? `<div class="modal-info-row"><span>Duration</span><b>${anime.duration}</b></div>` : ''}
            ${anime.studio   ? `<div class="modal-info-row"><span>Studio</span><b>${anime.studio}</b></div>` : ''}
            <div class="modal-info-row"><span>Type</span><b>${anime.type === 'movie' ? 'Movie' : 'TV Series'}</b></div>
          </div>

          <!-- Synopsis -->
          <div class="modal-synopsis-wrap">
            <p class="modal-synopsis" id="modalSynopsis">${synopsis}</p>
          </div>

          <!-- Your Rating -->
          <div class="modal-rating">
            <span>Your rating:</span>
            <div class="star-picker" id="starPicker">
              ${[1,2,3,4,5].map(i => `<i class="fas fa-star ${i <= userRating ? 'filled' : ''}" onclick="handleStarClick('${slug}', ${i})"></i>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Episodes -->
      ${anime.episodes.length > 1 ? `
      <div class="modal-episodes">
        <h4>Episodes <span class="ep-count">${anime.episodes.length} ep</span></h4>
        <div class="modal-ep-list">
          ${anime.episodes.map((ep, i) => `
            <div class="modal-ep-item ${i === resumeEp && histItem ? 'resume' : ''}" onclick="closeAnimeModal(); watchAnime('${slug}', ${i})">
              <span class="modal-ep-num">${i + 1}</span>
              <span class="modal-ep-name">${ep.name}</span>
              ${i === resumeEp && histItem ? '<span class="modal-ep-resume">▶ Resume</span>' : ''}
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => { modal.classList.add('show'); renderModalListBtn(slug); });
}

function closeAnimeModal() {
  const modal = document.getElementById('animeModal');
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300);
}

function handleStarClick(slug, stars) {
  rateAnime(slug, stars);
  document.querySelectorAll('#starPicker i').forEach((el, i) => {
    el.classList.toggle('filled', i < stars);
  });
  showToast(`Rated ${stars} ⭐`);
}

function handleModalFav(slug) {
  const added = toggleFavorite(slug);
  const btn = document.getElementById('modalFavBtn');
  const txt = document.getElementById('modalFavText');
  if (btn) btn.classList.toggle('active', added);
  if (txt) txt.textContent = added ? 'In My List' : 'My List';
}

// ── HOME PAGE ──
function renderHomePage() {
  const history = getWatchHistory();
  const cwSection  = document.getElementById('continueWatchingSection');
  const cwCarousel = document.getElementById('continueWatching');

  // Continue Watching — logged-in users with history only
  if (isLoggedIn() && history.length > 0) {
    cwSection.style.display = 'block';
    cwCarousel.innerHTML = '';
    const seen = new Set();
    history.slice(0, 12).forEach(item => {
      if (seen.has(item.slug)) return;
      seen.add(item.slug);
      const anime = animeData.find(a => a.slug === item.slug);
      if (anime) cwCarousel.appendChild(renderAnimeCard(anime, { continueEp: item }));
    });
  } else {
    if (cwSection) cwSection.style.display = 'none';
  }

  // New Episodes — all anime reversed (newest added first)
  const latestEl = document.getElementById('latestEpisodes');
  if (latestEl) {
    latestEl.innerHTML = '';
    [...animeData].reverse().forEach(a => latestEl.appendChild(renderAnimeCard(a)));
  }

  // Popular Series — series sorted by malScore desc
  const seriesEl = document.getElementById('popularSeries');
  if (seriesEl) {
    seriesEl.innerHTML = '';
    [...animeData]
      .filter(a => a.type === 'series')
      .sort((a, b) => (parseFloat(b.malScore) || 0) - (parseFloat(a.malScore) || 0))
      .forEach(a => seriesEl.appendChild(renderAnimeCard(a)));
  }

  // Top Movies — movies sorted by malScore desc
  const moviesEl = document.getElementById('topMovies');
  if (moviesEl) {
    moviesEl.innerHTML = '';
    [...animeData]
      .filter(a => a.type === 'movie')
      .sort((a, b) => (parseFloat(b.malScore) || 0) - (parseFloat(a.malScore) || 0))
      .forEach(a => moviesEl.appendChild(renderAnimeCard(a)));
  }

  renderRecommendationsRow();
  renderComingSoonSection();
}

// ── MOVIES ──
function renderMoviesPage(genreFilter = null) {
  const grid = document.getElementById('moviesGrid');
  grid.innerHTML = '';
  let movies = animeData.filter(a => a.type === 'movie');
  if (genreFilter) movies = movies.filter(a => a.genre.includes(genreFilter));
  if (movies.length === 0) { grid.innerHTML = renderEmptyState('No movies found'); return; }
  movies.forEach(a => grid.appendChild(renderAnimeCard(a, { showRating: true })));
  buildFilterChips('moviesFilter', 'movie', genreFilter, renderMoviesPage);
}

// ── SERIES ──
function renderSeriesPage(genreFilter = null) {
  const grid = document.getElementById('seriesGrid');
  grid.innerHTML = '';
  let series = animeData.filter(a => a.type === 'series');
  if (genreFilter) series = series.filter(a => a.genre.includes(genreFilter));
  if (series.length === 0) { grid.innerHTML = renderEmptyState('No series found'); return; }
  series.forEach(a => grid.appendChild(renderAnimeCard(a, { showRating: true })));
  buildFilterChips('seriesFilter', 'series', genreFilter, renderSeriesPage);
}

// ── HISTORY ──
function renderHistoryPage() {
  const grid = document.getElementById('historyGrid');
  grid.innerHTML = '';
  if (!isLoggedIn()) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-lock"></i><p>Sign in to view your history</p><span>Your watch history is saved to your account.</span><button class="btn-primary" style="width:auto" onclick="navigateToPage('login')"><i class="fas fa-sign-in-alt"></i> Sign In</button></div>`;
    return;
  }
  const history = getWatchHistory();
  if (history.length === 0) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-film"></i><p>No watch history yet.</p><span>Start watching to see your history here!</span><button class="btn-primary" style="width:auto" onclick="navigateToPage('home')">Browse Anime</button></div>`;
    return;
  }
  const seen = new Map();
  history.forEach(item => {
    if (!seen.has(item.slug)) {
      const anime = animeData.find(a => a.slug === item.slug);
      if (anime) seen.set(item.slug, { anime, item });
    }
  });
  seen.forEach(({ anime, item }) => grid.appendChild(renderAnimeCard(anime, { continueEp: item })));
}

function clearHistory() {
  watchHistory = [];
  saveHistory();
  renderHistoryPage();
  renderHomePage();
  showToast('Watch history cleared');
}

// ── MY LIST ──
function renderMyListPage() {
  const grid = document.getElementById('mylistGrid');
  grid.innerHTML = '';
  if (!isLoggedIn()) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-lock"></i><p>Sign in to view your list</p><span>Save anime to your personal list by clicking the heart icon.</span><button class="btn-primary" style="width:auto" onclick="navigateToPage('login')"><i class="fas fa-sign-in-alt"></i> Sign In</button></div>`;
    return;
  }
  const favs = getFavorites();
  if (favs.length === 0) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>Your list is empty.</p><span>Heart any anime to save it here.</span><button class="btn-primary" style="width:auto" onclick="navigateToPage('home')">Browse Anime</button></div>`;
    return;
  }
  favs.forEach(slug => {
    const anime = animeData.find(a => a.slug === slug);
    if (anime) grid.appendChild(renderAnimeCard(anime));
  });
}

// ── FILTER PAGE ──
let filterState = { type: 'all', status: 'all', genre: [], sort: 'default' };

function renderFilterPage() {
  // Already rendered by HTML, just init the genre tags and run filter
  applyFilter();
}

function setupFilterPage() {
  // Type buttons
  document.querySelectorAll('.fp-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fp-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.type = btn.dataset.value;
    });
  });

  // Status buttons
  document.querySelectorAll('.fp-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fp-status-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.status = btn.dataset.value;
    });
  });

  // Sort
  const sortSelect = document.getElementById('fpSort');
  if (sortSelect) sortSelect.addEventListener('change', () => { filterState.sort = sortSelect.value; });

  // Genre tags (dynamically built)
  const genreContainer = document.getElementById('fpGenres');
  if (genreContainer) {
    genreContainer.innerHTML = '';
    allGenres.forEach(genre => {
      const tag = document.createElement('button');
      tag.className = 'fp-genre-tag';
      tag.textContent = genre;
      tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        if (tag.classList.contains('active')) {
          if (!filterState.genre.includes(genre)) filterState.genre.push(genre);
        } else {
          filterState.genre = filterState.genre.filter(g => g !== genre);
        }
      });
      genreContainer.appendChild(tag);
    });
  }

  // Filter button
  const filterBtn = document.getElementById('applyFilterBtn');
  if (filterBtn) filterBtn.addEventListener('click', applyFilter);

  // Reset button
  const resetBtn = document.getElementById('resetFilterBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    filterState = { type: 'all', status: 'all', genre: [], sort: 'default' };
    document.querySelectorAll('.fp-type-btn, .fp-status-btn').forEach(b => b.classList.toggle('active', b.dataset.value === 'all'));
    document.querySelectorAll('.fp-genre-tag').forEach(t => t.classList.remove('active'));
    if (sortSelect) sortSelect.value = 'default';
    applyFilter();
  });
}

function applyFilter() {
  let results = [...animeData];

  if (filterState.type !== 'all') results = results.filter(a => a.type === filterState.type);
  if (filterState.status !== 'all') results = results.filter(a => a.status && a.status.toLowerCase() === filterState.status);
  if (filterState.genre.length > 0) results = results.filter(a => filterState.genre.every(g => a.genre.includes(g)));

  if (filterState.sort === 'az')    results.sort((a, b) => a.title.localeCompare(b.title));
  if (filterState.sort === 'za')    results.sort((a, b) => b.title.localeCompare(a.title));
  if (filterState.sort === 'score') results.sort((a, b) => (b.malScore || 0) - (a.malScore || 0));

  const grid  = document.getElementById('filterResultsGrid');
  const count = document.getElementById('filterResultCount');
  if (count) count.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
  if (!grid) return;
  grid.innerHTML = '';
  if (results.length === 0) { grid.innerHTML = renderEmptyState('No anime match your filters'); return; }
  results.forEach(a => grid.appendChild(renderAnimeCard(a)));
}

function renderEmptyState(msg) {
  return `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><p>${msg}</p><button class="btn-primary" style="width:auto" onclick="navigateToPage('home')">Go Home</button></div>`;
}

// ── FILTER CHIPS (series/movies pages) ──
function buildFilterChips(containerId, type, activeGenre, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const genres = [...new Set(animeData.filter(a => a.type === type).flatMap(a => a.genre))];
  const allChip = document.createElement('button');
  allChip.className = `filter-chip ${!activeGenre ? 'active' : ''}`;
  allChip.textContent = 'All';
  allChip.onclick = () => callback(null);
  container.appendChild(allChip);
  genres.forEach(genre => {
    const chip = document.createElement('button');
    chip.className = `filter-chip ${activeGenre === genre ? 'active' : ''}`;
    chip.textContent = genre;
    chip.onclick = () => callback(genre);
    container.appendChild(chip);
  });
}

function filterByGenre(genre) {
  navigateToPage('filter');
  if (!genre) return;
  setTimeout(() => {
    if (typeof filterState !== 'undefined') {
      filterState.type   = 'all';
      filterState.status = 'all';
      filterState.genre  = [genre];
      filterState.sort   = 'default';
    }
    document.querySelectorAll('.fp-genre-tag').forEach(t => {
      t.classList.toggle('active', t.textContent.trim() === genre);
    });
    document.querySelectorAll('.genre-tag-item').forEach(t => {
      t.classList.toggle('active', t.textContent.trim() === genre);
    });
    if (typeof applyFilter === 'function') applyFilter();
  }, 80);
}

// ── MORE LIKE THIS ──
function renderMoreLikeThis(anime) {
  const section = document.getElementById('moreLikeThisSection');
  const grid    = document.getElementById('moreLikeThisGrid');
  if (!section || !grid) return;
  // Score-weighted similar: prefer same genre + same type
  const similar = animeData
    .filter(a => a.slug !== anime.slug)
    .map(a => ({ anime: a, score: a.genre.filter(g => anime.genre.includes(g)).length + (a.type === anime.type ? 1 : 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.anime);
  if (similar.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  grid.innerHTML = '';
  similar.slice(0, 12).forEach(a => grid.appendChild(renderAnimeCard(a)));
}

// ── SEARCH ──
function setupSearch() {
  const input   = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input) return;

  input.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('show'); return; }
    const filtered = animeData.filter(a => a.title.toLowerCase().includes(q) || a.genre.some(g => g.toLowerCase().includes(q)));
    results.innerHTML = '';
    if (filtered.length === 0) {
      results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><div class="search-result-title">No results found</div></div></div>';
    } else {
      filtered.slice(0, 6).forEach(anime => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `<img class="search-result-img" src="${anime.cover}" alt="${anime.title}" loading="lazy">
          <div class="search-result-info">
            <div class="search-result-title">${anime.title}</div>
            <div class="search-result-meta">${anime.type === 'movie' ? '🎬 Movie' : '📺 Series'} · ${anime.malScore ? `⭐ ${anime.malScore}` : ''} · ${anime.genre.slice(0,2).join(', ')}</div>
          </div>`;
        item.addEventListener('click', () => { results.classList.remove('show'); input.value = ''; openAnimeModal(anime.slug); });
        results.appendChild(item);
      });
    }
    results.classList.add('show');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search-bar')) results.classList.remove('show'); });
}

// ── RANDOM ──
function watchRandomAnime() {
  const available = animeData.filter(a => a.episodes && a.episodes.length > 0);
  const anime = available[Math.floor(Math.random() * available.length)];
  showToast(`🎲 Random: ${anime.title}`);
  setTimeout(() => openAnimeModal(anime.slug), 300);
}

// ── THEME (3-way: dark → light → amoled) ──
const THEMES = ['dark','light','amoled'];
const THEME_ICONS  = {dark:'fa-moon', light:'fa-sun', amoled:'fa-circle'};
const THEME_META   = {dark:'#0a0a0f', light:'#f4f4f8', amoled:'#000000'};
const THEME_LABELS = {dark:'🌙 Dark', light:'☀️ Light', amoled:'⚫ AMOLED'};

function setupThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const meta = document.getElementById('metaThemeColor');
  const saved = localStorage.getItem('aw-theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  icon.className = `fas ${THEME_ICONS[saved]}`;
  if (meta) meta.content = THEME_META[saved];
  btn.addEventListener('click', () => {
    const cur  = document.documentElement.dataset.theme || 'dark';
    const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    document.documentElement.dataset.theme = next;
    icon.className = `fas ${THEME_ICONS[next]}`;
    if (meta) meta.content = THEME_META[next];
    localStorage.setItem('aw-theme', next);
    showToast(THEME_LABELS[next] + ' mode');
  });
}

// ── KEYBOARD SHORTCUTS ──
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const onWatch = document.getElementById('page-watch')?.style.display !== 'none';
    if (e.key === 'n' || e.key === 'N') { if (onWatch) navigateEpisode(1); }
    if (e.key === 'p' || e.key === 'P') { if (onWatch) navigateEpisode(-1); }
    if (e.key === 'r' || e.key === 'R') { watchRandomAnime(); }
    if (e.key === 'Escape')             { closeAnimeModal(); }
    if (e.key === 'h' || e.key === 'H') { navigateToPage('home'); }
    if (e.key === 'f' || e.key === 'F') { navigateToPage('filter'); }
  });
}

// ── ANNOUNCEMENT ──
function setupAnnouncement() {
  const banner = document.getElementById('announcementBanner');
  if (!banner) return;
  const id        = banner.dataset.id || '1';
  const dismissed = localStorage.getItem('aw_announcement_dismissed');
  if (dismissed === id) { banner.style.display = 'none'; return; }
  banner.style.display = 'flex';
  document.getElementById('announcementClose')?.addEventListener('click', () => {
    banner.style.animation = 'bannerOut 0.3s ease forwards';
    setTimeout(() => banner.style.display = 'none', 300);
    localStorage.setItem('aw_announcement_dismissed', id);
  });
}

// ── MOBILE NAV ──
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('mainNav');
  const overlay   = document.getElementById('mobileNavOverlay');
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
  });
  overlay.addEventListener('click', closeMobileNav);
}
function closeMobileNav() {
  document.getElementById('mainNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileNavOverlay').classList.remove('show');
}

// ── HEADER SCROLL ──
function setupHeaderScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── NAV LINKS ──
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); navigateToPage(link.dataset.page); });
  });
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) navigateToPage(hash);
  });
}

// ── BELL / NOTIFICATIONS ──
function toggleBellDropdown() {
  const dd = document.getElementById('bellDropdown');
  if (!dd) return;
  const open = dd.classList.toggle('show');
  if (open) renderBellDropdown();
  document.addEventListener('click', closeBellOnOutside, {once:true});
}
function closeBellOnOutside(e) {
  const bell = document.getElementById('bellSection');
  if (bell && !bell.contains(e.target)) document.getElementById('bellDropdown')?.classList.remove('show');
}
function renderBellDropdown() {
  const list = document.getElementById('bellList');
  if (!list) return;
  const notifs = getNotifications();
  if (notifs.length === 0) { list.innerHTML = '<div class="bell-empty"><i class="fas fa-bell-slash"></i><p>No notifications</p></div>'; return; }
  list.innerHTML = notifs.map((n,i) => `
    <div class="bell-item ${n.read?'':'unread'}" onclick="markRead('${n.id}');${n.slug?`navigateToPage('home');openAnimeModal('${n.slug}')`:''};renderBellDropdown()">
      <div class="bell-item-icon ${n.type==='new_ep'?'ep':'sys'}">
        <i class="fas ${n.type==='new_ep'?'fa-play-circle':'fa-info-circle'}"></i>
      </div>
      <div class="bell-item-body">
        <div class="bell-item-title">${n.title}</div>
        <div class="bell-item-msg">${n.msg}</div>
        <div class="bell-item-time">${formatCommentDate(n.time)}</div>
      </div>
      ${!n.read ? '<div class="bell-dot"></div>' : ''}
    </div>`).join('');
}

// ── PROFILE PAGE ──
let activeProfileTab = 'watching';


// ── Profile Banner ───────────────────────────────────────────────
const BANNER_PRESETS = [
  "https://static.anikai.to/6d/i/b/79/67664a45311fc.jpg",
  "https://wallpapers.com/images/hd/death-note-light-and-l-ku9cllf5yx39b2zg.jpg",
  "https://wallpapers.com/images/hd/your-name-movie-landscape-35zy7o3bwnq7nlpd.jpg",
  "https://images.alphacoders.com/134/1349836.jpg",
  "https://images.alphacoders.com/130/1300387.jpg",
  "https://images.alphacoders.com/130/1307218.jpg",
];
function getProfileBanner() {
  try { return localStorage.getItem('aw_profile_banner') || ''; } catch(e){ return ''; }
}
function setProfileBanner(url) {
  try { localStorage.setItem('aw_profile_banner', url); } catch(e){}
}
function openBannerModal() {
  if (document.getElementById('pfBannerModal')) return;
  const cur = getProfileBanner();
  const modal = document.createElement('div');
  modal.className = 'pf-banner-modal';
  modal.id = 'pfBannerModal';
  modal.innerHTML =
    '<div class="pf-banner-modal-box">' +
      '<div class="pf-banner-modal-title"><i class="fas fa-image"></i> Change Profile Banner</div>' +
      '<img class="pf-banner-modal-preview" id="bannerPreviewImg" src="' + (cur || BANNER_PRESETS[0]) + '" onerror="this.style.opacity=0.3" />' +
      '<div class="form-group">' +
        '<label><i class="fas fa-link"></i> Image URL</label>' +
        '<input type="url" id="bannerUrlInput" placeholder="https://your-image-url.jpg" value="' + cur + '" style="width:100%;box-sizing:border-box" />' +
      '</div>' +
      '<div style="font-size:0.78rem;color:var(--text3)">Or pick a preset:</div>' +
      '<div class="pf-banner-modal-presets">' +
        BANNER_PRESETS.map((url,i) =>
          '<img class="pf-banner-preset' + (cur === url ? ' active' : '') + '" src="' + url + '" data-url="' + url + '" />'
        ).join('') +
      '</div>' +
      '<div class="pf-banner-modal-actions">' +
        '<button class="btn-primary" style="flex:1" onclick="saveBannerFromModal()"><i class="fas fa-check"></i> Apply</button>' +
        '<button class="btn-outline" style="flex:1" onclick="closeBannerModal()">Cancel</button>' +
        '<button class="btn-outline" style="color:var(--accent)" onclick="clearBannerAndClose()"><i class="fas fa-trash"></i></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  // Preview on type
  const inp = document.getElementById('bannerUrlInput');
  const prev= document.getElementById('bannerPreviewImg');
  inp.addEventListener('input', () => { prev.src = inp.value; prev.style.opacity = 1; });
  // Presets
  modal.querySelectorAll('.pf-banner-preset').forEach(img => {
    img.addEventListener('click', () => {
      modal.querySelectorAll('.pf-banner-preset').forEach(x => x.classList.remove('active'));
      img.classList.add('active');
      inp.value = img.dataset.url;
      prev.src  = img.dataset.url;
      prev.style.opacity = 1;
    });
  });
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}
function closeBannerModal() {
  const m = document.getElementById('pfBannerModal'); if(m) m.remove();
}
function clearBannerAndClose() {
  setProfileBanner(''); closeBannerModal(); renderProfilePage();
}
function saveBannerFromModal() {
  const url = (document.getElementById('bannerUrlInput') || {}).value || '';
  setProfileBanner(url.trim());
  const modal = document.getElementById('pfBannerModal');
  if (modal) modal.remove();
  renderProfilePage();
}
function renderProfilePage() {
  const container = document.getElementById('profilePageContent');
  if (!container) return;
  if (!isLoggedIn()) { navigateToPage('login'); return; }

  const stats         = getProfileStats();
  const av            = getUserAvatar();
  const lv            = getUserLevel(stats.totalEps);
  const nextLv        = LEVELS[LEVELS.indexOf(lv) + 1];
  const lvPct         = getLevelProgress(stats.totalEps);
  const unlocked      = getUnlockedAchievements();
  const avatarImg     = av?.img;
  const avatarBg      = av?.bg || 'var(--accent)';
  const watchMins     = stats.totalEps * 23;
  const watchHrs      = Math.floor(watchMins / 60);
  const bio           = typeof getUserBio === 'function' ? getUserBio() : '';
  const pinned        = typeof getPinnedAnime === 'function' ? getPinnedAnime() : [];
  const completionPct = typeof getProfileCompletion === 'function' ? getProfileCompletion() : 0;
  const history       = typeof getWatchHistory === 'function' ? getWatchHistory() : [];
  const backdropSlug  = pinned[0] || (history[0] && history[0].slug);
  const backdropAnime = backdropSlug ? animeData.find(a => a.slug === backdropSlug) : null;
  const backdropImg   = backdropAnime?.cover || '';

  // Genre breakdown from history
  const genreCount = {};
  history.forEach(h => {
    const a = animeData.find(x => x.slug === h.slug);
    if (a) a.genre.forEach(g => genreCount[g] = (genreCount[g] || 0) + 1);
  });
  const topGenres = Object.entries(genreCount).sort((a,b) => b[1]-a[1]).slice(0,6);
  const genreMax  = topGenres[0]?.[1] || 1;
  const GENRE_COLORS = ['var(--accent)','var(--teal)','var(--gold)','#a78bfa','#34d399','#f472b6'];

  const savedBanner = getProfileBanner();
  const heroBg = savedBanner || backdropImg || '';

  container.innerHTML = `<div class="pf-wrap">

    <!-- ══ HERO ══ -->
    <div class="pf-hero">
      ${heroBg ? `<div class="pf-hero-bg" style="background-image:url('${heroBg}')"></div>` : ''}
      <div class="pf-hero-veil"></div>
      <button class="pf-banner-btn" onclick="openBannerModal()">
        <i class="fas fa-image"></i> Change Banner
      </button>
      <div class="pf-hero-body">

        <!-- Avatar -->
        <div class="pf-av-wrap" onclick="openAvatarPicker()" title="Change avatar">
          <div class="pf-av-ring" style="--lvc:${lv.color}">
            ${avatarImg
              ? `<img src="${avatarImg}" alt="${av.label}" class="pf-av-img"
                   onerror="this.src='${av?.fallback||avatarImg}';this.onerror=function(){this.style.display='none';this.nextSibling.style.display='flex'}" />
                 <div class="pf-av-init" style="background:${avatarBg}">${currentUser.username.charAt(0).toUpperCase()}</div>`
              : `<div class="pf-av-init" style="background:${avatarBg}">${currentUser.username.charAt(0).toUpperCase()}</div>`}
          </div>
          <div class="pf-av-cam"><i class="fas fa-camera"></i></div>
        </div>

        <!-- Info -->
        <div class="pf-hero-info">
          <div class="pf-hero-top">
            <h2 class="pf-uname">${currentUser.username}</h2>
            <span class="pf-rank-badge" style="background:${lv.color}"><i class="fas fa-crown"></i> ${lv.label}</span>
            <button class="pf-share-btn" onclick="generateStatsCard()"><i class="fas fa-share-alt"></i> Share</button>
          </div>

          <div class="pf-bio-wrap">
            <div id="profBioText" class="pf-bio-text" onclick="editBio()">
              ${bio ? bio : '<span class="pf-bio-hint"><i class="fas fa-pencil-alt"></i> Add a bio...</span>'}
            </div>
            <textarea id="profBioInput" class="pf-bio-input" maxlength="80"
              placeholder="Write a short bio (max 80 chars)..."
              onblur="saveBioEdit()" onkeydown="if(event.key==='Enter')this.blur()">${bio}</textarea>
          </div>

          <div class="pf-email"><i class="fas fa-envelope"></i> ${currentUser.email}</div>

          <div class="pf-xp-block">
            <div class="pf-xp-meta">
              <span style="color:${lv.color};font-weight:700;font-size:0.78rem">${lv.label}</span>
              ${nextLv
                ? `<span class="pf-xp-next">${stats.totalEps} / ${nextLv.min} eps → <b style="color:${nextLv.color}">${nextLv.label}</b></span>`
                : `<span class="pf-xp-max">🏆 MAX LEVEL</span>`}
            </div>
            <div class="pf-xp-track">
              <div class="pf-xp-fill" style="width:${lvPct}%;background:${lv.color}"></div>
            </div>
          </div>

          <div class="pf-chips">
            <span class="pf-chip"><i class="fas fa-fire" style="color:var(--accent)"></i> ${stats.streak}-day streak</span>
            <span class="pf-chip"><i class="fas fa-clock" style="color:var(--teal)"></i> ~${watchHrs > 0 ? watchHrs + 'h' : watchMins + 'min'} watched</span>
            <span class="pf-chip"><i class="fas fa-star" style="color:var(--gold)"></i> ${stats.topGenre || 'No fav genre yet'}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ STATS STRIP ══ -->
    <div class="pf-stats-strip">
      ${[
        {n:stats.totalEps,      l:'Episodes',  ic:'fa-play-circle',  c:'var(--accent)'},
        {n:stats.uniqueAnime,   l:'Series',    ic:'fa-tv',           c:'var(--teal)'},
        {n:stats.completedList, l:'Completed', ic:'fa-check-circle', c:'#22c55e'},
        {n:stats.avgRating==='—'?'—':stats.avgRating+'★', l:'Avg Score', ic:'fa-star', c:'var(--gold)'},
        {n:stats.favCount,      l:'My List',   ic:'fa-heart',        c:'var(--accent)'},
      ].map((s,i,a) => `<div class="pf-stat${i<a.length-1?' sep':''}">
        <i class="fas ${s.ic}" style="color:${s.c}"></i>
        <div class="pf-stat-n">${s.n}</div>
        <div class="pf-stat-l">${s.l}</div>
      </div>`).join('')}
    </div>

    ${completionPct < 100 ? `
    <div class="pf-compl-strip">
      <i class="fas fa-tasks" style="color:var(--accent)"></i>
      <span>Profile <b>${completionPct}%</b> complete</span>
      <div class="pf-compl-track"><div class="pf-compl-fill" style="width:${completionPct}%"></div></div>
      <span class="pf-compl-tip">Complete your profile to unlock achievements</span>
    </div>` : ''}

    <!-- ══ 3-COLUMN GRID ══ -->
    <div class="pf-grid">

      <!-- COL 1: Pinned + Weekly -->
      <div class="pf-col">

        <div class="pf-card">
          <div class="pf-card-hdr"><i class="fas fa-thumbtack" style="color:var(--accent)"></i> PINNED ANIME</div>
          <div class="pf-pinned">
            ${[0,1,2].map(i => {
              const slug  = pinned[i];
              const anime = slug ? animeData.find(a => a.slug === slug) : null;
              return anime
                ? `<div class="pf-pin" onclick="openAnimeModal('${anime.slug}')">
                    <img src="${anime.cover}" alt="${anime.title}" />
                    <div class="pf-pin-grad"></div>
                    <div class="pf-pin-lbl">${anime.title}</div>
                    <button class="pf-pin-rm" onclick="event.stopPropagation();togglePinAnime('${anime.slug}');renderProfilePage()"><i class="fas fa-times"></i></button>
                   </div>`
                : `<div class="pf-pin pf-pin-empty" onclick="showPinPicker(${i})">
                    <i class="fas fa-plus"></i><span>Pin</span>
                   </div>`;
            }).join('')}
          </div>
        </div>

        <div class="pf-card">
          <div class="pf-card-hdr"><i class="fas fa-calendar-week" style="color:var(--teal)"></i> THIS WEEK</div>
          <div class="prof-calendar pf-calendar-wrap">${renderWeeklyCalendar()}</div>
        </div>

      </div><!-- /col1 -->

      <!-- COL 2: Genre + Watch Time -->
      <div class="pf-col">

        <div class="pf-card">
          <div class="pf-card-hdr"><i class="fas fa-chart-bar" style="color:var(--teal)"></i> TOP GENRES</div>
          <div class="pf-genres">
            ${topGenres.length === 0
              ? `<div class="pf-empty-state"><i class="fas fa-tv"></i><p>Watch anime to see your genre breakdown</p></div>`
              : topGenres.map(([g,c],i) => `
                <div class="pf-genre-row">
                  <span class="pf-genre-name">${g}</span>
                  <div class="pf-genre-track">
                    <div class="pf-genre-fill" style="width:${Math.round(c/genreMax*100)}%;background:${GENRE_COLORS[i%GENRE_COLORS.length]}"></div>
                  </div>
                  <span class="pf-genre-val">${c}</span>
                </div>`).join('')}
          </div>
        </div>

        <div class="pf-card pf-wt-card" style="--lvc:${lv.color}">
          <div class="pf-card-hdr"><i class="fas fa-clock" style="color:var(--teal)"></i> WATCH TIME</div>
          <div class="pf-wt-body">
            <div class="pf-wt-num">${watchHrs > 0 ? watchHrs : watchMins}<span>${watchHrs > 0 ? 'hrs' : 'min'}</span></div>
            <div class="pf-wt-detail">${stats.totalEps} episodes · ${stats.uniqueAnime} series</div>
            <div class="pf-wt-fun">${watchHrs >= 24
              ? `≈ ${Math.round(watchHrs/24)} days non-stop`
              : watchHrs >= 2 ? `≈ ${Math.round(watchHrs/2)} movies`
              : 'Keep watching!'}</div>
          </div>
        </div>

      </div><!-- /col2 -->

      <!-- COL 3: Achievements -->
      <div class="pf-col">
        <div class="pf-card pf-ach-card">
          <div class="pf-card-hdr">
            <i class="fas fa-trophy" style="color:var(--gold)"></i> ACHIEVEMENTS
            <span class="pf-card-badge">${unlocked.length}/${ACHIEVEMENTS.length}</span>
          </div>
          <div class="prof-achievements pf-ach-grid">
            ${ACHIEVEMENTS.map(a => {
              const earned   = unlocked.includes(a.id);
              const isHidden = a.hidden && !earned;
              return `<div class="prof-achievement ${earned ? 'earned' : ''}"
                title="${earned ? '✅ Unlocked!' : (isHidden ? '🔒 ???' : '🔒 ' + a.desc)}">
                <div class="prof-ach-icon">${isHidden ? '❓' : a.icon}</div>
                <div class="prof-ach-name">${isHidden ? '???' : a.label}</div>
                <div class="prof-ach-desc">${isHidden ? 'Keep playing' : a.desc}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div><!-- /col3 -->

    </div><!-- /.pf-grid -->

    <!-- ══ ANIME LISTS — FULL WIDTH OWN SECTION ══ -->
    <div class="pf-lists-section">
      <div class="pf-lists-hdr">
        <div class="pf-lists-title">
          <i class="fas fa-list-ul" style="color:var(--accent)"></i>
          <span>MY ANIME LISTS</span>
        </div>
        <div class="pf-lists-tabs">
          ${Object.entries(LIST_NAMES).map(([key, name]) => `
            <button class="pf-list-tab ${activeProfileTab === key ? 'active' : ''}"
              onclick="switchProfileTab('${key}')" data-tab="${key}"
              style="${activeProfileTab === key ? `--tc:${LIST_COLORS[key]}` : ''}">
              <i class="fas ${LIST_ICONS[key]}"></i>
              <span>${name}</span>
              <span class="pf-tab-count">${(animeLists[key] || []).length}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="pf-lists-body" id="profileListContent"></div>
    </div>

  </div>`;
  renderProfileListTab(activeProfileTab);
}


function editBio() {
  const txt = document.getElementById('profBioText');
  const inp = document.getElementById('profBioInput');
  if (!txt || !inp) return;
  txt.style.display = 'none';
  inp.style.display = 'block';
  inp.focus(); inp.select();
}
function saveBioEdit() {
  const txt = document.getElementById('profBioText');
  const inp = document.getElementById('profBioInput');
  if (!txt || !inp) return;
  if (typeof setUserBio === 'function') setUserBio(inp.value.trim());
  inp.style.display = 'none';
  txt.style.display = 'block';
  txt.innerHTML = inp.value.trim() || '<span style="opacity:0.4"><i class="fas fa-pencil-alt"></i> Add a bio...</span>';
  showToast('Bio saved ✅');
}
function showPinPicker(slot) {
  const pinned = getPinnedAnime();
  const available = animeData.filter(a => !pinned.includes(a.slug));
  if (available.length === 0) { showToast('No more anime to pin', 'error'); return; }

  const modal = document.createElement('div');
  modal.id = 'pinPickerModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem';
  modal.innerHTML = `
    <div class="pin-picker-card">
      <div class="pin-picker-hdr">
        <h3>Pin Anime</h3>
        <button onclick="document.getElementById('pinPickerModal').remove()" class="pin-picker-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="pin-picker-search-wrap">
        <i class="fas fa-search pin-picker-search-icon"></i>
        <input type="text" id="pinPickerSearch" class="pin-picker-search" placeholder="Search anime to pin..." autocomplete="off" />
      </div>
      <div class="pin-picker-list" id="pinPickerList"></div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);

  function renderPinList(filter) {
    const list = document.getElementById('pinPickerList');
    if (!list) return;
    const q = (filter || '').toLowerCase();
    const filtered = available.filter(a => !q || a.title.toLowerCase().includes(q));
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--text3);font-size:0.85rem"><i class="fas fa-search" style="display:block;font-size:1.5rem;margin-bottom:0.5rem;opacity:0.4"></i>No results</div>';
      return;
    }
    list.innerHTML = filtered.map(a => `
      <div class="pin-picker-item" onclick="togglePinAnime('${a.slug}');document.getElementById('pinPickerModal').remove();renderProfilePage()">
        <img src="${a.cover}" alt="${a.title}" class="pin-picker-thumb" onerror="this.style.display='none'" />
        <div class="pin-picker-meta">
          <div class="pin-picker-title">${a.title}</div>
          <div class="pin-picker-sub">${a.type === 'movie' ? '🎬 Movie' : '📺 Series'} · ${a.episodes.length} ep · ${a.genre.slice(0,2).join(', ')}</div>
        </div>
        <i class="fas fa-thumbtack pin-picker-pin-icon"></i>
      </div>`).join('');
  }

  renderPinList('');

  const searchInput = document.getElementById('pinPickerSearch');
  if (searchInput) {
    searchInput.focus();
    searchInput.addEventListener('input', () => renderPinList(searchInput.value));
  }
}


function switchProfileTab(tab) {
  activeProfileTab = tab;
  document.querySelectorAll('.pf-list-tab').forEach(b => {
    const isActive = b.dataset.tab === tab;
    b.classList.toggle('active', isActive);
    b.style.setProperty('--tc', isActive ? LIST_COLORS[tab] : 'transparent');
  });
  renderProfileListTab(tab);
}

function renderProfileListTab(tab) {
  const container = document.getElementById('profileListContent');
  if (!container) return;
  const list = getAnimeList(tab);
  if (list.length === 0) {
    container.innerHTML = `<div class="prof-list-empty"><i class="fas ${LIST_ICONS[tab]}"></i><p>No anime in ${LIST_NAMES[tab]} yet</p><button class="btn-primary" style="width:auto;padding:0.6rem 1.5rem" onclick="navigateToPage('home')">Browse Anime</button></div>`;
    return;
  }
  container.innerHTML = `<div class="prof-list-grid">${list.map(entry => {
    const anime = animeData.find(a => a.slug === entry.slug);
    if (!anime) return '';
    const ur = getUserRating(anime.slug);
    return `<div class="prof-list-card" onclick="openAnimeModal('${anime.slug}')">
      <img src="${anime.cover}" alt="${anime.title}" class="prof-list-cover" />
      <div class="prof-list-info">
        <div class="prof-list-title">${anime.title}</div>
        <div class="prof-list-meta">
          <span class="prof-list-type ${anime.type==='movie'?'movie':''}">${anime.type==='movie'?'Movie':'Series'}</span>
          ${ur ? `<span class="prof-list-score">★ ${ur}/5</span>` : ''}
        </div>
        <div class="prof-list-actions" onclick="event.stopPropagation()">
          <select class="prof-list-select" onchange="setAnimeListStatus('${anime.slug}',this.value);renderProfilePage()">
            <option value="">Remove</option>
            ${Object.entries(LIST_NAMES).map(([k,n])=>`<option value="${k}" ${k===tab?'selected':''}>${n}</option>`).join('')}
          </select>
          ${anime.episodes.length>0?`<button class="prof-list-play" onclick="watchAnime('${anime.slug}',0)"><i class="fas fa-play"></i></button>`:''}
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

// ── AVATAR PICKER ──
function openAvatarPicker() {
  if (!isLoggedIn()) { showToast('Login to change avatar', 'error'); return; }
  const modal = document.getElementById('avatarPickerModal');
  if (!modal) return;
  const grid = document.getElementById('avatarGrid');
  grid.innerHTML = AVATARS.map(av => {
    const fb = av.fallback || av.img;
    return `
    <div class="avatar-option ${userAvatar===av.id?'selected':''}" onclick="setUserAvatar('${av.id}');closeAvatarPicker();renderProfilePage()" title="${av.label}">
      <div class="avatar-opt-img-wrap" style="border-color:${userAvatar===av.id?av.bg:'transparent'};background:${av.bg}">
        <img src="${av.img}" alt="${av.label}" class="avatar-opt-img" onerror="if(this.src!=='${fb}')this.src='${fb}'" />
        ${userAvatar===av.id ? '<div class="avatar-opt-check"><i class="fas fa-check"></i></div>' : ''}
      </div>
      <small class="avatar-opt-label">${av.label}</small>
    </div>`;
  }).join('');
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('show'));
}
function closeAvatarPicker() {
  const modal = document.getElementById('avatarPickerModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

// ── WEEKLY CALENDAR ──
function renderWeeklyCalendar() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const history = getWatchHistory();
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i*86400000);
    const ds = d.toDateString();
    const count = history.filter(h => new Date(h.timestamp).toDateString() === ds).length;
    const intensity = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : 3;
    result.push(`
      <div class="cal-day">
        <div class="cal-bubble intensity-${intensity}" title="${count} episodes on ${days[d.getDay()]}">
          ${count > 0 ? count : ''}
        </div>
        <div class="cal-label">${days[d.getDay()]}</div>
      </div>`);
  }
  return result.join('');
}

// ── INTRO SKIP ──
function promptSetIntro() {
  if (!currentAnime) { showToast('No anime loaded', 'error'); return; }
  const input = prompt(`Set intro skip point for:
"${currentAnime.episodes[currentEpisodeIndex].name}"

Enter seconds (e.g. 90 for 1:30):`, '90');
  if (input === null) return;
  const secs = parseInt(input);
  if (isNaN(secs) || secs < 0) { showToast('Invalid time', 'error'); return; }
  setIntroSkip(currentAnime.slug, currentEpisodeIndex, secs);
  const skipBtn = document.getElementById('skipIntroBtn');
  if (skipBtn) skipBtn.style.display = 'flex';
}
function triggerSkipIntro() {
  if (!currentAnime) return;
  const secs = getIntroSkip(currentAnime.slug, currentEpisodeIndex);
  if (!secs) return;
  // For GDrive/YouTube iframes we can't control time directly, so show message
  showToast(`⏩ Skip to ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')} — seek manually in player`);
}
function checkIntroSkipBtn() {
  if (!currentAnime) return;
  const secs = getIntroSkip(currentAnime.slug, currentEpisodeIndex);
  const btn = document.getElementById('skipIntroBtn');
  if (btn) btn.style.display = secs ? 'flex' : 'none';
}

// ── COMING SOON SECTION ──
function renderComingSoonSection() {
  const section = document.getElementById('comingSoonSection');
  const carousel = document.getElementById('comingSoonCarousel');
  if (!section || !carousel) return;
  const comingSoon = animeData.filter(a => !a.episodes || a.episodes.length === 0);
  if (comingSoon.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  carousel.innerHTML = '';
  comingSoon.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'coming-soon-card';
    card.innerHTML = `
      <img src="${anime.cover}" alt="${anime.title}" />
      <div class="coming-soon-overlay">
        <div class="coming-soon-badge"><i class="fas fa-clock"></i> Coming Soon</div>
        <div class="coming-soon-title">${anime.title}</div>
        <div class="coming-soon-genres">${anime.genre.slice(0,2).join(' · ')}</div>
      </div>`;
    card.addEventListener('click', () => openAnimeModal(anime.slug));
    carousel.appendChild(card);
  });
}

// ── RECOMMENDATIONS ROW ──
function renderRecommendationsRow() {
  const section = document.getElementById('recommendationsSection');
  const carousel = document.getElementById('recommendationsCarousel');
  const label    = document.getElementById('recommendationsLabel');
  if (!section || !carousel) return;
  if (!isLoggedIn() || watchHistory.length === 0) { section.style.display = 'none'; return; }
  const genreCounts = {};
  watchHistory.forEach(h => {
    const a = animeData.find(x => x.slug === h.slug);
    if (a) a.genre.forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; });
  });
  const topGenre = Object.entries(genreCounts).sort((a,b) => b[1]-a[1])[0]?.[0];
  const watchedSlugs = new Set(watchHistory.map(h => h.slug));
  const recs = animeData.filter(a => !watchedSlugs.has(a.slug) && a.genre.includes(topGenre) && a.episodes.length > 0);
  if (recs.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  if (label) label.textContent = `Because you like ${topGenre}`;
  carousel.innerHTML = '';
  recs.slice(0, 8).forEach(a => carousel.appendChild(renderAnimeCard(a)));
}

// ── FOCUS MODE (replaces broken Theatre mode) ──
let focusMode     = false;
let theatreMode   = false;
let wcFullscreen  = false;
let wcSidebarHidden = false; // sidebar visible by default

function toggleFocusMode() { toggleTheatreMode(); } // legacy alias

function toggleTheatreMode() {
  theatreMode = !theatreMode;
  document.body.classList.toggle('theatre-mode', theatreMode);
  const btn = document.getElementById('theatreBtn');
  if (btn) btn.innerHTML = theatreMode
    ? '<i class="fas fa-compress-alt"></i>'
    : '<i class="fas fa-expand-alt"></i>';
  showToast(theatreMode ? '🎬 Theatre Mode ON' : 'Theatre Mode OFF');
}

function toggleFullscreen() {
  wcFullscreen = !wcFullscreen;
  document.body.classList.toggle('wc-fullscreen', wcFullscreen);
  const btn = document.getElementById('fullscreenBtn');
  if (btn) btn.innerHTML = wcFullscreen
    ? '<i class="fas fa-compress"></i>'
    : '<i class="fas fa-expand"></i>';
  showToast(wcFullscreen ? '⛶ Fullscreen — click again or press Esc to exit' : 'Fullscreen OFF');
}

function toggleWatchSidebar() {
  wcSidebarHidden = !wcSidebarHidden;
  const shell     = document.getElementById('wcShell');
  const sidebar   = document.getElementById('wcSidebar');
  const toggleBtn = document.getElementById('wcSidebarToggleBtn');
  const arrow     = document.getElementById('wcSidebarArrow');

  if (shell)   shell.classList.toggle('sidebar-hidden', wcSidebarHidden);

  // On mobile: toggle a class on the sidebar itself instead
  const isMobile = window.innerWidth <= 860;
  if (isMobile && sidebar) {
    sidebar.classList.toggle('sidebar-open-mobile', !wcSidebarHidden);
  }

  if (toggleBtn) toggleBtn.classList.toggle('sidebar-open', !wcSidebarHidden);
  if (arrow) arrow.style.transform = wcSidebarHidden ? '' : 'rotate(180deg)';
}

function switchWatchTab(tab) {
  ['eps','seasons'].forEach(t => {
    const btn   = document.getElementById('stab-' + t);
    const panel = document.getElementById('stab-panel-' + t);
    if (btn)   btn.classList.toggle('active', t === tab);
    if (panel) panel.style.display = (t === tab) ? '' : 'none';
  });
  if (tab === 'seasons') renderSeasonsSidebarPanel();
}

function renderSeasonsSidebarPanel() {
  const container = document.getElementById('watchSeasonsList');
  if (!container || typeof currentAnime === 'undefined' || !currentAnime) return;
  container.innerHTML = '';

  // ── seriesGroup system: find all sibling seasons ──
  const group = currentAnime.seriesGroup;
  let siblings = [];
  if (group) {
    siblings = animeData
      .filter(a => a.seriesGroup === group)
      .sort((a, b) => (a.seasonNumber || 1) - (b.seasonNumber || 1));
  }

  // Fallback: old internal seasons[] array on the same entry
  if (siblings.length <= 1 && currentAnime.seasons && currentAnime.seasons.length > 1) {
    container.innerHTML = '';
    currentAnime.seasons.forEach((season, si) => {
      const isActive = currentSeasonIndex === si;
      const div = document.createElement('div');
      div.className = 'season-sidebar-item' + (isActive ? ' active' : '');
      div.innerHTML =
        '<div class="season-sidebar-name"><i class="fas fa-layer-group"></i> ' + season.name + '</div>' +
        '<span class="season-sidebar-eps">' + season.episodes.length + ' eps</span>';
      div.addEventListener('click', () => {
        switchWatchTab('eps');
      });
      container.appendChild(div);
    });
    return;
  }

  // No group and no internal seasons
  if (siblings.length <= 1) {
    container.innerHTML =
      '<div style="padding:2rem;text-align:center;color:var(--text3);font-size:0.85rem">' +
        '<i class="fas fa-layer-group" style="font-size:2.5rem;margin-bottom:0.75rem;display:block;opacity:0.3"></i>' +
        '<div style="font-weight:600;margin-bottom:4px;color:var(--text2)">Single Season</div>' +
        '<div>This anime has no other seasons linked yet.</div>' +
      '</div>';
    return;
  }

  // Render each sibling season as a card
  siblings.forEach((sibling) => {
    const isActive = sibling.slug === currentAnime.slug;
    const div = document.createElement('div');
    div.className = 'season-sidebar-item' + (isActive ? ' active' : '');

    const label  = sibling.seasonLabel || ('Season ' + (sibling.seasonNumber || '?'));
    const epCount = sibling.episodes ? sibling.episodes.length : 0;
    const statusDot = isActive
      ? '<span class="season-active-dot"></span>'
      : '';

    div.innerHTML =
      '<img class="season-sidebar-cover" src="' + sibling.cover + '" alt="' + sibling.title + '" />' +
      '<div class="season-sidebar-body">' +
        '<div class="season-sidebar-name">' + statusDot + label + '</div>' +
        '<div class="season-sidebar-title">' + sibling.title + '</div>' +
        '<span class="season-sidebar-eps">' + epCount + ' episodes</span>' +
      '</div>';

    if (!isActive) {
      div.addEventListener('click', () => {
        watchAnime(sibling.slug, 0);
      });
    }
    container.appendChild(div);
  });
}

// ── ANIME LIST STATUS in modal ──
function renderModalListBtn(slug) {
  const status = getAnimeListStatus(slug);
  const el = document.getElementById('modalListStatusBtn');
  if (!el) return;
  if (status) {
    el.innerHTML = `<i class="fas ${LIST_ICONS[status]}"></i> <span style="color:${LIST_COLORS[status]}">${LIST_NAMES[status]}</span> <i class="fas fa-chevron-down" style="font-size:0.65rem"></i>`;
  } else {
    el.innerHTML = `<i class="fas fa-plus"></i> Add to List <i class="fas fa-chevron-down" style="font-size:0.65rem"></i>`;
  }
}

function toggleListDropdown(slug) {
  const dd = document.getElementById('listStatusDropdown');
  if (!dd) return;
  if (dd.style.display === 'block') { dd.style.display = 'none'; return; }
  dd.innerHTML = `
    ${Object.entries(LIST_NAMES).map(([k,n]) => `
      <div class="list-dd-item ${getAnimeListStatus(slug)===k?'active':''}" onclick="setAnimeListStatus('${slug}','${k}');renderModalListBtn('${slug}');document.getElementById('listStatusDropdown').style.display='none'" style="--lc:${LIST_COLORS[k]}">
        <i class="fas ${LIST_ICONS[k]}" style="color:${LIST_COLORS[k]}"></i> ${n}
      </div>`).join('')}
    ${getAnimeListStatus(slug) ? `<div class="list-dd-item remove" onclick="setAnimeListStatus('${slug}',null);renderModalListBtn('${slug}');document.getElementById('listStatusDropdown').style.display='none'"><i class="fas fa-times"></i> Remove</div>` : ''}
  `;
  dd.style.display = 'block';
}

// ── INIT ──
function init() {
  setupNavigation();
  setupAuthListeners();
  setupSearch();
  setupThemeToggle();
  setupMobileNav();
  setupHeaderScroll();
  setupKeyboardShortcuts();
  setupAnnouncement();
  setupFilterPage();
  initSlideshow();
  initPlayer();
  updateProfileUI();
  updateBellVisibility();
  renderHomePage();
  const hint = document.getElementById('shortcutHint');
  if (hint) hint.style.display = 'flex';
  const hash = window.location.hash.slice(1);
  // If hash is 'watch' but no anime loaded, restore from last history
  if (hash === 'watch') {
    const hist = getWatchHistory();
    if (hist.length > 0 && isLoggedIn()) {
      const last = hist[0];
      const anime = animeData.find(a => a.slug === last.slug);
      if (anime && anime.episodes.length > 0) {
        watchAnime(last.slug, last.episodeIndex || 0);
        return;
      }
    }
    navigateToPage('home');
    return;
  }
  navigateToPage(hash || 'home');
  setupBottomNav();
  setupTheatreKeyboard();
}

function setupBottomNav() {
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateToPage(item.dataset.page);
      document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function updateBellVisibility() {
  const section = document.getElementById('bellSection');
  if (section) section.style.display = isLoggedIn() ? 'flex' : 'none';
  updateBellBadge();
}

function setupTheatreKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if ((e.key === 't' || e.key === 'T') && document.getElementById('page-watch')?.style.display !== 'none') toggleFocusMode();
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

// ════════════════════════════════════════════
// NEW FEATURES — appended block
// ════════════════════════════════════════════

// ── PAGE FADE TRANSITIONS ──
function navigateToPageWithFade(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(8px)'; });
  setTimeout(() => {
    navigateToPage(pageName);
    const target = document.getElementById('page-' + pageName);
    if (target) {
      target.style.transition = 'none';
      target.style.opacity = '0';
      target.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        target.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
      });
    }
  }, 60);
}

// ── SKELETON LOADING ──
function renderSkeletonCards(containerId, count = 6) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array(count).fill(`
    <div class="skeleton-card">
      <div class="sk-thumb skel"></div>
      <div class="sk-line skel" style="width:80%;margin-top:8px"></div>
      <div class="sk-line skel" style="width:55%;margin-top:5px"></div>
    </div>`).join('');
}

// ── ANIME QUOTE OF THE DAY ──
function renderAnimeQuote() {
  const el = document.getElementById('animeQuoteBar');
  if (!el || typeof ANIME_QUOTES === 'undefined') return;
  const dayIdx = Math.floor(Date.now() / 86400000) % ANIME_QUOTES.length;
  const q = ANIME_QUOTES[dayIdx];
  el.innerHTML = `<i class="fas fa-quote-left" style="color:var(--accent);margin-right:8px;opacity:0.6"></i><em>"${q.quote}"</em> <span class="quote-attr">— ${q.author}, <span style="color:var(--accent)">${q.anime}</span></span>`;
  el.style.display = 'flex';
}

// ── DAILY WATCH CHALLENGE ──
function renderDailyChallenge() {
  const el = document.getElementById('dailyChallengeBar');
  if (!el || !isLoggedIn()) { if(el) el.style.display='none'; return; }
  const ch = getDailyChallenge();
  const todayEps = getWatchHistory().filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length;
  const done = ch.completed || todayEps >= ch.goal;
  el.style.display = 'flex';
  el.innerHTML = `
    <div class="dc-inner ${done ? 'done' : ''}">
      <span class="dc-icon">${done ? '✅' : '🎯'}</span>
      <span class="dc-text">Daily Challenge: Watch <b>${ch.goal}</b> episode today</span>
      <span class="dc-progress">${Math.min(todayEps, ch.goal)}/${ch.goal}</span>
      ${done ? '<span class="dc-badge">Complete!</span>' : ''}
    </div>`;
  if (done && !ch.completed) completeDailyChallenge();
}

// ── WHO'S WATCHING COUNTER ──
function renderWatchingCounter(slug) {
  // Seeded by slug so it's consistent per anime, fake but fun
  if (!slug) return '';
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) & 0xffffffff;
  const count = 15 + (Math.abs(h) % 86);
  return `<span class="watching-now"><i class="fas fa-fire"></i> ${count} watching now</span>`;
}

// ── MINIPLAYER ──
let miniPlayerAnime = null;
let miniPlayerEp = 0;
let miniPlayerActive = false;

function showMiniPlayer() {
  if (!currentAnime || !currentAnime.episodes[currentEpisodeIndex]) return;
  const mp = document.getElementById('miniPlayer');
  if (!mp) return;
  miniPlayerAnime = currentAnime;
  miniPlayerEp = currentEpisodeIndex;
  const ep = currentAnime.episodes[currentEpisodeIndex];
  const servers = (ep.servers && ep.servers[currentTrack]) || [];
  if (servers.length === 0) return;
  const url = servers[Math.min(currentServerIndex, servers.length - 1)].url;
  document.getElementById('miniPlayerIframe').src = url;
  document.getElementById('miniPlayerTitle').textContent = currentAnime.title;
  document.getElementById('miniPlayerEp').textContent = ep.name;
  mp.style.display = 'flex';
  miniPlayerActive = true;
  requestAnimationFrame(() => mp.classList.add('show'));
}

function hideMiniPlayer() {
  const mp = document.getElementById('miniPlayer');
  if (!mp) return;
  mp.classList.remove('show');
  setTimeout(() => {
    mp.style.display = 'none';
    document.getElementById('miniPlayerIframe').src = '';
    miniPlayerActive = false;
  }, 300);
}

function miniPlayerReturn() {
  if (!miniPlayerAnime) return;
  hideMiniPlayer();
  watchAnime(miniPlayerAnime.slug, miniPlayerEp);
}

// ── EPISODE HEATMAP IN MODAL ──
function renderEpisodeHeatmap(anime) {
  if (!anime || anime.episodes.length <= 1) return '';
  return `<div class="ep-heatmap">
    ${anime.episodes.map((ep, i) => {
      const pct = getEpProgress(anime.slug, i);
      const cls = pct >= 90 ? 'done' : pct > 0 ? 'partial' : '';
      return `<div class="ep-heat-block ${cls}" title="Ep ${i+1}: ${pct}%">${i+1}</div>`;
    }).join('')}
  </div>`;
}

// ── SEASON SELECTOR ──
let currentSeason = 0;
function renderSeasonSelector(anime) {
  if (!anime.seasons || anime.seasons.length <= 1) return '';
  return `<div class="season-tabs" id="seasonTabs">
    ${anime.seasons.map((s, i) =>
      `<button class="season-tab ${i === currentSeason ? 'active' : ''}"
        onclick="switchSeason(${i},'${anime.slug}')">${s.name}</button>`
    ).join('')}
  </div>`;
}
function switchSeason(slug) {
  // New seriesGroup system: navigate to the selected season's slug
  if (slug && slug !== (currentAnime && currentAnime.slug)) {
    watchAnime(slug, 0);
  }
}

// ── WATCH PARTY MODE ──
let watchPartyInterval = null;
function startWatchParty() {
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const url = `${window.location.href.split('#')[0]}#watch?party=${roomCode}&anime=${currentAnime?.slug||''}&ep=${currentEpisodeIndex}&t=${Date.now()}`;
  navigator.clipboard?.writeText(url).then(() => showToast(`🎉 Party link copied! Room: ${roomCode}`)).catch(() => showToast(`Party Room: ${roomCode}`));
  localStorage.setItem('aw_watchparty_used', '1');
  checkAchievements();
}
function checkWatchPartyFromURL() {
  const params = new URLSearchParams(window.location.search);
  const party = params.get('party');
  const anime = params.get('anime');
  const ep = params.get('ep');
  const t = params.get('t');
  if (party && anime && isLoggedIn()) {
    const elapsed = (Date.now() - parseInt(t||0)) / 1000;
    showToast(`🎉 Joined party room ${party}!`);
    setTimeout(() => watchAnime(anime, parseInt(ep||0)), 500);
  }
}

// ── SETTINGS PAGE ──
function renderSettingsPage() {
  const container = document.getElementById('settingsPageContent');
  if (!container) return;
  if (!isLoggedIn()) { navigateToPage('login'); return; }
  const s = getSettings();
  const accent = getAccentColor();

  container.innerHTML = `
    <div class="settings-page">
      <h2 class="settings-title"><i class="fas fa-cog"></i> Settings</h2>

      <div class="settings-section">
        <h3 class="settings-section-title">🎨 Accent Color</h3>
        <div class="accent-swatches">
          ${Object.entries(ACCENT_COLORS).map(([name, cols]) => `
            <button class="accent-swatch ${accent===name?'active':''}" style="background:${cols.accent}"
              onclick="setAccentColor('${name}');renderSettingsPage()" title="${name}">
              ${accent===name?'<i class="fas fa-check"></i>':''}
            </button>`).join('')}
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-section-title">📺 Playback</h3>
        <div class="settings-rows">
          <div class="settings-row">
            <div><div class="sr-label">Auto Next Episode</div><div class="sr-sub">Automatically play next episode</div></div>
            <button class="settings-toggle ${s.autoNext?'on':''}" onclick="updateSetting('autoNext',${!s.autoNext});renderSettingsPage()">
              <span class="st-knob"></span>
            </button>
          </div>
          <div class="settings-row">
            <div><div class="sr-label">Auto Play</div><div class="sr-sub">Start playing when page loads</div></div>
            <button class="settings-toggle ${s.autoPlay?'on':''}" onclick="updateSetting('autoPlay',${!s.autoPlay});renderSettingsPage()">
              <span class="st-knob"></span>
            </button>
          </div>
          <div class="settings-row">
            <div><div class="sr-label">Default Track</div><div class="sr-sub">Preferred audio track</div></div>
            <select class="settings-select" onchange="updateSetting('defaultTrack',this.value)">
              <option value="sub" ${s.defaultTrack==='sub'?'selected':''}>SUB (Subtitled)</option>
              <option value="dub" ${s.defaultTrack==='dub'?'selected':''}>DUB (Dubbed)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-section-title">🔔 Notifications & Feedback</h3>
        <div class="settings-rows">
          <div class="settings-row">
            <div><div class="sr-label">Notification Sound</div><div class="sr-sub">Soft chime for new notifications</div></div>
            <button class="settings-toggle ${s.notifSound?'on':''}" onclick="updateSetting('notifSound',${!s.notifSound});renderSettingsPage()">
              <span class="st-knob"></span>
            </button>
          </div>
          <div class="settings-row">
            <div><div class="sr-label">Haptic Feedback</div><div class="sr-sub">Vibration on button press (mobile)</div></div>
            <button class="settings-toggle ${s.haptics?'on':''}" onclick="updateSetting('haptics',${!s.haptics});renderSettingsPage()">
              <span class="st-knob"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-section-title">💾 Data</h3>
        <div class="settings-rows">
          <div class="settings-row">
            <div><div class="sr-label">Export Data</div><div class="sr-sub">Download your watch history, ratings & lists as JSON</div></div>
            <button class="btn-outline" style="width:auto;padding:0.5rem 1rem;font-size:0.8rem" onclick="exportUserData()"><i class="fas fa-download"></i> Export</button>
          </div>
          <div class="settings-row">
            <div><div class="sr-label">Import Data</div><div class="sr-sub">Restore from a backup JSON file</div></div>
            <button class="btn-outline" style="width:auto;padding:0.5rem 1rem;font-size:0.8rem" onclick="document.getElementById('importFileInput').click()"><i class="fas fa-upload"></i> Import</button>
            <input type="file" id="importFileInput" accept=".json" style="display:none" onchange="handleImportFile(this)" />
          </div>
        </div>
      </div>
    </div>`;
}
function handleImportFile(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => { importUserData(e.target.result); renderSettingsPage(); };
  reader.readAsText(file);
}

// ── VOICE SEARCH ──
function startVoiceSearch() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Voice search not supported in this browser', 'error'); return; }
  const rec = new SR();
  rec.lang = 'en-US'; rec.interimResults = false;
  const voiceBtn = document.getElementById('voiceSearchBtn');
  if (voiceBtn) { voiceBtn.style.color = 'var(--accent)'; voiceBtn.innerHTML = '<i class="fas fa-circle" style="animation:pulse 0.6s infinite"></i>'; }
  rec.start();
  rec.onresult = e => {
    const q = e.results[0][0].transcript;
    const input = document.getElementById('searchInput');
    if (input) { input.value = q; input.dispatchEvent(new Event('input')); }
    showToast(`🎤 "${q}"`);
  };
  rec.onerror = () => showToast('Voice search failed', 'error');
  rec.onend = () => {
    if (voiceBtn) { voiceBtn.style.color = ''; voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'; }
  };
}

// ── MARK ALL READ WITH ANIMATION ──
function markAllReadAnimated() {
  document.querySelectorAll('.bell-item.unread').forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '0.5';
      el.style.transform = 'translateX(10px)';
      setTimeout(() => { el.classList.remove('unread'); el.style.opacity=''; el.style.transform=''; }, 300);
    }, i * 80);
  });
  setTimeout(() => { markAllRead(); renderBellDropdown(); }, 500);
}

// ── LEVEL UP ANIMATION ──
let _lastLevel = null;
function checkLevelUp() {
  if (!isLoggedIn()) return;
  const stats = getProfileStats();
  const lv = getUserLevel(stats.totalEps);
  if (_lastLevel && _lastLevel !== lv.label) {
    launchConfetti();
    showLevelUpToast(lv);
    addNotification('Level Up! 🎉', `You are now a ${lv.label}!`, null);
  }
  _lastLevel = lv.label;
}
function showLevelUpToast(lv) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast level-up-toast';
  toast.innerHTML = `<div class="lut-inner"><div class="lut-crown">👑</div><div><div class="lut-title">LEVEL UP!</div><div class="lut-sub" style="color:${lv.color}">${lv.label}</div></div></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 4000);
}
function launchConfetti() {
  const colors = ['#e63946','#2ec4b6','#f1c40f','#8b5cf6','#22c55e'];
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti-piece';
    conf.style.cssText = `
      left:${Math.random()*100}vw;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;
      animation-delay:${Math.random()*0.5}s;
      animation-duration:${1+Math.random()*1.5}s;
      border-radius:${Math.random()>0.5?'50%':'2px'};
    `;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 3000);
  }
}

// ── BOTTOM SHEET MODAL (mobile) ──
function isMobile() { return window.innerWidth <= 768; }

// ── SWIPE EPISODE NAVIGATION ──
function setupSwipeNavigation() {
  const watchPage = document.getElementById('page-watch');
  if (!watchPage) return;
  let touchStartX = 0;
  watchPage.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, {passive:true});
  watchPage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) navigateEpisode(1);  // swipe left = next
      else        navigateEpisode(-1); // swipe right = prev
    }
  }, {passive:true});
}

// ── PULL TO REFRESH ──
function setupPullToRefresh() {
  const homePage = document.getElementById('page-home');
  if (!homePage) return;
  let startY = 0, pulling = false;
  const indicator = document.createElement('div');
  indicator.className = 'pull-indicator';
  indicator.innerHTML = '<i class="fas fa-sync-alt"></i> Pull to refresh';
  homePage.prepend(indicator);
  homePage.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
  homePage.addEventListener('touchmove', e => {
    const dy = e.touches[0].clientY - startY;
    if (dy > 60 && window.scrollY === 0) {
      indicator.classList.add('show'); pulling = true;
    }
  }, {passive:true});
  homePage.addEventListener('touchend', () => {
    if (pulling) {
      indicator.classList.add('spinning');
      setTimeout(() => { renderHomePage(); indicator.classList.remove('show','spinning'); }, 800);
    }
    pulling = false;
  }, {passive:true});
}

// ── LONG PRESS QUICK ADD ──
function setupLongPress() {
  // Applied to each card via renderAnimeCard — handled in card creation
}
function addLongPressToCard(card, anime) {
  let timer;
  card.addEventListener('touchstart', () => {
    timer = setTimeout(() => {
      haptic([50]);
      showQuickAddSheet(anime);
    }, 600);
  }, {passive:true});
  card.addEventListener('touchend', () => clearTimeout(timer), {passive:true});
  card.addEventListener('touchmove', () => clearTimeout(timer), {passive:true});
}
function showQuickAddSheet(anime) {
  const existing = document.getElementById('quickAddSheet');
  if (existing) existing.remove();
  const sheet = document.createElement('div');
  sheet.id = 'quickAddSheet';
  sheet.className = 'quick-add-sheet';
  sheet.innerHTML = `
    <div class="qas-backdrop" onclick="document.getElementById('quickAddSheet').remove()"></div>
    <div class="qas-body">
      <div class="qas-title">${anime.title}</div>
      ${Object.entries(LIST_NAMES).map(([k,n]) => `
        <button class="qas-btn" onclick="setAnimeListStatus('${anime.slug}','${k}');haptic();showToast('Added to ${n}');document.getElementById('quickAddSheet').remove()">
          <i class="fas ${LIST_ICONS[k]}" style="color:${LIST_COLORS[k]}"></i> ${n}
        </button>`).join('')}
      <button class="qas-btn cancel" onclick="document.getElementById('quickAddSheet').remove()">Cancel</button>
    </div>`;
  document.body.appendChild(sheet);
  requestAnimationFrame(() => sheet.classList.add('show'));
}

// ── DOUBLE TAP TO FAVORITE ──
function addDoubleTapToCard(card, anime) {
  let lastTap = 0;
  card.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTap < 300) {
      e.preventDefault();
      const added = toggleFavorite(anime.slug);
      haptic([30,30]);
      const heart = document.createElement('div');
      heart.className = 'double-tap-heart';
      heart.textContent = '❤️';
      heart.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);font-size:3rem;z-index:20;pointer-events:none;animation:heartPop 0.5s ease forwards`;
      card.querySelector('.anime-card-thumb').appendChild(heart);
      setTimeout(() => heart.remove(), 600);
    }
    lastTap = now;
  }, {passive:false});
}

// ── PROFILE: SHAREABLE STATS CARD ──
function generateStatsCard() {
  if (!isLoggedIn()) { showToast('Login first', 'error'); return; }
  const stats = getProfileStats();
  const av = getUserAvatar();
  const lv = getUserLevel(stats.totalEps);
  const canvas = document.createElement('canvas');
  canvas.width = 600; canvas.height = 300;
  const ctx = canvas.getContext('2d');

  // Background
  const grad = ctx.createLinearGradient(0, 0, 600, 300);
  grad.addColorStop(0, '#0a0a0f');
  grad.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 600, 300);

  // Accent bar
  ctx.fillStyle = lv.color; ctx.fillRect(0, 0, 6, 300);

  // Title
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 28px Bebas Neue, sans-serif';
  ctx.fillText('ANIMEWATCH', 30, 50);

  // Username
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px Outfit, sans-serif';
  ctx.fillText(currentUser.username, 30, 90);
  ctx.fillStyle = lv.color; ctx.font = '14px Outfit, sans-serif';
  ctx.fillText(lv.label, 30, 112);

  // Stats
  const statItems = [
    { label: 'Episodes', val: stats.totalEps },
    { label: 'Anime',    val: stats.uniqueAnime },
    { label: 'Avg ⭐',  val: stats.avgRating },
    { label: 'Streak 🔥',val: stats.streak + 'd' },
  ];
  statItems.forEach((s, i) => {
    const x = 30 + i * 140;
    ctx.fillStyle = '#e63946'; ctx.font = 'bold 28px Outfit, sans-serif';
    ctx.fillText(String(s.val), x, 180);
    ctx.fillStyle = '#888888'; ctx.font = '12px Outfit, sans-serif';
    ctx.fillText(s.label, x, 200);
  });

  // Top genre
  ctx.fillStyle = '#cccccc'; ctx.font = '14px Outfit, sans-serif';
  ctx.fillText(`Top Genre: ${stats.topGenre}`, 30, 240);
  ctx.fillStyle = '#444'; ctx.font = '11px Outfit, sans-serif';
  ctx.fillText('animewatch.app', 30, 280);

  // Download
  const a = document.createElement('a');
  a.download = `${currentUser.username}_animewatch_stats.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
  showToast('📸 Stats card saved!');
}

// ── PROFILE COMPLETION RENDER ──
function renderProfileCompletion() {
  const pct = getProfileCompletion();
  return `<div class="prof-completion">
    <div class="pc-header">
      <span class="pc-label">Profile ${pct}% complete</span>
      ${pct < 100 ? `<span class="pc-hint">Complete your profile to unlock hidden achievements</span>` : '<span style="color:#22c55e">✅ Profile complete!</span>'}
    </div>
    <div class="pc-bar"><div class="pc-fill" style="width:${pct}%"></div></div>
    <div class="pc-items">
      ${[
        {done:!!getUserAvatar(), label:'Set avatar'},
        {done:getUserBio().length>5, label:'Write bio'},
        {done:Object.keys(ratings).length>=5, label:'Rate 5 anime'},
        {done:getPinnedAnime().length>0, label:'Pin an anime'},
        {done:getWatchHistory().length>=3, label:'Watch 3 anime'},
      ].map(i=>`<span class="pc-item ${i.done?'done':''}"><i class="fas ${i.done?'fa-check-circle':'fa-circle'}"></i> ${i.label}</span>`).join('')}
    </div>
  </div>`;
}


// ── SAFE PATCHES — run after DOM is ready ──
window.addEventListener('load', function() {
  // Apply accent color
  if (typeof applyAccentColor === 'function') applyAccentColor();
  if (typeof renderAnimeQuote === 'function') renderAnimeQuote();
  if (typeof renderDailyChallenge === 'function') renderDailyChallenge();
  if (typeof checkWatchPartyFromURL === 'function') checkWatchPartyFromURL();
  if (typeof checkWatchingListNotifications === 'function') checkWatchingListNotifications();
  if (typeof setupSwipeNavigation === 'function') setupSwipeNavigation();
  if (typeof setupPullToRefresh === 'function') setupPullToRefresh();
});
