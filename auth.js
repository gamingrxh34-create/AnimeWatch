// ═══════════════════════════════════════
// ANIMEWATCH — Auth + User Data
// ═══════════════════════════════════════

const STORAGE_KEYS = {
  USERS:'aw_users', SESSION:'aw_session', HISTORY:'aw_history', RATINGS:'aw_ratings',
  FAVORITES:'aw_favorites', PROGRESS:'aw_progress', COMMENTS:'aw_comments',
  ANIMELISTS:'aw_animelists', AVATAR:'aw_avatar', STREAK:'aw_streak',
  NOTIFICATIONS:'aw_notifications', INTROSKIP:'aw_introskip',
  // New keys
  BIO:'aw_bio', PINNED:'aw_pinned', SETTINGS:'aw_settings',
  DAILY_CHALLENGE:'aw_daily_challenge', ACCENT:'aw_accent',
  LAST_SERVER:'aw_last_server', SEARCH_HISTORY:'aw_search_history',
};

// Anime character avatars
// Primary: Jikan API proxied MAL images (reliable, no hotlink block)
// Fallback built into updateProfileUI / openAvatarPicker via onerror
const AVATARS = [
  {id:'av1',  label:'Eren',      img:'https://cdn.myanimelist.net/images/characters/10/216895.jpg',  fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=Eren&backgroundColor=264653',      bg:'#264653'},
  {id:'av2',  label:'Mikasa',    img:'https://cdn.myanimelist.net/images/characters/9/215563.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=Mikasa&backgroundColor=1d3557',     bg:'#1d3557'},
  {id:'av3',  label:'Light',     img:'https://cdn.myanimelist.net/images/characters/8/339838.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=LightYagami&backgroundColor=2b2d42', bg:'#2b2d42'},
  {id:'av4',  label:'L',         img:'https://cdn.myanimelist.net/images/characters/2/413529.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=LLawliet&backgroundColor=1a1a2e',   bg:'#1a1a2e'},
  {id:'av5',  label:'Naruto',    img:'https://cdn.myanimelist.net/images/characters/2/284121.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=Naruto&backgroundColor=e07b00',     bg:'#e07b00'},
  {id:'av6',  label:'Gojo',      img:'https://cdn.myanimelist.net/images/characters/9/382488.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=GojoSatoru&backgroundColor=4a4e69', bg:'#4a4e69'},
  {id:'av7',  label:'Zoro',      img:'https://cdn.myanimelist.net/images/characters/3/100534.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=RoronoaZoro&backgroundColor=1b4332', bg:'#1b4332'},
  {id:'av8',  label:'Levi',      img:'https://cdn.myanimelist.net/images/characters/2/241413.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=LeviAckerman&backgroundColor=3d3d3d', bg:'#3d3d3d'},
  {id:'av9',  label:'Itachi',    img:'https://cdn.myanimelist.net/images/characters/9/131317.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=ItachiUchiha&backgroundColor=1a1a3e', bg:'#1a1a3e'},
  {id:'av10', label:'Rem',       img:'https://cdn.myanimelist.net/images/characters/7/329715.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=RemReZero&backgroundColor=023e8a',  bg:'#023e8a'},
  {id:'av11', label:'Zero Two',  img:'https://cdn.myanimelist.net/images/characters/10/357459.jpg',  fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=ZeroTwoDarling&backgroundColor=c1121f', bg:'#c1121f'},
  {id:'av12', label:'Todoroki',  img:'https://cdn.myanimelist.net/images/characters/8/339831.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=ShoutoTodoroki&backgroundColor=0096c7', bg:'#0096c7'},
  {id:'av13', label:'Hinata S.', img:'https://cdn.myanimelist.net/images/characters/3/163835.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=HinataHyuga&backgroundColor=ff6b35',  bg:'#ff6b35'},
  {id:'av14', label:'Killua',    img:'https://cdn.myanimelist.net/images/characters/7/204126.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=KilluaZoldyck&backgroundColor=5e60ce', bg:'#5e60ce'},
  {id:'av15', label:'Aqua',      img:'https://cdn.myanimelist.net/images/characters/11/319792.jpg',  fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=AquaKonosuba&backgroundColor=0077b6', bg:'#0077b6'},
  {id:'av16', label:'Spike',     img:'https://cdn.myanimelist.net/images/characters/4/50197.jpg',    fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=SpikeSpiegel&backgroundColor=14213d', bg:'#14213d'},
  {id:'av17', label:'Luffy',     img:'https://cdn.myanimelist.net/images/characters/9/310307.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=MonkeyDLuffy&backgroundColor=c84b31', bg:'#c84b31'},
  {id:'av18', label:'Sasuke',    img:'https://cdn.myanimelist.net/images/characters/5/321441.jpg',   fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=SasukeUchiha&backgroundColor=2d2d44', bg:'#2d2d44'},
  {id:'av19', label:'Asuka',     img:'https://cdn.myanimelist.net/images/characters/13/261936.jpg',  fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=AsukaLangley&backgroundColor=991b1b',  bg:'#991b1b'},
  {id:'av20', label:'Edward',    img:'https://cdn.myanimelist.net/images/characters/11/174517.jpg',  fallback:'https://api.dicebear.com/9.x/pixel-art/svg?seed=EdwardElric&backgroundColor=92400e',   bg:'#92400e'},
];

const LEVELS = [
  {min:0,   label:'Newcomer',     color:'#636e72'},
  {min:5,   label:'Anime Fan',    color:'#2ec4b6'},
  {min:15,  label:'Otaku',        color:'#6c5ce7'},
  {min:30,  label:'Veteran',      color:'#e17055'},
  {min:50,  label:'Elite Otaku',  color:'#f1c40f'},
  {min:100, label:'Anime Legend', color:'#e63946'},
];

const ACHIEVEMENTS = [
  {id:'first_watch', icon:'▶️', label:'First Step',     desc:'Watch your first episode',    check:s=>s.totalEps>=1},
  {id:'binge5',      icon:'🔥', label:'Binge Mode',     desc:'Watch 5 episodes in one day', check:s=>s.todayEps>=5},
  {id:'anime10',     icon:'📺', label:'Explorer',       desc:'Watch 10 different anime',    check:s=>s.uniqueAnime>=10},
  {id:'movie_lover', icon:'🎬', label:'Movie Lover',    desc:'Watch 3 anime movies',        check:s=>s.moviesWatched>=3},
  {id:'rated5',      icon:'⭐', label:'Critic',         desc:'Rate 5 anime',                check:s=>s.totalRatings>=5},
  {id:'mylist10',    icon:'❤️', label:'Collector',      desc:'Add 10 anime to My List',     check:s=>s.favCount>=10},
  {id:'streak3',     icon:'📅', label:'Dedicated',      desc:'3-day watch streak',          check:s=>s.streak>=3},
  {id:'streak7',     icon:'🏆', label:'True Otaku',     desc:'7-day watch streak',          check:s=>s.streak>=7},
  {id:'completed1',  icon:'✅', label:'Finisher',       desc:'Complete 1 anime',            check:s=>s.completedList>=1},
  {id:'eps50',       icon:'🎌', label:'Anime Legend',   desc:'Watch 50 episodes total',     check:s=>s.totalEps>=50},
  {id:'streak14',    icon:'🌟', label:'Obsessed',       desc:'14-day watch streak',         check:s=>s.streak>=14},
  {id:'rated10',     icon:'📝', label:'Reviewer',       desc:'Rate 10 anime',               check:s=>s.totalRatings>=10},
  {id:'allgenres',   icon:'🎨', label:'Genre Master',   desc:'Watch 5 different genres',    check:s=>s.genreCount>=5},
  {id:'nightowl',    icon:'🦉', label:'Night Owl',      desc:'Watch after midnight',        check:s=>s.nightWatch>=1},
  {id:'speedrun',    icon:'⚡', label:'Speed Watcher',  desc:'Watch 3 eps in one session',  check:s=>s.sessionEps>=3},
  // Hidden achievements — shown as ??? until unlocked
  {id:'secret_bio',  icon:'✍️', label:'???',            desc:'???', hidden:true,            check:s=>s.hasBio},
  {id:'secret_pin',  icon:'📌', label:'???',            desc:'???', hidden:true,            check:s=>s.hasPinned},
  {id:'secret_eps100',icon:'💯',label:'???',            desc:'???', hidden:true,            check:s=>s.totalEps>=100},
  {id:'secret_party',icon:'🎉', label:'???',            desc:'???', hidden:true,            check:s=>s.hasWatchParty},
];

let users=[], currentUser=null, watchHistory=[], ratings={}, favorites=[], epProgress={}, comments={};
let animeLists={watching:[],planToWatch:[],completed:[],onHold:[],dropped:[]};
let userAvatar=null, watchStreak={count:0,lastDate:null};
let notifications=[], introSkips={};
let userBio='', pinnedAnime=[], userSettings={autoNext:true,autoPlay:true,defaultTrack:'sub',notifSound:false,haptics:true,theme:'dark'};
let lastServerMap={}, searchHistory=[];

const LIST_NAMES  = {watching:'Watching',planToWatch:'Plan to Watch',completed:'Completed',onHold:'On Hold',dropped:'Dropped'};
const LIST_ICONS  = {watching:'fa-play-circle',planToWatch:'fa-clock',completed:'fa-check-circle',onHold:'fa-pause-circle',dropped:'fa-times-circle'};
const LIST_COLORS = {watching:'var(--teal)',planToWatch:'var(--gold)',completed:'#22c55e',onHold:'var(--text3)',dropped:'var(--accent)'};

// ── Storage ──
function loadFromStorage() {
  try {
    const u=localStorage.getItem(STORAGE_KEYS.USERS); if(u) users=JSON.parse(u);
    const s=localStorage.getItem(STORAGE_KEYS.SESSION); if(s) currentUser=JSON.parse(s);
    if(currentUser) _loadUserData(currentUser.username);
  } catch(e){}
}
function _loadUserData(n) {
  try {
    const h=localStorage.getItem(STORAGE_KEYS.HISTORY+'_'+n);    watchHistory=h?JSON.parse(h):[];
    const r=localStorage.getItem(STORAGE_KEYS.RATINGS+'_'+n);    ratings=r?JSON.parse(r):{};
    const f=localStorage.getItem(STORAGE_KEYS.FAVORITES+'_'+n);  favorites=f?JSON.parse(f):[];
    const p=localStorage.getItem(STORAGE_KEYS.PROGRESS+'_'+n);   epProgress=p?JSON.parse(p):{};
    const al=localStorage.getItem(STORAGE_KEYS.ANIMELISTS+'_'+n);animeLists=al?JSON.parse(al):{watching:[],planToWatch:[],completed:[],onHold:[],dropped:[]};
    const av=localStorage.getItem(STORAGE_KEYS.AVATAR+'_'+n);    userAvatar=av?JSON.parse(av):null;
    const st=localStorage.getItem(STORAGE_KEYS.STREAK+'_'+n);    watchStreak=st?JSON.parse(st):{count:0,lastDate:null};
    const bio=localStorage.getItem(STORAGE_KEYS.BIO+'_'+n);      userBio=bio||'';
    const pin=localStorage.getItem(STORAGE_KEYS.PINNED+'_'+n);   pinnedAnime=pin?JSON.parse(pin):[];
    const set=localStorage.getItem(STORAGE_KEYS.SETTINGS+'_'+n); userSettings=set?JSON.parse(set):{autoNext:true,autoPlay:true,defaultTrack:'sub',notifSound:false,haptics:true,theme:'dark'};
    const ls=localStorage.getItem(STORAGE_KEYS.LAST_SERVER+'_'+n);lastServerMap=ls?JSON.parse(ls):{};
  } catch(e){}
  try { const sh=localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY); searchHistory=sh?JSON.parse(sh):[]; } catch(e){}
  try { const c=localStorage.getItem(STORAGE_KEYS.COMMENTS); comments=c?JSON.parse(c):{};} catch(e){}
  try { const nn=localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS); notifications=nn?JSON.parse(nn):_getDefaultNotifications(); } catch(e){ notifications=_getDefaultNotifications(); }
  try { const sk=localStorage.getItem(STORAGE_KEYS.INTROSKIP+'_'+n); introSkips=sk?JSON.parse(sk):{}; } catch(e){}
}
function _saveUsers()    { try{localStorage.setItem(STORAGE_KEYS.USERS,JSON.stringify(users));}catch(e){} }
function _saveSession()  { try{localStorage.setItem(STORAGE_KEYS.SESSION,JSON.stringify(currentUser));}catch(e){} }
function _clearSession() { try{localStorage.removeItem(STORAGE_KEYS.SESSION);}catch(e){} }
function saveHistory()   { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.HISTORY+'_'+currentUser.username,JSON.stringify(watchHistory));}catch(e){} }
function saveRatings()   { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.RATINGS+'_'+currentUser.username,JSON.stringify(ratings));}catch(e){} }
function saveFavorites() { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.FAVORITES+'_'+currentUser.username,JSON.stringify(favorites));}catch(e){} }
function saveProgress()  { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.PROGRESS+'_'+currentUser.username,JSON.stringify(epProgress));}catch(e){} }
function saveAnimeLists(){ if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.ANIMELISTS+'_'+currentUser.username,JSON.stringify(animeLists));}catch(e){} }
function saveAvatar()    { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.AVATAR+'_'+currentUser.username,JSON.stringify(userAvatar));}catch(e){} }
function saveStreak()    { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.STREAK+'_'+currentUser.username,JSON.stringify(watchStreak));}catch(e){} }
function saveComments()      { try{localStorage.setItem(STORAGE_KEYS.COMMENTS,JSON.stringify(comments));}catch(e){} }
function saveNotifications() { try{localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS,JSON.stringify(notifications));}catch(e){} }
function saveIntroSkips()    { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.INTROSKIP+'_'+currentUser.username,JSON.stringify(introSkips));}catch(e){} }

