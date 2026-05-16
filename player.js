// ═══════════════════════════════════════
// ANIMEWATCH — Video Player (Multi-Server)
// ═══════════════════════════════════════

let currentAnime        = null;
let currentEpisodeIndex = 0;
let currentSeasonIndex  = 0;
let currentTrack        = 'sub';   // 'sub' | 'dub'
let currentServerIndex  = 0;
let autoNext            = true;
let autoPlay            = true;
let progressInterval    = null;
let epStartTime         = null;

function initPlayer() {
  // SUB / DUB toggle
  document.getElementById('subBtn').addEventListener('click', () => {
    currentTrack       = 'sub';
    currentServerIndex = 0;
    document.getElementById('subBtn').classList.add('active');
    document.getElementById('dubBtn').classList.remove('active');
    updateVideoSource();
    renderServerButtons();
    showToast('Switched to Subtitled (SUB)');
  });
  document.getElementById('dubBtn').addEventListener('click', () => {
    currentTrack       = 'dub';
    currentServerIndex = 0;
    document.getElementById('dubBtn').classList.add('active');
    document.getElementById('subBtn').classList.remove('active');
    updateVideoSource();
    renderServerButtons();
    showToast('Switched to Dubbed (DUB)');
  });

  // Auto-next toggle
  const autoNextBtn = document.getElementById('autoNextBtn');
  if (autoNextBtn) {
    autoNextBtn.classList.toggle('active', autoNext);
    autoNextBtn.addEventListener('click', () => {
      autoNext = !autoNext;
      autoNextBtn.classList.toggle('active', autoNext);
      showToast(`Auto Next ${autoNext ? 'ON' : 'OFF'}`);
    });
  }

  // Auto-play toggle
  const autoPlayBtn = document.getElementById('autoPlayBtn');
  if (autoPlayBtn) {
    autoPlayBtn.classList.toggle('active', autoPlay);
    autoPlayBtn.addEventListener('click', () => {
      autoPlay = !autoPlay;
      autoPlayBtn.classList.toggle('active', autoPlay);
      showToast(`Auto Play ${autoPlay ? 'ON' : 'OFF'}`);
    });
  }

  // Theatre mode button (theatreBtn has onclick in HTML, but also wire here for safety)
  const theatreBtn = document.getElementById('theatreBtn');
  if (theatreBtn && !theatreBtn.dataset.wired) {
    theatreBtn.dataset.wired = '1';
    theatreBtn.addEventListener('click', toggleTheatreMode);
  }

  // Fullscreen button
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn && !fullscreenBtn.dataset.wired) {
    fullscreenBtn.dataset.wired = '1';
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // ESC key exits fullscreen/theatre
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (typeof wcFullscreen !== 'undefined' && wcFullscreen) toggleFullscreen();
      else if (typeof theatreMode !== 'undefined' && theatreMode) toggleTheatreMode();
    }
  }, { once: false });
}

