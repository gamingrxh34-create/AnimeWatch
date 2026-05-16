// ═══════════════════════════════════════
// ANIMEWATCH — Hero V2 Slideshow
// Uses slideshow_data.js for configuration
// ═══════════════════════════════════════

let currentSlide = 0;
let slideshowInterval = null;
const SLIDE_INTERVAL = 6000;

// Build featuredAnime array from heroSlides (defined in slideshow_data.js)
// Falls back to the old featuredAnime array if heroSlides not defined
function getSlides() {
  if (typeof heroSlides !== 'undefined' && heroSlides.length > 0) {
    return heroSlides.filter(s => animeData.find(a => a.slug === s.slug));
  }
  if (typeof featuredAnime !== 'undefined') {
    return featuredAnime.map(slug => ({ slug, banner: '' }));
  }
  return [];
}

function initSlideshow() {
  const slides = getSlides();
  if (slides.length === 0) return;

  const dotsContainer = document.getElementById('slideshowDots');
  if (!dotsContainer) return;

  // Build dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Slide counter total
  const total = document.getElementById('heroV2SlideTotal');
  if (total) total.textContent = slides.length;

  showSlide(0);
  startSlideshow();

  // Watch Now button
  const watchBtn = document.getElementById('heroV2WatchBtn');
  if (watchBtn) watchBtn.addEventListener('click', () => {
    const slug = getSlides()[currentSlide]?.slug;
    if (!slug) return;
    if (!isLoggedIn()) { navigateToPage('login'); return; }
    watchAnime(slug, 0);
  });

  // Bookmark button
  const saveBtn = document.getElementById('heroV2SaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const slug = getSlides()[currentSlide]?.slug;
    if (!slug) return;
    if (!isLoggedIn()) { showToast('Sign in to save to your list', 'error'); navigateToPage('login'); return; }
    toggleMyList(slug);
    updateHeroSaveBtn(slug);
  });

  // Title click → modal
  const titleEl = document.getElementById('heroV2Title');
  if (titleEl) {
    titleEl.style.cursor = 'pointer';
    titleEl.addEventListener('click', () => {
      const slug = getSlides()[currentSlide]?.slug;
      if (slug) openAnimeModal(slug);
    });
  }

  // Prev / Next arrows
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const slides = getSlides();
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const slides = getSlides();
    goToSlide((currentSlide + 1) % slides.length);
  });

  // Pause on hover
  const hero = document.getElementById('heroV2');
  if (hero) {
    hero.addEventListener('mouseenter', stopSlideshow);
    hero.addEventListener('mouseleave', startSlideshow);
  }

  // Compat shims
  const fc  = document.getElementById('featuredCard');
  const fwb = document.getElementById('featuredWatchBtn');
  const fib = document.getElementById('featuredInfoBtn');
  if (fc)  fc.addEventListener('click',  () => { const s = getSlides()[currentSlide]?.slug; if(s) openAnimeModal(s); });
  if (fwb) fwb.addEventListener('click', e => { e.stopPropagation(); const s = getSlides()[currentSlide]?.slug; if(!s) return; if (!isLoggedIn()) { navigateToPage('login'); return; } watchAnime(s, 0); });
  if (fib) fib.addEventListener('click', e => { e.stopPropagation(); const s = getSlides()[currentSlide]?.slug; if(s) openAnimeModal(s); });

  // Apply login banner image from slideshow_data.js
  applyLoginBanner();

}