function seedDemoUser() {
  if(!users.find(u=>u.username==='demo')) { users.push({username:'demo',email:'demo@animewatch.com',password:'demo123'}); _saveUsers(); }
}
function demoLogin() {
  const res = login('demo','demo123');
  if(res.success){
    showToast('Welcome, demo user! 👋');
    navigateToPage('home');
    if(typeof renderHomePage==='function') renderHomePage();
    if(typeof updateBellVisibility==='function') updateBellVisibility();
  }
}
function isLoggedIn() { return currentUser!==null; }

// ── Streak ──
function updateStreakOnWatch() {
  if(!isLoggedIn()) return;
  const today=new Date().toDateString(), last=watchStreak.lastDate;
  if(last===today) return;
  const yesterday=new Date(Date.now()-86400000).toDateString();
  watchStreak.count = last===yesterday ? watchStreak.count+1 : 1;
  watchStreak.lastDate=today;
  saveStreak();
}
function getStreak() { return watchStreak.count||0; }

// ── Level ──
function getUserLevel(epCount) {
  let lv=LEVELS[0];
  for(const l of LEVELS) if(epCount>=l.min) lv=l;
  return lv;
}
function getLevelProgress(epCount) {
  for(let i=LEVELS.length-1;i>=0;i--) {
    if(epCount>=LEVELS[i].min) {
      const next=LEVELS[i+1];
      if(!next) return 100;
      return Math.min(100,Math.round(((epCount-LEVELS[i].min)/(next.min-LEVELS[i].min))*100));
    }
  }
  return 0;
}