function watchAnime(slug, episodeIndex = 0) {
  if (!isLoggedIn()) {
    showToast('Please login to watch anime', 'error');
    navigateToPage('login');
    return;
  }
  const anime = animeData.find(a => a.slug === slug);
  if (!anime) { showToast('Anime not found', 'error'); return; }

  currentAnime        = anime;
  currentEpisodeIndex = episodeIndex;
  currentTrack        = (typeof getSettings === 'function' ? getSettings().defaultTrack : null) || 'sub';
  currentServerIndex  = 0;
  currentSeasonIndex = 0;

  addToHistory(slug, episodeIndex);
  if (typeof hideMiniPlayer === 'function') hideMiniPlayer();

  // Reset theatre/fullscreen state on new watch
  if (typeof wcFullscreen  !== 'undefined' && wcFullscreen)  toggleFullscreen();
  if (typeof theatreMode   !== 'undefined' && theatreMode)   toggleTheatreMode();
  // Ensure sidebar is visible when starting a new anime
  if (typeof wcSidebarHidden !== 'undefined' && wcSidebarHidden) toggleWatchSidebar();

  navigateToPage('watch');
  if (typeof haptic === 'function') haptic([20]);

  document.getElementById('watchAnimeTitle').textContent  = anime.title;
  document.getElementById('watchEpisodeName').textContent = anime.episodes[episodeIndex]?.name || '';

  const bca = document.getElementById('breadcrumbAnime');
  if (bca) { bca.textContent = anime.title; bca.onclick = () => openAnimeModal(anime.slug); }
  const bce = document.getElementById('breadcrumbEpisode');
  if (bce) bce.textContent = anime.episodes[episodeIndex]?.name || '';

  const epc = document.getElementById('epCount');
  if (epc) epc.textContent = `${anime.episodes.length} ep`;

  // Season selector
  const seasonSlot = document.getElementById('seasonSelectorSlot');
  if (seasonSlot) {
    seasonSlot.innerHTML = anime.seasons && anime.seasons.length > 1
      ? (typeof renderSeasonSelector === 'function' ? renderSeasonSelector(anime) : '')
      : '';
  }

  renderWatchSidebar(anime);
  populateWcInfoPanel(anime);

  // Apply default track
  const isSub = currentTrack === 'sub';
  document.getElementById('subBtn').classList.toggle('active', isSub);
  document.getElementById('dubBtn').classList.toggle('active', !isSub);

  // Who's watching counter
  const wcEl = document.getElementById('watchingNowCounter');
  if (wcEl && typeof renderWatchingCounter === 'function') wcEl.innerHTML = renderWatchingCounter(slug);

  updateVideoSource();
  renderServerButtons();
  renderEpisodesList();
  updateNavButtons();
  renderMoreLikeThis(anime);
  renderCommentsSection(anime.slug);
  if (typeof switchWatchTab === 'function') switchWatchTab('eps');
  setTimeout(updateProgressUI, 200);

  const cAvatar = document.getElementById('commentInputAvatar');
  if (cAvatar && isLoggedIn()) cAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
}

function renderWatchSidebar(anime) {
  const sidebar = document.getElementById('watchInfoSidebar');
  if (!sidebar) return;
  sidebar.innerHTML = `
    <img src="${anime.cover}" alt="${anime.title}" class="watch-sidebar-cover" />
    <div class="watch-sidebar-info">
      <h3 class="watch-sidebar-title">${anime.title}</h3>
      ${anime.malScore ? `<div class="watch-sidebar-score"><i class="fas fa-star"></i> MAL ${anime.malScore}</div>` : ''}
      <div class="watch-sidebar-meta">
        ${anime.status   ? `<div><span>Status</span><b>${anime.status}</b></div>` : ''}
        ${anime.aired    ? `<div><span>Aired</span><b>${anime.aired}</b></div>` : ''}
        ${anime.duration ? `<div><span>Duration</span><b>${anime.duration}</b></div>` : ''}
        ${anime.studio   ? `<div><span>Studio</span><b>${anime.studio}</b></div>` : ''}
        <div><span>Genres</span><b>${anime.genre.join(', ')}</b></div>
      </div>
      <p class="watch-sidebar-synopsis">${anime.synopsis || ''}</p>
      <button class="btn-outline" style="width:100%;justify-content:center;margin-top:0.75rem" onclick="openAnimeModal('${anime.slug}')">
        <i class="fas fa-info-circle"></i> View Details
      </button>
    </div>`;
}