function showSlide(index) {
  const slides = getSlides();
  if (!slides.length) return;
  const slide = slides[index];
  if (!slide) return;
  const anime = animeData.find(a => a.slug === slide.slug);
  if (!anime) return;

  // Background image — use custom banner if set, else cover
  const bgSrc = (slide.banner && slide.banner.trim() !== '') ? slide.banner : anime.cover;
  const bgImg = document.getElementById('heroV2BgImg');
  if (bgImg) {
    bgImg.style.opacity = '0';
    bgImg.style.transform = 'scale(1.06)';
    setTimeout(() => {
      bgImg.src = bgSrc;
      bgImg.alt = anime.title;
      const onReady = () => {
        bgImg.style.transition = 'opacity 0.7s ease, transform 9s ease';
        bgImg.style.opacity    = '1';
        bgImg.style.transform  = 'scale(1.0)';
      };
      if (bgImg.complete && bgImg.naturalWidth > 0) onReady();
      else bgImg.onload = onReady;
    }, 180);
  }

  // Left panel text
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('heroV2Title',   anime.title);
  set('heroV2Genres',  (anime.genre || []).join('  ·  '));
  set('heroV2Synopsis', anime.synopsis || '');
  set('heroV2Rating',  anime.malScore ? '⭐ ' + anime.malScore : '—');
  set('heroV2Release', anime.year || (anime.aired ? anime.aired.split(' ').pop() : '—'));
  set('heroV2SlideNum', index + 1);

  const typeEl   = document.getElementById('heroV2Type');
  const subBadge = document.getElementById('heroV2SubBadge');
  const dubBadge = document.getElementById('heroV2DubBadge');
  if (typeEl)   typeEl.textContent  = anime.type === 'movie' ? '🎬 Movie' : '📺 TV';
  if (subBadge) subBadge.style.display = 'inline-flex';
  if (dubBadge) dubBadge.style.display = anime.dub ? 'inline-flex' : 'none';

  // Dots
  document.querySelectorAll('.slideshow-dots .dot').forEach((dot, i) => dot.classList.toggle('active', i === index));

  // Compat shims
  const fcImg   = document.getElementById('featuredImage');
  const fcTitle = document.getElementById('featuredTitle');
  const fcMeta  = document.getElementById('featuredMeta');
  const fcGenres= document.getElementById('featuredGenres');
  if (fcImg)   { fcImg.src = anime.cover; fcImg.alt = anime.title; }
  if (fcTitle) fcTitle.textContent = anime.title;
  if (fcMeta)  fcMeta.textContent = (anime.type === 'movie' ? '🎬 Movie' : '📺 Series') + ' · ' + anime.episodes.length + ' ep';
  if (fcGenres){ fcGenres.innerHTML = ''; (anime.genre||[]).forEach(g=>{ const b=document.createElement('span'); b.className='genre-badge'; b.textContent=g; fcGenres.appendChild(b); }); }

  updateHeroSaveBtn(anime.slug);
  currentSlide = index;
}

function updateHeroSaveBtn(slug) {
  const btn = document.getElementById('heroV2SaveBtn');
  if (!btn) return;
  const inList = typeof getMyList === 'function' && getMyList().includes(slug);
  btn.classList.toggle('saved', inList);
  btn.innerHTML = inList ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
  btn.title = inList ? 'Remove from My List' : 'Add to My List';
}

function applyLoginBanner() {
  if (typeof loginBannerImage !== 'undefined' && loginBannerImage) {
    const panel = document.querySelector('.auth-brand-panel');
    if (panel) {
      panel.style.backgroundImage =
        'linear-gradient(135deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.3) 50%, transparent 100%), url("' + loginBannerImage + '")';
      panel.style.backgroundSize = 'cover';
      panel.style.backgroundPosition = 'center';
    }
  }
}

function buildTrendingPanel() {
  // Trending panel removed — this is a no-op stub kept for compatibility
}

function goToSlide(index) { showSlide(index); resetSlideshow(); }
function nextSlide()      { const s = getSlides(); showSlide((currentSlide + 1) % s.length); }
function startSlideshow() { clearInterval(slideshowInterval); slideshowInterval = setInterval(nextSlide, SLIDE_INTERVAL); }
function resetSlideshow() { clearInterval(slideshowInterval); startSlideshow(); }
function stopSlideshow()  { clearInterval(slideshowInterval); }