// ── Avatar ──
function getUserAvatar() { return userAvatar ? AVATARS.find(a=>a.id===userAvatar)||AVATARS[0] : null; }
function setUserAvatar(id) { userAvatar=id; saveAvatar(); updateProfileUI(); showToast('Avatar updated! 🎭'); }

// ── Auth ──
function login(usernameOrEmail, password) {
  const user=users.find(u=>(u.username===usernameOrEmail||u.email===usernameOrEmail)&&u.password===password);
  if(user) {
    currentUser={username:user.username,email:user.email};
    _saveSession(); _loadUserData(user.username); updateStreakOnWatch(); updateProfileUI();
    return {success:true};
  }
  return {success:false,message:'Invalid username or password'};
}
function signup(username, email, password) {
  if(users.find(u=>u.username===username)) return {success:false,message:'Username already taken'};
  if(users.find(u=>u.email===email))       return {success:false,message:'Email already registered'};
  users.push({username,email,password}); _saveUsers();
  currentUser={username,email};
  watchHistory=[];ratings={};favorites={};epProgress={};
  animeLists={watching:[],planToWatch:[],completed:[],onHold:[],dropped:[]};
  userAvatar=null; watchStreak={count:0,lastDate:null};
  userBio=''; pinnedAnime=[]; lastServerMap={}; searchHistory=[];
  userSettings={autoNext:true,autoPlay:true,defaultTrack:'sub',notifSound:false,haptics:true,theme:'dark'};
  notifications=_getDefaultNotifications(); saveNotifications();
  _saveSession(); updateProfileUI();
  return {success:true};
}
function logout() {
  currentUser=null; watchHistory=[];ratings={};favorites=[];epProgress={};comments={};
  animeLists={watching:[],planToWatch:[],completed:[],onHold:[],dropped:[]};
  userAvatar=null; watchStreak={count:0,lastDate:null};
  userBio=''; pinnedAnime=[]; lastServerMap={}; searchHistory=[];
  _clearSession(); updateProfileUI();
  showToast('Logged out successfully'); navigateToPage('home');
}