// ── AnimeKai-style left info panel ──────────────────────────────────
function populateWcInfoPanel(anime) {
  const cover = document.getElementById('wcInfoCover');
  const meta  = document.getElementById('wcInfoMeta');
  if (!cover || !meta) return;

  cover.src = anime.cover;
  cover.alt = anime.title;
  cover.onclick = () => openAnimeModal(anime.slug);
  cover.style.cursor = 'pointer';

  const inList = typeof getMyList === 'function' && getMyList().includes(anime.slug);
  const ratingStars = anime.malScore
    ? '<i class="fas fa-star" style="color:var(--gold)"></i> ' + anime.malScore
    : '';

  meta.innerHTML = `
    <div class="wc-info-meta-title" onclick="openAnimeModal('${anime.slug}')" style="cursor:pointer">${anime.title}</div>
    <div class="wc-info-meta-type">${anime.type === 'movie' ? '🎬 Movie' : '📺 TV Series'}</div>
    <div class="wc-info-meta-genres">${(anime.genre || []).map(g => `<span class="wc-info-meta-genre">${g}</span>`).join('')}</div>
    <div class="wc-info-divider"></div>
    ${anime.malScore ? `<div class="wc-info-row"><span class="wc-info-row-label">MAL Score</span><span class="wc-info-score">${ratingStars} ${anime.malScore}</span></div>` : ''}
    ${anime.status   ? `<div class="wc-info-row"><span class="wc-info-row-label">Status</span><span class="wc-info-row-val">${anime.status}</span></div>` : ''}
    ${anime.year     ? `<div class="wc-info-row"><span class="wc-info-row-label">Year</span><span class="wc-info-row-val">${anime.year}</span></div>` : ''}
    ${anime.duration ? `<div class="wc-info-row"><span class="wc-info-row-label">Duration</span><span class="wc-info-row-val">${anime.duration}</span></div>` : ''}
    ${anime.studio   ? `<div class="wc-info-row"><span class="wc-info-row-label">Studio</span><span class="wc-info-row-val">${anime.studio}</span></div>` : ''}
    <div class="wc-info-row"><span class="wc-info-row-label">Episodes</span><span class="wc-info-row-val">${anime.episodes.length}</span></div>
    <div class="wc-info-divider"></div>
    <button class="wc-info-action-btn" onclick="openAnimeModal('${anime.slug}')">
      <i class="fas fa-info-circle"></i> Details
    </button>
    <button class="wc-info-action-btn outline" onclick="toggleMyListAndRefresh('${anime.slug}')" id="wcInfoListBtn">
      <i class="fas fa-${inList ? 'check' : 'plus'}"></i> ${inList ? 'In My List' : 'Add to List'}
    </button>`;
}

function toggleMyListAndRefresh(slug) {
  if (!isLoggedIn()) { navigateToPage('login'); return; }
  if (typeof toggleMyList === 'function') toggleMyList(slug);
  if (currentAnime && currentAnime.slug === slug) populateWcInfoPanel(currentAnime);
}

// Render server buttons for current track
function renderServerButtons() {
  const container = document.getElementById('serverButtons');
  if (!container || !currentAnime) return;
  const episode = currentAnime.episodes[currentEpisodeIndex];
  const allServers = (episode.servers && episode.servers[currentTrack]) || [];
  // Only show servers that actually have a URL
  const servers = allServers.filter(s => s.url && s.url.trim() !== '');

  // Clamp server index to valid range after filtering
  if (currentServerIndex >= servers.length) currentServerIndex = 0;

  container.innerHTML = '';
  if (servers.length === 0) {
    container.innerHTML = `<span class="no-servers">No ${currentTrack.toUpperCase()} servers available yet — check back soon!</span>`;
    return;
  }
  servers.forEach((server, idx) => {
    const btn = document.createElement('button');
    btn.className = `server-btn ${idx === currentServerIndex ? 'active' : ''}`;
    btn.textContent = server.name;
    btn.addEventListener('click', () => {
      currentServerIndex = idx;
      updateVideoSource();
      renderServerButtons();
      showToast(`Server: ${server.name}`);
    });
    container.appendChild(btn);
  });
}

function updateVideoSource() {
  if (!currentAnime || !currentAnime.episodes[currentEpisodeIndex]) return;
  const episode = currentAnime.episodes[currentEpisodeIndex];
  const servers  = ((episode.servers && episode.servers[currentTrack]) || []).filter(s => s.url && s.url.trim() !== '');

  if (servers.length === 0) {
    showToast(`No ${currentTrack.toUpperCase()} version available yet`, 'error');
    document.getElementById('videoIframe').src = '';
    return;
  }

  // Remember last server per anime
  const lastSvr = typeof getLastServer === 'function' ? getLastServer(currentAnime.slug) : null;
  if (lastSvr) {
    const idx = servers.findIndex(s => s.name === lastSvr);
    if (idx !== -1) currentServerIndex = idx;
  }

  const server = servers[Math.min(currentServerIndex, servers.length - 1)];
  document.getElementById('videoIframe').src = server.url;

  // Sync overlay episode name
  const vobEl = document.getElementById('vobEpName');
  if (vobEl && currentAnime) {
    vobEl.textContent = currentAnime.episodes[currentEpisodeIndex]?.name || '';
  }

  // Save last server used
  if (typeof rememberServer === 'function') rememberServer(currentAnime.slug, server.name);

  startProgressTracking();
  renderDownloadButton(server.url);
}

