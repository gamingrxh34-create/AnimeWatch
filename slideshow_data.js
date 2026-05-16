// ═══════════════════════════════════════════════════════════════════
// ANIMEWATCH — Slideshow & Trending Configuration
// ═══════════════════════════════════════════════════════════════════
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  HERO SLIDESHOW                                                 │
// │  Each slide needs: slug (must match animeData), and optionally │
// │  a custom banner image URL. If no banner, uses anime cover.    │
// └─────────────────────────────────────────────────────────────────┘
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  HOW TO ADD/CHANGE SLIDES:                                      │
// │  1. Add an entry to heroSlides below                            │
// │  2. Set slug to match the anime slug in data.js                 │
// │  3. Set banner to any image URL you want as the background      │
// │     (use a wide/landscape image, min 1280×720 recommended)     │
// │  4. Leave banner as "" to use the anime cover image             │
// └─────────────────────────────────────────────────────────────────┘

const heroSlides = [
  {
    slug:   "attack-on-titan",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778839426/Gemini_Generated_Image_g8wyi5g8wyi5g8wy_crn5lg.png",
    // ^ Replace with your own image URL
  },
  {
    slug:   "witch-hat-atelier",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778844089/Gemini_Generated_Image_3ekra53ekra53ekr_dvvdln.png",
  },
  {
    slug:   "your-name",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778845517/Gemini_Generated_Image_j4z6eaj4z6eaj4z6_hckpif.png",
  },
  {
    slug:   "solo-leveling",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778846373/Gemini_Generated_Image_w6oq5yw6oq5yw6oq_q8mg0n.png",   // Will use anime cover
  },
  {
    slug:   "i-want-to-eat-your-pancreas",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778846866/Gemini_Generated_Image_50byyq50byyq50by_bgx4ae.png",
  },
  {
    slug:   "your-lie-in-april",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778848080/Gemini_Generated_Image_quxfybquxfybquxf_ysfjdd.png",
    
  },
  {
    slug:   "vinland-saga",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778848218/Gemini_Generated_Image_pr4a2jpr4a2jpr4a_z9iccq.png",
  },
  {
    slug:   "a-silent-voice",
    banner: "https://res.cloudinary.com/ditotijr4/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1778848619/Gemini_Generated_Image_rgdd8rgdd8rgdd8r_q5xkhg.png",
  },
];

// ┌─────────────────────────────────────────────────────────────────┐
// │  LOGIN PAGE — Left Panel Custom Photo                           │
// │  Set loginBannerImage to any image URL you want on the         │
// │  left side of the login / sign-up page.                        │
// │  Recommended: tall/portrait or cinematic image, min 800×1000   │
// └─────────────────────────────────────────────────────────────────┘
const loginBannerImage = "https://res.cloudinary.com/ditotijr4/image/upload/w_800,h_1080,c_fill,q_auto,f_auto/v1778838275/ChatGPT_Image_May_15_2026_03_13_53_PM_yi2uvt.png";
// ^ Replace with your own image URL

// ┌─────────────────────────────────────────────────────────────────┐
// │  TOP TRENDING — Custom list shown in sidebar on home page       │
// │  Each entry needs: slug (must match animeData)                  │
// │  Leave empty [] to auto-generate from malScore.                 │
// └─────────────────────────────────────────────────────────────────┘
const customTrending = [
  // { slug: "attack-on-titan" },
  // { slug: "death-note" },
  // Add more here, or leave empty for auto
];