// ── Profile UI ──
function updateProfileUI() {
  const profileText=document.getElementById('profileText');
  const profileAvatar=document.getElementById('profileAvatar');
  const dropdownUser=document.getElementById('dropdownUser');
  const profileChevron=document.getElementById('profileChevron');
  if(isLoggedIn()) {
    const av=getUserAvatar();
    if(av){
      const fb = av.fallback || av.img;
      profileAvatar.innerHTML=`<img src="${av.img}" alt="${av.label}" onerror="this.src='${fb}'" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />`;
      profileAvatar.style.background=av.bg;
      profileAvatar.style.fontSize='0.85rem';
      profileAvatar.style.overflow='hidden';
      profileAvatar.style.padding='0';
    } else {
      profileAvatar.innerHTML=currentUser.username.charAt(0).toUpperCase();
      profileAvatar.style.background='var(--accent)';
      profileAvatar.style.fontSize='0.85rem';
    }
    profileText.textContent=currentUser.username;
    if(profileChevron) profileChevron.style.display='inline';
    const lv=getUserLevel(watchHistory.length);
    if(dropdownUser) dropdownUser.innerHTML=`<strong>${currentUser.username}</strong><span style="color:${lv.color};font-size:0.75rem;font-weight:700">${lv.label}</span><span style="color:var(--text3);font-size:0.76rem">${currentUser.email}</span>`;
  } else {
    profileText.textContent='Login'; profileAvatar.innerHTML='?';
    profileAvatar.style.background='var(--surface2)'; profileAvatar.style.fontSize='0.85rem';
    if(profileChevron) profileChevron.style.display='none';
    if(dropdownUser) dropdownUser.innerHTML='';
  }
}
function requireAuth(page) { return protectedPages.includes(page); }

// ── History ──
function addToHistory(animeSlug, episodeIndex) {
  if(!isLoggedIn()) return;
  watchHistory=watchHistory.filter(i=>!(i.slug===animeSlug&&i.episodeIndex===episodeIndex));
  watchHistory.unshift({slug:animeSlug,episodeIndex,timestamp:new Date().toISOString()});
  if(watchHistory.length>100) watchHistory=watchHistory.slice(0,100);
  saveHistory(); updateStreakOnWatch(); checkAchievements();
  // Trigger level-up check and daily challenge update
  setTimeout(()=>{
    if(typeof checkLevelUp==='function') checkLevelUp();
    if(typeof renderDailyChallenge==='function') renderDailyChallenge();
    if(typeof checkWatchingListNotifications==='function') checkWatchingListNotifications();
  },300);
}
function getWatchHistory() { return watchHistory; }