function startProgressTracking() {
  clearInterval(progressInterval);
  epStartTime = Date.now();
  // Estimate progress by time (since we can't access iframe internals cross-origin)
  // We simulate: mark 30% after 3min, 60% after 8min, 90% after 18min of watching
  const slug = currentAnime.slug;
  const epIdx = currentEpisodeIndex;
  const existing = getEpProgress(slug, epIdx);

  progressInterval = setInterval(() => {
    const elapsed = (Date.now() - epStartTime) / 1000; // seconds
    // Rough progress: assume average ep = 24min = 1440s
    const estDuration = currentAnime.type === 'movie' ? 6600 : 1440;
    const calc = Math.min(99, Math.round((elapsed / estDuration) * 100));
    const newPct = Math.max(existing, calc);
    setEpProgress(slug, epIdx, newPct);
    updateProgressUI();
  }, 15000); // update every 15 seconds
}

function stopProgressTracking() {
  clearInterval(progressInterval);
  progressInterval = null;
}

function updateProgressUI() {
  const bar = document.getElementById('watchProgressBar');
  const label = document.getElementById('watchProgressLabel');
  if (!bar || !currentAnime) return;
  const pct = getEpProgress(currentAnime.slug, currentEpisodeIndex);
  bar.style.width = pct + '%';
  if (label) label.textContent = pct + '% (estimated)';
}