// ── Ratings ──
function rateAnime(slug, stars) {
  if(!isLoggedIn()){showToast('Login to rate anime','error');return;}
  ratings[slug]=stars; saveRatings(); checkAchievements();
}
function getUserRating(slug) { return ratings[slug]||0; }

// ── Favorites ──
function toggleFavorite(slug) {
  if(!isLoggedIn()){showToast('Login to save favorites','error');return false;}
  const idx=favorites.indexOf(slug);
  if(idx===-1){favorites.push(slug);saveFavorites();showToast('Added to My List ❤️');checkAchievements();return true;}
  else{favorites.splice(idx,1);saveFavorites();showToast('Removed from My List');return false;}
}
function isFavorite(slug) { return favorites.includes(slug); }
function getFavorites()   { return [...favorites]; }

// Aliases used by slideshow.js and player.js
function toggleMyList(slug) { return toggleFavorite(slug); }
function getMyList()        { return getFavorites(); }

// ── Progress ──
function setEpProgress(slug,epIndex,percent){ if(!isLoggedIn())return; epProgress[`${slug}-${epIndex}`]=Math.round(percent); saveProgress(); }
function getEpProgress(slug,epIndex){ return epProgress[`${slug}-${epIndex}`]||0; }

// ── Anime Lists ──
function getAnimeListStatus(slug) {
  for(const [key,list] of Object.entries(animeLists)) if(list.find(e=>e.slug===slug)) return key;
  return null;
}
function setAnimeListStatus(slug, status) {
  if(!isLoggedIn()){showToast('Login to manage lists','error');return;}
  for(const key of Object.keys(animeLists)) animeLists[key]=animeLists[key].filter(e=>e.slug!==slug);
  if(status&&animeLists[status]){ animeLists[status].push({slug,addedAt:new Date().toISOString()}); showToast(`Added to ${LIST_NAMES[status]} ✅`); }
  saveAnimeLists(); checkAchievements();
}
function getAnimeList(status){ return animeLists[status]||[]; }

// ── Comments ──
function getComments(slug){ return comments[slug]||[]; }
function addComment(slug,text) {
  if(!isLoggedIn()){showToast('Login to comment','error');return false;}
  text=text.trim();
  if(!text||text.length<2){showToast('Comment too short','error');return false;}
  if(text.length>500){showToast('Max 500 characters','error');return false;}
  if(!comments[slug]) comments[slug]=[];
  const av=getUserAvatar();
  comments[slug].unshift({user:currentUser.username,avatarEmoji:av?av.emoji:currentUser.username.charAt(0).toUpperCase(),avatarBg:av?av.bg:'#e63946',text,date:new Date().toISOString()});
  saveComments(); return true;
}
function deleteComment(slug,index){
  if(!isLoggedIn()||!comments[slug]) return;
  const c=comments[slug][index];
  if(!c||c.user!==currentUser.username) return;
  comments[slug].splice(index,1); saveComments();
}

// ── Achievements ──
function checkAchievements(){
  if(!isLoggedIn()) return;
  const saved=JSON.parse(localStorage.getItem('aw_achievements_'+currentUser.username)||'[]');
  const stats=getProfileStats();
  const newUnlocks=[];
  for(const ach of ACHIEVEMENTS){ if(!saved.includes(ach.id)&&ach.check(stats)){ saved.push(ach.id); newUnlocks.push(ach); } }
  if(newUnlocks.length){ localStorage.setItem('aw_achievements_'+currentUser.username,JSON.stringify(saved)); newUnlocks.forEach(a=>setTimeout(()=>showToast(`🏆 Achievement: ${a.label}!`),600)); }
}
function getUnlockedAchievements(){ if(!isLoggedIn())return []; return JSON.parse(localStorage.getItem('aw_achievements_'+currentUser.username)||'[]'); }

// ── Stats ──
function getProfileStats(){
  if(!isLoggedIn()) return {uniqueAnime:0,totalEps:0,avgRating:'—',favCount:0,topGenre:'—',completedProgress:0,totalRatings:0,streak:0,moviesWatched:0,completedList:0,todayEps:0};
  const history=getWatchHistory();
  const uniqueAnime=new Set(history.map(h=>h.slug)).size;
  const totalEps=history.length;
  const ratingsList=Object.values(ratings);
  const avgRating=ratingsList.length?(ratingsList.reduce((a,b)=>a+b,0)/ratingsList.length).toFixed(1):'—';
  const favCount=favorites.length;
  const genreCounts={};
  let moviesWatched=0;
  const today=new Date().toDateString();
  let todayEps=0;
  history.forEach(h=>{
    const anime=typeof animeData!=='undefined'?animeData.find(a=>a.slug===h.slug):null;
    if(anime){ anime.genre.forEach(g=>{genreCounts[g]=(genreCounts[g]||0)+1;}); if(anime.type==='movie') moviesWatched++; }
    if(new Date(h.timestamp).toDateString()===today) todayEps++;
  });
  const topGenre=Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  const completedProgress=Object.values(epProgress).filter(p=>p>=90).length;
  const completedList=(animeLists.completed||[]).length;
  const streak=getStreak();
  const genreSet=new Set(); history.forEach(h=>{const a=typeof animeData!=='undefined'?animeData.find(x=>x.slug===h.slug):null;if(a)a.genre.forEach(g=>genreSet.add(g));});
  const genreCount=genreSet.size;
  const hour=new Date().getHours();
  const nightWatch=history.filter(h=>new Date(h.timestamp).getHours()>=0&&new Date(h.timestamp).getHours()<4).length;
  // session eps: eps watched in last hour
  const sessionEps=history.filter(h=>(Date.now()-new Date(h.timestamp).getTime())<3600000).length;
  return {uniqueAnime,totalEps,avgRating,favCount,topGenre,completedProgress,totalRatings:ratingsList.length,streak,moviesWatched,completedList,todayEps,genreCount,nightWatch,sessionEps,
    hasBio: userBio && userBio.length>5,
    hasPinned: pinnedAnime && pinnedAnime.length>0,
    hasWatchParty: !!localStorage.getItem('aw_watchparty_used'),
  };
}

// ── Notifications ──
function _getDefaultNotifications() {
  // Build notifications from actual anime data so episode numbers are always accurate
  const notifs = [];
  // Welcome notification always first
  notifs.push({id:'n_welcome', type:'system', title:'Welcome to AnimeWatch! 🎌', msg:'Your account is ready. Start exploring anime now!', time: Date.now()-3600000*24, read:true, slug:null});
  // Generate real episode notifications from anime that have episodes
  if(typeof animeData !== 'undefined') {
    const withEps = animeData.filter(a => a.episodes && a.episodes.length > 0).slice(0, 4);
    withEps.forEach((anime, i) => {
      const epCount = anime.episodes.length;
      const lastEp = anime.episodes[epCount - 1];
      notifs.unshift({
        id: 'n_ep_' + anime.slug,
        type: 'new_ep',
        title: anime.title,
        msg: `${lastEp.name} is now available! (${epCount} episode${epCount>1?'s':''} total)`,
        time: Date.now() - 3600000 * (i * 3 + 1),
        read: false,
        slug: anime.slug
      });
    });
  }
  return notifs;
}
function getNotifications()  { return notifications; }
function getUnreadCount()    { return notifications.filter(n=>!n.read).length; }
function markAllRead()       { notifications.forEach(n=>n.read=true); saveNotifications(); updateBellBadge(); renderBellDropdown && renderBellDropdown(); }
function markRead(id)        { const n=notifications.find(x=>x.id===id); if(n){n.read=true;saveNotifications();updateBellBadge();} }
function clearNotifications(){ notifications=[]; saveNotifications(); updateBellBadge(); }
function updateBellBadge() {
  const badge=document.getElementById('bellBadge');
  const count=getUnreadCount();
  if(badge){ badge.textContent=count; badge.style.display=count>0?'flex':'none'; }
}

// ── Intro Skip ──
function setIntroSkip(slug, epIndex, seconds) {
  if(!isLoggedIn()) return;
  introSkips[slug+'-'+epIndex] = seconds;
  saveIntroSkips();
  showToast('Intro skip set at '+seconds+'s ✅');
}
function getIntroSkip(slug, epIndex) { return introSkips[slug+'-'+epIndex]||null; }

// ── Password toggle ──
function togglePassword(inputId,btn){
  const input=document.getElementById(inputId);
  if(input.type==='password'){input.type='text';btn.innerHTML='<i class="fas fa-eye-slash"></i>';}
  else{input.type='password';btn.innerHTML='<i class="fas fa-eye"></i>';}
}