function renderDownloadButton(url) {
  const btn = document.getElementById('downloadBtn');
  if (!btn) return;
  // Convert GDrive preview URL to download URL
  let downloadUrl = url;
  const gdMatch = url.match(/\/file\/d\/([^/]+)\//);
  if (gdMatch) {
    downloadUrl = `https://drive.google.com/uc?export=download&id=${gdMatch[1]}`;
  }
  btn.onclick = () => {
    window.open(downloadUrl, '_blank');
    showToast('Opening download... 📥');
  };
}

function renderEpisodesList() {
  const list = document.getElementById('episodesList');
  list.innerHTML = '';
  currentAnime.episodes.forEach((episode, index) => {
    const pct = getEpProgress(currentAnime.slug, index);
    // Check if this episode has at least one real server URL
    const epServers = (episode.servers && episode.servers[currentTrack]) || [];
    const hasUrl = epServers.some(s => s.url && s.url.trim() !== '');
    const item = document.createElement('div');
    item.className = `episode-item${index === currentEpisodeIndex ? ' active' : ''}${!hasUrl ? ' ep-no-url' : ''}`;
    item.dataset.num = index + 1;
    item.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:4px">
        <span class="ep-item-name">${episode.name}</span>
        ${!hasUrl ? `<span style="font-size:0.6rem;color:var(--text3);background:var(--surface2);border-radius:4px;padding:1px 5px;white-space:nowrap;flex-shrink:0">Soon</span>` : ''}
        ${pct > 0 ? `<span class="ep-item-pct">${pct}%</span>` : ''}
      </div>
      ${pct > 0 ? `<div class="ep-item-bar"><div class="ep-item-fill" style="width:${pct}%"></div></div>` : ''}
    `;
    item.addEventListener('click', () => {
      if (!hasUrl) { showToast('This episode is not available yet', 'error'); return; }
      stopProgressTracking();
      currentEpisodeIndex = index;
      currentServerIndex  = 0;
      document.getElementById('watchEpisodeName').textContent = episode.name;
      const bce = document.getElementById('breadcrumbEpisode');
      if (bce) bce.textContent = episode.name;
      updateVideoSource();
      renderServerButtons();
      addToHistory(currentAnime.slug, index);
      renderEpisodesList();
      updateNavButtons();
      updateProgressUI();
    });
    list.appendChild(item);
  });
  setTimeout(() => {
    const active = list.querySelector('.episode-item.active');
    if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 100);
}

function navigateEpisode(direction) {
  if (!currentAnime) return;
  const newIndex = currentEpisodeIndex + direction;
  if (newIndex < 0 || newIndex >= currentAnime.episodes.length) return;
  stopProgressTracking();
  currentEpisodeIndex = newIndex;
  currentServerIndex  = 0;
  const episode = currentAnime.episodes[newIndex];
  document.getElementById('watchEpisodeName').textContent = episode.name;
  const bce = document.getElementById('breadcrumbEpisode');
  if (bce) bce.textContent = episode.name;
  updateVideoSource();
  renderServerButtons();
  addToHistory(currentAnime.slug, newIndex);
  renderEpisodesList();
  updateNavButtons();
  updateProgressUI();
  showToast(`▶ ${episode.name}`);
}

function updateNavButtons() {
  const prev = document.getElementById('prevEpBtn');
  const next = document.getElementById('nextEpBtn');
  if (!currentAnime) return;
  if (prev) prev.disabled = currentEpisodeIndex <= 0;
  if (next) next.disabled = currentEpisodeIndex >= currentAnime.episodes.length - 1;
}

// ── Comments Section ──
function renderCommentsSection(slug) {
  const section = document.getElementById('commentsSection');
  if (!section) return;
  section.style.display = 'block';
  const list = document.getElementById('commentsList');
  const allComments = getComments(slug);

  if (allComments.length === 0) {
    list.innerHTML = `<div class="comments-empty"><i class="fas fa-comments"></i><p>No comments yet. Be the first!</p></div>`;
  } else {
    list.innerHTML = allComments.map((c, i) => {
      // Support both old format (c.avatar) and new format (c.avatarEmoji / c.avatarBg)
      const avatarText = c.avatarEmoji || c.avatar || (c.user ? c.user.charAt(0).toUpperCase() : '?');
      const avatarBg   = c.avatarBg   || 'var(--accent)';
      return `
      <div class="comment-item">
        <div class="comment-avatar" style="background:${avatarBg}">${avatarText}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-user">${c.user}</span>
            <span class="comment-date">${formatCommentDate(c.date)}</span>
            ${isLoggedIn() && currentUser && c.user === currentUser.username
              ? `<button class="comment-delete" onclick="handleDeleteComment('${slug}',${i})"><i class="fas fa-trash"></i></button>`
              : ''}
          </div>
          <p class="comment-text">${escapeHtml(c.text)}</p>
        </div>
      </div>`;
    }).join('');
  }

  // Count + local-only notice
  const countEl = document.getElementById('commentsCount');
  if (countEl) countEl.textContent = allComments.length;

  const noticeId = 'commentsLocalNotice';
  if (!document.getElementById(noticeId)) {
    const notice = document.createElement('div');
    notice.id = noticeId;
    notice.style.cssText = 'font-size:0.7rem;color:var(--text3);padding:4px 0 8px;display:flex;align-items:center;gap:5px;opacity:0.7';
    notice.innerHTML = '<i class="fas fa-info-circle"></i> Comments are saved locally on this device only.';
    const header = document.querySelector('.comments-header');
    if (header) header.appendChild(notice);
  }

  // Input box — show login prompt if not logged in
  const form = document.getElementById('commentForm');
  if (form) {
    if (!isLoggedIn()) {
      form.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;padding:0.5rem 0;color:var(--text3);font-size:0.85rem">
          <i class="fas fa-lock" style="color:var(--accent)"></i>
          <span><a href="#" onclick="navigateToPage('login');return false" style="color:var(--accent);font-weight:600">Sign in</a> to post a comment</span>
        </div>`;
    } else {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('commentInput');
        const text = input.value.trim();
        if (addComment(slug, text)) {
          input.value = '';
          renderCommentsSection(slug);
        }
      };
    }
  }
}

function handleDeleteComment(slug, index) {
  deleteComment(slug, index);
  renderCommentsSection(slug);
  showToast('Comment deleted');
}

function formatCommentDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return d.toLocaleDateString();
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