// ── Auth Listeners ──
function setupAuthListeners(){
  loadFromStorage(); seedDemoUser();
  document.getElementById('profileBtn').addEventListener('click',()=>{
    if(isLoggedIn()) document.getElementById('profileDropdown').classList.toggle('show');
    else navigateToPage('login');
  });
  document.getElementById('logoutBtn').addEventListener('click',()=>{ document.getElementById('profileDropdown').classList.remove('show'); logout(); });
  document.addEventListener('click',e=>{ const ps=document.querySelector('.profile-section'); if(ps&&!ps.contains(e.target)) document.getElementById('profileDropdown').classList.remove('show'); });
  document.getElementById('showLoginBtn').addEventListener('click',()=>{ document.getElementById('loginForm').style.display='flex'; document.getElementById('signupForm').style.display='none'; document.getElementById('showLoginBtn').classList.add('active'); document.getElementById('showSignupBtn').classList.remove('active'); const le=document.getElementById('loginError'); if(le) le.textContent=''; });
  document.getElementById('showSignupBtn').addEventListener('click',()=>{ document.getElementById('loginForm').style.display='none'; document.getElementById('signupForm').style.display='flex'; document.getElementById('showSignupBtn').classList.add('active'); document.getElementById('showLoginBtn').classList.remove('active'); const se=document.getElementById('signupError'); if(se) se.textContent=''; });
  document.getElementById('loginForm').addEventListener('submit',e=>{ e.preventDefault(); const u=document.getElementById('loginUsername').value.trim(),p=document.getElementById('loginPassword').value,errEl=document.getElementById('loginError'); errEl.textContent=''; if(!u||!p){errEl.textContent='Please fill all fields';return;} const res=login(u,p); if(res.success){showToast(`Welcome back, ${currentUser.username}! 👋`);navigateToPage('home');renderHomePage();}else errEl.textContent=res.message; });
  document.getElementById('signupForm').addEventListener('submit',e=>{ e.preventDefault(); const username=document.getElementById('signupUsername').value.trim(),email=document.getElementById('signupEmail').value.trim(),password=document.getElementById('signupPassword').value,confirm=document.getElementById('signupConfirmPassword').value,errEl=document.getElementById('signupError'); errEl.textContent=''; if(password!==confirm){errEl.textContent='Passwords do not match';return;} if(password.length<6){errEl.textContent='Password must be at least 6 characters';return;} if(username.length<3){errEl.textContent='Username must be at least 3 characters';return;} const res=signup(username,email,password); if(res.success){showToast(`Welcome, ${username}! 🎉`);navigateToPage('home');}else errEl.textContent=res.message; });
}

// ── New save functions ──
function saveBio()         { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.BIO+'_'+currentUser.username,userBio);}catch(e){} }
function savePinned()      { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.PINNED+'_'+currentUser.username,JSON.stringify(pinnedAnime));}catch(e){} }
function saveSettings()    { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.SETTINGS+'_'+currentUser.username,JSON.stringify(userSettings));}catch(e){} }
function saveLastServer()  { if(!currentUser)return; try{localStorage.setItem(STORAGE_KEYS.LAST_SERVER+'_'+currentUser.username,JSON.stringify(lastServerMap));}catch(e){} }
function saveSearchHistory(){ try{localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY,JSON.stringify(searchHistory.slice(0,10)));}catch(e){} }

// ── Bio ──
function getUserBio()   { return userBio; }
function setUserBio(bio){ userBio=bio.slice(0,80); saveBio(); checkAchievements(); }

// ── Pinned Anime ──
function getPinnedAnime()  { return pinnedAnime; }
function togglePinAnime(slug){
  if(!isLoggedIn()){showToast('Login to pin anime','error');return;}
  const idx=pinnedAnime.indexOf(slug);
  if(idx===-1){
    if(pinnedAnime.length>=3){showToast('Max 3 pinned anime','error');return;}
    pinnedAnime.push(slug); showToast('📌 Pinned to profile!'); checkAchievements();
  } else { pinnedAnime.splice(idx,1); showToast('Unpinned'); }
  savePinned();
}
function isPinned(slug){ return pinnedAnime.includes(slug); }

// ── Settings ──
function getSettings()   { return userSettings; }
function updateSetting(key,val){
  userSettings[key]=val; saveSettings();
  if(key==='theme') applyAccentColor(); // refresh if needed
}

// ── Last Server Memory ──
function rememberServer(slug,serverName){ lastServerMap[slug]=serverName; saveLastServer(); }
function getLastServer(slug){ return lastServerMap[slug]||null; }

// ── Search History ──
function addSearchHistory(q){
  if(!q||q.length<2) return;
  searchHistory=searchHistory.filter(s=>s!==q);
  searchHistory.unshift(q);
  searchHistory=searchHistory.slice(0,8);
  saveSearchHistory();
}
function getSearchHistory(){ return searchHistory; }
function clearSearchHistory(){ searchHistory=[]; saveSearchHistory(); }

// ── Smart Notification Trigger ──
// Called when new episodes are added or simulated (call this when you add episodes to data.js)
function checkWatchingListNotifications(){
  if(!isLoggedIn()) return;
  const watching=getAnimeList('watching');
  watching.forEach(entry=>{
    const anime=typeof animeData!=='undefined'?animeData.find(a=>a.slug===entry.slug):null;
    if(!anime||anime.episodes.length===0) return;
    const lastEp=anime.episodes[anime.episodes.length-1];
    const notifId='ep_notif_'+anime.slug+'_'+lastEp.id;
    if(!notifications.find(n=>n.id===notifId)){
      addNotification(anime.title, `New: ${lastEp.name}`, anime.slug, notifId);
    }
  });
}
function addNotification(title,msg,slug=null,customId=null){
  const id=customId||('n'+Date.now());
  if(notifications.find(n=>n.id===id)) return; // no duplicates
  notifications.unshift({id,type:slug?'new_ep':'system',title,msg,time:Date.now(),read:false,slug});
  if(notifications.length>50) notifications=notifications.slice(0,50);
  saveNotifications(); updateBellBadge();
  // Play sound if opted in
  if(userSettings.notifSound) playNotifSound();
}

// ── Notification Sound ──
function playNotifSound(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(); const gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440,ctx.currentTime+0.15);
    gain.gain.setValueAtTime(0.15,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.3);
  } catch(e){}
}

// ── Haptic Feedback ──
function haptic(pattern=[30]){
  if(!userSettings.haptics) return;
  if(navigator.vibrate) navigator.vibrate(pattern);
}

// ── Daily Watch Challenge ──
function getDailyChallenge(){
  const today=new Date().toDateString();
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE+'_'+(currentUser?.username||'guest'))||'{}');
    if(saved.date===today) return saved;
  } catch(e){}
  return {date:today, completed:false, goal:1};
}
function completeDailyChallenge(){
  if(!isLoggedIn()) return;
  const ch=getDailyChallenge();
  const todayEps=watchHistory.filter(h=>new Date(h.timestamp).toDateString()===new Date().toDateString()).length;
  if(todayEps>=ch.goal && !ch.completed){
    ch.completed=true;
    localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE+'_'+currentUser.username,JSON.stringify(ch));
    showToast('🎯 Daily Challenge Complete! +XP');
    addNotification('Daily Challenge','You completed today\'s watch challenge! 🎯',null);
    return true;
  }
  return false;
}

// ── Data Export / Import ──
function exportUserData(){
  if(!isLoggedIn()){showToast('Login first','error');return;}
  const data={
    username:currentUser.username, email:currentUser.email,
    exportDate:new Date().toISOString(), version:'1.0',
    watchHistory, ratings, favorites, epProgress,
    animeLists, userBio, pinnedAnime, userSettings, watchStreak,
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`animewatch_${currentUser.username}_backup.json`;
  a.click(); URL.revokeObjectURL(a.href);
  showToast('📦 Data exported!');
}
function importUserData(jsonString){
  if(!isLoggedIn()){showToast('Login first','error');return false;}
  try{
    const data=JSON.parse(jsonString);
    if(data.watchHistory) { watchHistory=data.watchHistory; saveHistory(); }
    if(data.ratings)      { ratings=data.ratings; saveRatings(); }
    if(data.favorites)    { favorites=data.favorites; saveFavorites(); }
    if(data.epProgress)   { epProgress=data.epProgress; saveProgress(); }
    if(data.animeLists)   { animeLists=data.animeLists; saveAnimeLists(); }
    if(data.userBio)      { userBio=data.userBio; saveBio(); }
    if(data.pinnedAnime)  { pinnedAnime=data.pinnedAnime; savePinned(); }
    showToast('✅ Data imported successfully!');
    return true;
  } catch(e){ showToast('Invalid backup file','error'); return false; }
}

// ── Accent Color ──
const ACCENT_COLORS = {
  red:    {accent:'#e63946', teal:'#2ec4b6', gold:'#f1c40f'},
  teal:   {accent:'#2ec4b6', teal:'#e63946', gold:'#f1c40f'},
  purple: {accent:'#8b5cf6', teal:'#2ec4b6', gold:'#f1c40f'},
  blue:   {accent:'#3b82f6', teal:'#2ec4b6', gold:'#f1c40f'},
  orange: {accent:'#f97316', teal:'#2ec4b6', gold:'#f1c40f'},
  pink:   {accent:'#ec4899', teal:'#2ec4b6', gold:'#f1c40f'},
  green:  {accent:'#22c55e', teal:'#2ec4b6', gold:'#f1c40f'},
  gold:   {accent:'#f1c40f', teal:'#2ec4b6', gold:'#e63946'},
};
function applyAccentColor(){
  const saved=localStorage.getItem(STORAGE_KEYS.ACCENT)||'red';
  const colors=ACCENT_COLORS[saved]||ACCENT_COLORS.red;
  const root=document.documentElement;
  root.style.setProperty('--accent',colors.accent);
  root.style.setProperty('--teal',colors.teal);
  root.style.setProperty('--gold',colors.gold);
}
function setAccentColor(name){
  localStorage.setItem(STORAGE_KEYS.ACCENT,name);
  applyAccentColor();
  showToast(`🎨 Accent: ${name}`);
}
function getAccentColor(){ return localStorage.getItem(STORAGE_KEYS.ACCENT)||'red'; }

// ── Profile completion ──
function getProfileCompletion(){
  if(!isLoggedIn()) return 0;
  let score=0; const max=5;
  if(userAvatar) score++;
  if(userBio && userBio.length>5) score++;
  if(Object.keys(ratings).length>=5) score++;
  if(pinnedAnime.length>0) score++;
  if(watchHistory.length>=3) score++;
  return Math.round((score/max)*100);
}

// ── Extended Profile Stats (for hidden achievements) ──
const _origGetProfileStats = typeof getProfileStats==='function'?getProfileStats:null;
