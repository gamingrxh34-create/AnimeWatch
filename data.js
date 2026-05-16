// ═══════════════════════════════════════════════════════════════════
// ANIMEWATCH — Anime Data
// ═══════════════════════════════════════════════════════════════════
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  HOW TO ADD A NEW SEASON (e.g. Attack on Titan Season 3)       │
// │                                                                 │
// │  1. Copy the Season 2 entry below as a template                │
// │  2. Change: slug, title, cover, synopsis, aired, seasonNumber, │
// │             seasonLabel, and the episodes array                 │
// │  3. Keep: seriesGroup EXACTLY the same as the other seasons    │
// │     e.g.  seriesGroup: "attack-on-titan"  ← same for ALL AoT  │
// │                                                                 │
// │  That's it! The Seasons tab in the watch page will auto-show   │
// │  all entries that share the same seriesGroup, sorted by        │
// │  seasonNumber.                                                  │
// │                                                                 │
// │  Each season gets its OWN CARD on the browse/home pages.       │
// └─────────────────────────────────────────────────────────────────┘
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  HOW TO ADD SERVERS TO AN EPISODE                               │
// │  servers: {                                                     │
// │    sub: [{ name: "GDrive", url: "https://..." }, ...],         │
// │    dub: [{ name: "GDrive", url: "https://..." }, ...]          │
// │  }                                                              │
// │  Leave url: "" if the link is not ready yet.                   │
// └─────────────────────────────────────────────────────────────────┘
//
// ═══════════════════════════════════════════════════════════════════

const animeData = [

  // ─────────────────────────────────────────────────────────────
  // ATTACK ON TITAN
  // ─────────────────────────────────────────────────────────────
  {
    title: "Attack On Titan",
    slug: "attack-on-titan",
    trailerId: "LHtdKWJdif4",
    genre: ["Action", "Drama", "Fantasy", "Military"],
    type: "series",
    cover: "https://static.anikai.to/6d/i/b/79/67664a45311fc.jpg",
    synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans. Eren Yeager vows to take revenge after a devastating attack on his hometown.",
    malScore: 9.0,
    status: "Completed",
    aired: "Apr 7, 2013",
    duration: "24 min/ep",
    studio: "Wit Studio / MAPPA",
    // ── Series Group: links this to other seasons ──
    // All seasons sharing the same seriesGroup appear in the Seasons tab
    seriesGroup: "attack-on-titan",   // same for ALL AoT seasons
    seasonNumber: 1,                   // which season this card is
    seasonLabel:  "Season 1",         // label shown in the Seasons tab
    seasons: [
      {
        id: 1,
        name: "Season 1",
        episodes: [
          {
            id: 3301,
            name: "Episode 1 - To You, 2000 Years From Now",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3302,
            name: "Episode 2 - That Day",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3303,
            name: "Episode 3 - A Dim Light Amid Despair",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1-sovYmwg_E9g3OqZFlo6-bwlzo8cmuZO/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1FNrbIKi8LW-OE0PeImzEeCBaO4s-w2pg/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3304,
            name: "Episode 4 - The Night of the Closing Ceremony",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1qmBponq5m5bb5EyfrnMMUQTZM_vZJTnd/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1b_t1vd4A7t7jpcL2l6gEFBzzfGzjtock/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3305,
            name: "Episode 5 - First Battle: The Struggle for Trost",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1vkTDdVHdKVSipa-TmPTJtsylubNy9jzt/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1afx4EZ8nves5yq7BKycvT5qqRY3vSdff/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3306,
            name: "Episode 6 - The World the Girl Saw",
            servers: {
              sub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/13FCikuhBGwfmUPmbrpQHNN5_4yrY2Hiz/preview" },
                { name: "Server 3", url: "" }
              ],
              dub: [
                { name: "GDrive",   url: "https://drive.google.com/file/d/1AxjqGMgKUDW0ulWhmE-atmygb3TWgvne/preview" },
                { name: "Server 3", url: "" }
              ]
            }
          },
          {
            id: 3307,
            name: "Episode 7 - Small Blade: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3308,
            name: "Episode 8 - I Can Hear His Heartbeat: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3309,
            name: "Episode 9 - Whereabouts of His Left Arm: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3310,
            name: "Episode 10 - Response: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3311,
            name: "Episode 11 - Idol: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3312,
            name: "Episode 12 - Wound: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3313,
            name: "Episode 13 - Primal Desire: The Struggle for Trost",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3314,
            name: "Episode 14 - Can't Look into His Eyes Yet: Eve of the Counterattack",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3315,
            name: "Episode 15 - Special Ops Squad: Eve of the Counterattack",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3316,
            name: "Episode 16 - What Needs to Be Done Now: Eve of the Counterattack",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3317,
            name: "Episode 17 - Female Titan: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3318,
            name: "Episode 18 - Forest of Giant Trees: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3319,
            name: "Episode 19 - Bite: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3320,
            name: "Episode 20 - Erwin Smith: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3321,
            name: "Episode 21 - Crushing Blow: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3322,
            name: "Episode 22 - The Defeated: The 57th Exterior Scouting Mission",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3323,
            name: "Episode 23 - Smile: Prelude to the Counterattack",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3324,
            name: "Episode 24 - The Titan's Son: Closing Ceremony",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          },
          {
            id: 3325,
            name: "Episode 25 - Wall: Assault on Stohess",
            servers: {
              sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
              dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
            }
          }
        ]
      }
    ],
    episodes: [
      {
        id: 3301,
        name: "S1 E1 - To You, 2000 Years From Now",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" }
          ]
        }
      },
      {
        id: 3302,
        name: "S1 E2 - That Day",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview" }
          ]
        }
      },
      {
        id: 3303,
        name: "S1 E3 - A Dim Light Amid Despair",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1-sovYmwg_E9g3OqZFlo6-bwlzo8cmuZO/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1-sovYmwg_E9g3OqZFlo6-bwlzo8cmuZO/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1-sovYmwg_E9g3OqZFlo6-bwlzo8cmuZO/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1FNrbIKi8LW-OE0PeImzEeCBaO4s-w2pg/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1FNrbIKi8LW-OE0PeImzEeCBaO4s-w2pg/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1FNrbIKi8LW-OE0PeImzEeCBaO4s-w2pg/preview" }
          ]
        }
      },
      {
        id: 3304,
        name: "S1 E4 - Night of the Closing Ceremony",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1qmBponq5m5bb5EyfrnMMUQTZM_vZJTnd/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1qmBponq5m5bb5EyfrnMMUQTZM_vZJTnd/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1qmBponq5m5bb5EyfrnMMUQTZM_vZJTnd/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1b_t1vd4A7t7jpcL2l6gEFBzzfGzjtock/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1b_t1vd4A7t7jpcL2l6gEFBzzfGzjtock/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1b_t1vd4A7t7jpcL2l6gEFBzzfGzjtock/preview" }
          ]
        }
      },
      {
        id: 3305,
        name: "S1 E5 - First Battle: The Struggle for Trost",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1vkTDdVHdKVSipa-TmPTJtsylubNy9jzt/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1vkTDdVHdKVSipa-TmPTJtsylubNy9jzt/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1vkTDdVHdKVSipa-TmPTJtsylubNy9jzt/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1afx4EZ8nves5yq7BKycvT5qqRY3vSdff/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1afx4EZ8nves5yq7BKycvT5qqRY3vSdff/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1afx4EZ8nves5yq7BKycvT5qqRY3vSdff/preview" }
          ]
        }
      },
      {
        id: 3306,
        name: "S1 E6 - The World the Girl Saw",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/13FCikuhBGwfmUPmbrpQHNN5_4yrY2Hiz/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/13FCikuhBGwfmUPmbrpQHNN5_4yrY2Hiz/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/13FCikuhBGwfmUPmbrpQHNN5_4yrY2Hiz/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1AxjqGMgKUDW0ulWhmE-atmygb3TWgvne/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1AxjqGMgKUDW0ulWhmE-atmygb3TWgvne/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1AxjqGMgKUDW0ulWhmE-atmygb3TWgvne/preview" }
          ]
        }
      },
      {
        id: 3307,
        name: "S1 E7 - Small Blade: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1dS6ZWm345k3CaPc3LdPONRmriYLjyNVK/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1dS6ZWm345k3CaPc3LdPONRmriYLjyNVK/preview" },
              { name: "Server 3", url: "https://drive.google.com/file/d/1dS6ZWm345k3CaPc3LdPONRmriYLjyNVK/preview" }],

          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1VpI3VRq06ClPZuxhLbdLG3KMXUtLKqfE/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1VpI3VRq06ClPZuxhLbdLG3KMXUtLKqfE/preview" },
              { name: "Server 3", url: "https://drive.google.com/file/d/1VpI3VRq06ClPZuxhLbdLG3KMXUtLKqfE/preview" }
            ]
        }
      },
      {
        id: 3308,
        name: "S1 E8 - I Can Hear His Heartbeat: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1r9N2C7-TKMiPdHUZMGgiOaeCAKqyA-p9/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1r9N2C7-TKMiPdHUZMGgiOaeCAKqyA-p9/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1r9N2C7-TKMiPdHUZMGgiOaeCAKqyA-p9/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1qXgovcBbucDkNqwv4jplcMTi7bMJEGO1/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1qXgovcBbucDkNqwv4jplcMTi7bMJEGO1/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1qXgovcBbucDkNqwv4jplcMTi7bMJEGO1/preview" }
          ]
        }
      },
      {
        id: 3309,
        name: "S1 E9 - Whereabouts of His Left Arm: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1gJhnDrVlbjfQdQIe2tjSrCQXpCe8VMDL/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1gJhnDrVlbjfQdQIe2tjSrCQXpCe8VMDL/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1gJhnDrVlbjfQdQIe2tjSrCQXpCe8VMDL/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/11XMqc90XMGrJbPHgNbCgPc_6Gwpj9umJ/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/11XMqc90XMGrJbPHgNbCgPc_6Gwpj9umJ/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/11XMqc90XMGrJbPHgNbCgPc_6Gwpj9umJ/preview" }
          ]
        }
      },
      {
        id: 3310,
        name: "S1 E10 - Response: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1-_RiY1MrHC4IMt78p-ZkD9Ict1utANyS/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1-_RiY1MrHC4IMt78p-ZkD9Ict1utANyS/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1-_RiY1MrHC4IMt78p-ZkD9Ict1utANyS/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1PwA0k_ncfIMD68OpQCdX8IVLK8qB1I56/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1PwA0k_ncfIMD68OpQCdX8IVLK8qB1I56/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1PwA0k_ncfIMD68OpQCdX8IVLK8qB1I56/preview" }
          ]
        }
      },
      {
        id: 3311,
        name: "S1 E11 - Idol: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1b80ygekt_HIu6Y2i-wHZ-lKIm4qK07tN/preview" },
            { name: "Backup", url: "https://drive.google.com/file/d/1b80ygekt_HIu6Y2i-wHZ-lKIm4qK07tN/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1b80ygekt_HIu6Y2i-wHZ-lKIm4qK07tN/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1LZ5e4g5aNlqUuNKElYW8ZqUF2IqhFPg_/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1LZ5e4g5aNlqUuNKElYW8ZqUF2IqhFPg_/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1LZ5e4g5aNlqUuNKElYW8ZqUF2IqhFPg_/preview" }
          ]
        }
      },
      {
        id: 3312,
        name: "S1 E12 - Wound: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1uKlQgZtnTDgplza_H3iIY3G1TXwRQCrX/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1uKlQgZtnTDgplza_H3iIY3G1TXwRQCrX/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1uKlQgZtnTDgplza_H3iIY3G1TXwRQCrX/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1UWCD0kgYD5pnLPsPVULkXGdayeAM3-ne/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1UWCD0kgYD5pnLPsPVULkXGdayeAM3-ne/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1UWCD0kgYD5pnLPsPVULkXGdayeAM3-ne/preview" }
          ]
        }
      },
      {
        id: 3313,
        name: "S1 E13 - Primal Desire: The Struggle for Trost",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1Y_Cz4S1kcdZrSXo0I7sTCnj_ydcs_fZN/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1Y_Cz4S1kcdZrSXo0I7sTCnj_ydcs_fZN/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1Y_Cz4S1kcdZrSXo0I7sTCnj_ydcs_fZN/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1EtXaYh8bDA2q7pqS_sVQVHbVBsARoOY0/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1EtXaYh8bDA2q7pqS_sVQVHbVBsARoOY0/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1EtXaYh8bDA2q7pqS_sVQVHbVBsARoOY0/preview" }
          ]
        }
      },
      {
        id: 3314,
        name: "S1 E14 - Can't Look into His Eyes Yet: Eve of the Counterattack",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1CDmvQrKV1T1fU2sFsQbt6VCnnGhWKm6u/preview" }, 
          
            { name: "Backup", url: "https://drive.google.com/file/d/1CDmvQrKV1T1fU2sFsQbt6VCnnGhWKm6u/preview" },
              { name: "Server 3", url: "https://drive.google.com/file/d/1CDmvQrKV1T1fU2sFsQbt6VCnnGhWKm6u/preview" }
            ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1chTtpHa-kQdKKyhdlWlxcpzAiR41POs_/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1chTtpHa-kQdKKyhdlWlxcpzAiR41POs_/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1chTtpHa-kQdKKyhdlWlxcpzAiR41POs_/preview" }
          ]
        }
      },
      {
        id: 3315,
        name: "S1 E15 - Special Ops Squad: Eve of the Counterattack",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/19V08WAI9uBs2C93W3zd9UPDRZ6TmQk2U/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/19V08WAI9uBs2C93W3zd9UPDRZ6TmQk2U/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/19V08WAI9uBs2C93W3zd9UPDRZ6TmQk2U/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1i7jgqtZida73yUpFT3oLLgYkV89UYeKu/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1i7jgqtZida73yUpFT3oLLgYkV89UYeKu/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1i7jgqtZida73yUpFT3oLLgYkV89UYeKu/preview" }
          ]
        }
      },
      {
        id: 3316,
        name: "S1 E16 - What Needs to Be Done Now: Eve of the Counterattack",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1ddIhMH505IWl4ticA7xLqUCAlXxOnyyC/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1ddIhMH505IWl4ticA7xLqUCAlXxOnyyC/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1ddIhMH505IWl4ticA7xLqUCAlXxOnyyC/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1PemW8iW3AAuA1_DYRjmcEbxxlH4IpYQb/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1PemW8iW3AAuA1_DYRjmcEbxxlH4IpYQb/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1PemW8iW3AAuA1_DYRjmcEbxxlH4IpYQb/preview" }
          ]
        }
      },
      {
        id: 3317,
        name: "S1 E17 - Female Titan: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1x9S49T33OfLvTbQdtUlamfvEYhyOHTjN/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1x9S49T33OfLvTbQdtUlamfvEYhyOHTjN/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1x9S49T33OfLvTbQdtUlamfvEYhyOHTjN/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1WM4-3-i0yoPkojn_mHObkF_AUnj-yHY9/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1WM4-3-i0yoPkojn_mHObkF_AUnj-yHY9/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1WM4-3-i0yoPkojn_mHObkF_AUnj-yHY9/preview" }
          ]
        }
      },
      {
        id: 3318,
        name: "S1 E18 - Forest of Giant Trees: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1fWHXWIoGtZJyvE9zIaQtkv5gZCZjDkHY/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1fWHXWIoGtZJyvE9zIaQtkv5gZCZjDkHY/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1fWHXWIoGtZJyvE9zIaQtkv5gZCZjDkHY/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1GfxtLPsL0hDAkpXB-21ybRpQaxxFSYB6/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1GfxtLPsL0hDAkpXB-21ybRpQaxxFSYB6/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1GfxtLPsL0hDAkpXB-21ybRpQaxxFSYB6/preview" }
          ]
        }
      },
      {
        id: 3319,
        name: "S1 E19 - Bite: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1Jya2KNJfxVMfiWG2DScQYeCvYvkeGdr_/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1Jya2KNJfxVMfiWG2DScQYeCvYvkeGdr_/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1Jya2KNJfxVMfiWG2DScQYeCvYvkeGdr_/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1kA83U3md-3XR7J5_XYBce2ff51q_utQh/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1kA83U3md-3XR7J5_XYBce2ff51q_utQh/preview" }, 
              { name: "Server 3", url: "https://drive.google.com/file/d/1kA83U3md-3XR7J5_XYBce2ff51q_utQh/preview" }
            ]
        }
      },
      {
        id: 3320,
        name: "S1 E20 - Erwin Smith: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1xtglNcpWWFa8JXMx_h0iEy4ELuSZ6mDi/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1xtglNcpWWFa8JXMx_h0iEy4ELuSZ6mDi/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1xtglNcpWWFa8JXMx_h0iEy4ELuSZ6mDi/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1XUXYJWqsXx4-wigg_Ln8ytutlhtS9kjM/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1XUXYJWqsXx4-wigg_Ln8ytutlhtS9kjM/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1XUXYJWqsXx4-wigg_Ln8ytutlhtS9kjM/preview" }
          ]
        }
      },
      {
        id: 3321,
        name: "S1 E21 - Crushing Blow: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1sxOmNAkdLe1pME5xmfUEgt5MqST04dDi/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1sxOmNAkdLe1pME5xmfUEgt5MqST04dDi/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1sxOmNAkdLe1pME5xmfUEgt5MqST04dDi/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1psyy4bQPOTvtuQ3iTjHuj-gz2bUtWpnf/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1psyy4bQPOTvtuQ3iTjHuj-gz2bUtWpnf/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1psyy4bQPOTvtuQ3iTjHuj-gz2bUtWpnf/preview" }
          ]
        }
      },
      {
        id: 3322,
        name: "S1 E22 - The Defeated: The 57th Exterior Scouting Mission",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1XDt9LJY9Q3YI3Ee38Nlu0E7A0ZMYx78n/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1XDt9LJY9Q3YI3Ee38Nlu0E7A0ZMYx78n/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1XDt9LJY9Q3YI3Ee38Nlu0E7A0ZMYx78n/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1qHo-7GsyJO9lkTV35ESI1m8PMN8GNRkr/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1qHo-7GsyJO9lkTV35ESI1m8PMN8GNRkr/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1qHo-7GsyJO9lkTV35ESI1m8PMN8GNRkr/preview" }
          ]
        }
      },
      {
        id: 3323,
        name: "S1 E23 - Smile: Prelude to the Counterattack",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1kAJotKyk4C-03GUxvvFfTovgK9zIrmsX/preview" },
            { name: "Backup", url: "https://drive.google.com/file/d/1kAJotKyk4C-03GUxvvFfTovgK9zIrmsX/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1kAJotKyk4C-03GUxvvFfTovgK9zIrmsX/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/15BizJeDrhzspnWj6Qp77e4pU2kXQyDfj/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/15BizJeDrhzspnWj6Qp77e4pU2kXQyDfj/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/15BizJeDrhzspnWj6Qp77e4pU2kXQyDfj/preview" }
          ]
        }
      },
      {
        id: 3324,
        name: "S1 E24 - The Titan's Son: Closing Ceremony",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1XZoF59uY47FChE7hP41HfMuO-klPJzAu/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1XZoF59uY47FChE7hP41HfMuO-klPJzAu/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1XZoF59uY47FChE7hP41HfMuO-klPJzAu/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1O5Q5NMzV4ggQPRLw1pZpORgzhFTNQLTz/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1O5Q5NMzV4ggQPRLw1pZpORgzhFTNQLTz/preview" }, 
              { name: "Server 3", url: "https://drive.google.com/file/d/1O5Q5NMzV4ggQPRLw1pZpORgzhFTNQLTz/preview" }
            ]
        }
      },
      {
        id: 3325,
        name: "S1 E25 - Wall: Assault on Stohess",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1Cd7wlisboEpWtFK3Cquk-wkfdSEEshwA/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1Cd7wlisboEpWtFK3Cquk-wkfdSEEshwA/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1Cd7wlisboEpWtFK3Cquk-wkfdSEEshwA/preview" }
          ],
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1w2coNwHD_UOOZ9EsV4vrveRL8bhFwzCc/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1w2coNwHD_UOOZ9EsV4vrveRL8bhFwzCc/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1w2coNwHD_UOOZ9EsV4vrveRL8bhFwzCc/preview" }
          ]
        }
      }
    ]
  },


  // ─────────────────────────────────────────────────────────────
  // ATTACK ON TITAN — SEASON 2
  // Own card on browse pages, linked to S1 via seriesGroup
  // ─────────────────────────────────────────────────────────────
  {
    title: "Attack On Titan Season 2",
    slug: "attack-on-titan-season-2",
    trailerId: "LHtdKWJdif4",
    genre: ["Action", "Drama", "Fantasy", "Military"],
    type: "series",
    cover: "https://res.cloudinary.com/ditotijr4/image/upload/v1778849107/Gemini_Generated_Image_nno2ytnno2ytnno2_wfcuso.png",
    synopsis: "Eren Yeager and his friends venture beyond Wall Rose and discover shocking truths about the Titans. The battle for humanity intensifies as the Armored and Colossal Titans reveal themselves.",
    malScore: 8.4,
    status: "Completed",
    aired: "Apr 1, 2017",
    duration: "23 min/ep",
    studio: "Wit Studio",
    seriesGroup: "attack-on-titan",   // ← same group as Season 1
    seasonNumber: 2,
    seasonLabel:  "Season 2",
    seasons: [],  // no sub-seasons inside this entry
    episodes: [
      {
        id: 4301,
        name: "S2 E1 - Beast Titan",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4302,
        name: "S2 E2 - I'm Home",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4303,
        name: "S2 E3 - Southwestward",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4304,
        name: "S2 E4 - Soldier",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4305,
        name: "S2 E5 - Historia",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4306,
        name: "S2 E6 - Warrior",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4307,
        name: "S2 E7 - Close Combat",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4308,
        name: "S2 E8 - The Hunters",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4309,
        name: "S2 E9 - Opening",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4310,
        name: "S2 E10 - Children",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4311,
        name: "S2 E11 - Charge",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      },
      {
        id: 4312,
        name: "S2 E12 - Scream",
        servers: {
          sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
          dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // DEATH NOTE
  // ─────────────────────────────────────────────────────────────
  {
    title: "Death Note",
    slug: "death-note",
    trailerId: "NlJZ-YgAt-c",
    genre: ["Thriller", "Mystery", "Psychological", "Supernatural", "Police", "Shounen"],
    type: "series",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5e61f3e7c0045e46b670d31a5bb39c68.jpg",
    synopsis: "Light Yagami discovers a supernatural notebook — anyone whose name is written in it dies. He uses it to cleanse the world of crime, but genius detective L is on his trail.",
    malScore: 8.6,
    status: "Completed",
    aired: "Oct 4, 2006",
    duration: "23 min/ep",
    studio: "Madhouse",
    episodes: [
      {
        id: 1001,
        name: "Episode 1 - Rebirth",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/11XjaLL3o_fFB79Bn1SbM-KNnGiGzgb-p/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/11XjaLL3o_fFB79Bn1SbM-KNnGiGzgb-p/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/11XjaLL3o_fFB79Bn1SbM-KNnGiGzgb-p/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1VSgRdwI2mkqPLzAkm08sh24pPak8CbYI/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1VSgRdwI2mkqPLzAkm08sh24pPak8CbYI/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1VSgRdwI2mkqPLzAkm08sh24pPak8CbYI/preview" }
          ]
        }
      },
      {
        id: 1002,
        name: "Episode 2 - Confrontation",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1A2RaST8AunuCnnRB6rHOiEXfI9aImmh1/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1A2RaST8AunuCnnRB6rHOiEXfI9aImmh1/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1A2RaST8AunuCnnRB6rHOiEXfI9aImmh1/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/17leY-O9F04nbvHbuIvW4JmY4oZmkupNX/preeviw" },
            { name: "Backup",   url: "https://drive.google.com/file/d/17leY-O9F04nbvHbuIvW4JmY4oZmkupNX/preeviw" },
            { name: "Server 3", url: "https://drive.google.com/file/d/17leY-O9F04nbvHbuIvW4JmY4oZmkupNX/preeviw" }
          ]
        }
      },
      {
        id: 1003,
        name: "Episode 3 - Dealings",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1BQi0GrP4oCxcaxQWghVTZiOT12_UHW6F/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1BQi0GrP4oCxcaxQWghVTZiOT12_UHW6F/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1BQi0GrP4oCxcaxQWghVTZiOT12_UHW6F/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1g9tOf_r0gH6euDG_i_WfUurY19OOU0Fn/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1g9tOf_r0gH6euDG_i_WfUurY19OOU0Fn/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1g9tOf_r0gH6euDG_i_WfUurY19OOU0Fn/preview" }
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
// WITCH HAT ATELIER
// ─────────────────────────────────────────────────────────────
{
  title: "Witch Hat Atelier",
  slug: "witch-hat-atelier",
  trailerId: "rc26AwBXlUE",
  genre: ["Fantasy", "Adventure", "Drama", "Magic", "Seinen"],
  type: "series",
  cover: "https://res.cloudinary.com/ditotijr4/image/upload/v1778842754/Witch_Hat_Atelier_-_Anime_autbtl.jpg",
  synopsis: "Coco is a young girl who has always dreamed of becoming a witch. After secretly watching the witch Qifery use magic, she discovers the hidden truth that anyone can use magic by drawing special seals. Coco becomes Qifery's apprentice and begins her journey into the secret world of witches.",
  malScore: 8.8,
  status: "Ongoing",
  aired: "Apr 6, 2026",
  duration: "23 min/ep",
  studio: "BUG FILMS",
  episodes: [
    {
      id: 2001,
      name: "Ep 1: The Beginning of Magic",
      servers: {
        sub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/10JJPFuyHvHiUxGoXN4y4sQ_qMzIU5cLG/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/10JJPFuyHvHiUxGoXN4y4sQ_qMzIU5cLG/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/10JJPFuyHvHiUxGoXN4y4sQ_qMzIU5cLG/preview" }
        ],
        dub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/1g1f2O-V1TP04tpCtmsRXxjtaOoP4ELoQ/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/1g1f2O-V1TP04tpCtmsRXxjtaOoP4ELoQ/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/1g1f2O-V1TP04tpCtmsRXxjtaOoP4ELoQ/preview" }
        ]
      }
    },
    {
      id: 2002,
      name: "Ep 2: The Atelier of the Witch",
      servers: {
        sub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/1vjuFv6ou94RAftb6nEu2ky-mr4nqlWTu/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/1vjuFv6ou94RAftb6nEu2ky-mr4nqlWTu/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/1vjuFv6ou94RAftb6nEu2ky-mr4nqlWTu/preview" }
        ],
        dub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/1Oh-uLCSUaoA7o3I0c60s7ue_WkjKaMvV/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/1Oh-uLCSUaoA7o3I0c60s7ue_WkjKaMvV/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/1Oh-uLCSUaoA7o3I0c60s7ue_WkjKaMvV/preview" }
        ]
      }
    },
    {
      id: 2003,
      name: "Ep 3: The Dadah Range Test",
      servers: {
        sub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/1oYrW_g4eqH018fWbKMt6ONFnkzK_HY6t/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/1oYrW_g4eqH018fWbKMt6ONFnkzK_HY6t/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/1oYrW_g4eqH018fWbKMt6ONFnkzK_HY6t/preview" }
        ],
        dub: [
          { name: "GDrive",   url: "https://drive.google.com/file/d/1o9l5WgQ9M_tWeaGIQAp5GH8lWuvkZTn7/preview" },
          { name: "Backup",   url: "https://drive.google.com/file/d/1o9l5WgQ9M_tWeaGIQAp5GH8lWuvkZTn7/preview" },
          { name: "Server 3", url: "https://drive.google.com/file/d/1o9l5WgQ9M_tWeaGIQAp5GH8lWuvkZTn7/preview" }
        ]
      }
    }
  ]
},

  // ─────────────────────────────────────────────────────────────
  // YOUR NAME
  // ─────────────────────────────────────────────────────────────
  {
    title: "Your Name",
    slug: "your-name",
    trailerId: "xU47nhruN-Q",
    genre: ["Romance", "Drama", "Supernatural"],
    type: "movie",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/16eec56baf8f3fcc6430607f58ce3d12.jpg",
    synopsis: "Two strangers find themselves linked in a mysterious way, swapping bodies while they sleep. A beautiful story of connection across time and space.",
    malScore: 8.9,
    status: "Completed",
    aired: "Aug 26, 2016",
    duration: "1h 46m",
    studio: "CoMix Wave Films",
    episodes: [
      {
        id: 4001,
        name: "Full Movie",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1NxpkTQMJavgwDmdLXu6GynrTnhJClk5u/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1NxpkTQMJavgwDmdLXu6GynrTnhJClk5u/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1NxpkTQMJavgwDmdLXu6GynrTnhJClk5u/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/12vkNQD2SPdIwk_ihXqyYogbYwo4iztAZ/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/12vkNQD2SPdIwk_ihXqyYogbYwo4iztAZ/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/12vkNQD2SPdIwk_ihXqyYogbYwo4iztAZ/preview" }
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SOLO LEVELING
  // ─────────────────────────────────────────────────────────────
  {
    title: "Solo Leveling",
    slug: "solo-leveling",
    trailerId: "Ow2GJMo53wI",
    genre: ["Action", "Fantasy", "Adventure"],
    type: "series",
    cover: "https://static.anikai.to/bd/i/2/ec/676649472c15e.jpg",
    synopsis: "The world's weakest hunter gains a unique ability to level up infinitely after a near-death experience in a mysterious dungeon.",
    malScore: 8.7,
    status: "Ongoing",
    aired: "Jan 7, 2024",
    duration: "24 min/ep",
    studio: "A-1 Pictures",
    episodes: [
      {
        id: 6001,
        name: "Episode 1 - I'm Used to It",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1pUEKgZf9SaVB7lMdRHc3Ajd0B82k--vD/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1pUEKgZf9SaVB7lMdRHc3Ajd0B82k--vD/preview" },
              { name: "Server 3", url: "https://drive.google.com/file/d/1pUEKgZf9SaVB7lMdRHc3Ajd0B82k--vD/preview" }],
              
          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1kdkN3tSHBVvN-AEssgmYzfEPyOa4XfAq/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1kdkN3tSHBVvN-AEssgmYzfEPyOa4XfAq/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1kdkN3tSHBVvN-AEssgmYzfEPyOa4XfAq/preview" }]
        }
      },
      {
        id: 6002,
        name: "Episode 2 - If I Had One More Chance",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1-_KKooICwPFHFp-7CkSs0jqJqfEn9XpY/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1-_KKooICwPFHFp-7CkSs0jqJqfEn9XpY/preview" }, 
            { name: "Server 3", url: "https://drive.google.com/file/d/1-_KKooICwPFHFp-7CkSs0jqJqfEn9XpY/preview" }],

          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1ofx_LZaBBo524ucntcukdW81_hHZBMj_/preview" }, 
            { name: "Backup", url: "https://drive.google.com/file/d/1ofx_LZaBBo524ucntcukdW81_hHZBMj_/preview" },
              { name: "Server 3", url: "https://drive.google.com/file/d/1ofx_LZaBBo524ucntcukdW81_hHZBMj_/preview" }]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // I WANT TO EAT YOUR PANCREAS
  // ─────────────────────────────────────────────────────────────
  {
    title: "I Want to Eat Your Pancreas",
    slug: "i-want-to-eat-your-pancreas",
    trailerId: "IUCL5SpecgA",
    genre: ["Drama", "Romance", "Slice of Life"],
    type: "movie",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6a6d4e47bca47ad4eb3656dbc606ea23.jpg",
    synopsis: "A quiet boy discovers his cheerful classmate is dying. Despite opposite personalities, the two form a deep bond as they spend her remaining time together.",
    malScore: 8.6,
    status: "Completed",
    aired: "Sep 1, 2018",
    duration: "1h 48m",
    studio: "Studio VOLN",
    episodes: [
      {
        id: 5001,
        name: "Full Movie",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1l92HNraIw3jllyOLS_KYCL_4pKpZZ6wp/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1l92HNraIw3jllyOLS_KYCL_4pKpZZ6wp/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1l92HNraIw3jllyOLS_KYCL_4pKpZZ6wp/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/183vuHIepZPboK9A8BbN4DFwX8NhzWd-1/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/183vuHIepZPboK9A8BbN4DFwX8NhzWd-1/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/183vuHIepZPboK9A8BbN4DFwX8NhzWd-1/preview" }
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // YOUR LIE IN APRIL
  // ─────────────────────────────────────────────────────────────
  {
    title: "Your Lie in April",
    slug: "your-lie-in-april",
    trailerId: "iM6657WNsHk",
    genre: ["Drama", "Romance", "Music", "School"],
    type: "series",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/1713f98ec94d824b3a34ef0f4ace633f.jpg",
    synopsis: "A piano prodigy who lost his ability to hear his own playing meets a violinist who helps him rediscover music and life.",
    malScore: 8.6,
    status: "Completed",
    aired: "Oct 10, 2014",
    duration: "22 min/ep",
    studio: "A-1 Pictures",
    episodes: []
  },

  // ─────────────────────────────────────────────────────────────
  // VINLAND SAGA
  // ─────────────────────────────────────────────────────────────
  {
    title: "Vinland Saga",
    slug: "vinland-saga",
    trailerId: "A861_hOYQhM",
    genre: ["Action", "Drama", "Historical", "Seinen"],
    type: "series",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/9cc864ccccce7f38f7a100627ef21516.jpg",
    synopsis: "A young Viking warrior seeks revenge in a brutal saga exploring war, honor, and the search for true purpose.",
    malScore: 8.8,
    status: "Ongoing",
    aired: "Jul 8, 2019",
    duration: "24 min/ep",
    studio: "Wit Studio / MAPPA",
    episodes: []
  },

  // ─────────────────────────────────────────────────────────────
  // A SILENT VOICE
  // ─────────────────────────────────────────────────────────────
  {
    title: "A Silent Voice",
    slug: "a-silent-voice",
    trailerId: "nfK6UgLra7g",
    genre: ["Drama", "Romance", "School", "Slice of Life"],
    type: "movie",
    cover: "https://static.anikai.to/ac/i/d/c2/6766492f9f230.jpg",
    synopsis: "A former bully seeks redemption after tormenting a deaf girl in elementary school. A story of friendship, forgiveness, and growing up.",
    malScore: 8.9,
    status: "Completed",
    aired: "Sep 17, 2016",
    duration: "2h 10m",
    studio: "Kyoto Animation",
    episodes: [
      {
        id: 5002,
        name: "Full Movie",
        servers: {
          sub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" }
          ],
          dub: [
            { name: "GDrive",   url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" },
            { name: "Backup",   url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" },
            { name: "Server 3", url: "https://drive.google.com/file/d/1P1TL8OX81r2bPk6ZJkviNtHC4KGbt1We/preview" }
          ]
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SUZUME
  // ─────────────────────────────────────────────────────────────
  {
    title: "Suzume",
    slug: "suzume",
    trailerId: "bMFBiINGcMU",
    genre: ["Adventure", "Drama", "Fantasy", "Romance"],
    type: "movie",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/88d7186ebed8856c731b2dd132aaf68a.jpg",
    synopsis: "17-year-old Suzume encounters a mysterious young man searching for a door. She is swept into a journey across Japan, sealing ancient doors to prevent disasters from spilling into the real world.",
    malScore: 8.5,
    status: "Completed",
    aired: "Nov 11, 2022",
    duration: "2h 2m",
    studio: "CoMix Wave Films",
    episodes: [
      
    ]
  },
     // {
     //    id: 7001,
     //       name: "Full Movie",
     //   servers: {
     //     sub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }],
     //      dub: [{ name: "GDrive", url: "" }, { name: "Backup", url: "" }, { name: "Server 3", url: "" }]
     //    }
     //   


  // ─────────────────────────────────────────────────────────────
  // WEATHERING WITH YOU
  // ─────────────────────────────────────────────────────────────
  {
    title: "Weathering With You",
    slug: "weathering-with-you",
    trailerId: "Q6iK6DjrgKk",
    genre: ["Romance", "Drama", "Fantasy", "Supernatural"],
    type: "movie",
    cover: "https://static.anikai.to/a0/i/7/83/676649211f404.jpg",
    synopsis: "A runaway high school boy in Tokyo befriends an orphan girl who can stop the rain with her prayers. As the city faces endless rainfall, the two must make an impossible choice between the world and each other.",
    malScore: 8.4,
    status: "Completed",
    aired: "Jul 19, 2019",
    duration: "1h 52m",
    studio: "CoMix Wave Films",
    episodes: [
      {
        id: 8001,
        name: "Full Movie",
        servers: {
          sub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1qodY2CWuYOwEoH98rIrYooQNiUkYY_wd/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1qodY2CWuYOwEoH98rIrYooQNiUkYY_wd/preview" }, 
              { name: "Server 3", url: "https://drive.google.com/file/d/1qodY2CWuYOwEoH98rIrYooQNiUkYY_wd/preview" }
            ],

          dub: [{ name: "GDrive", url: "https://drive.google.com/file/d/1FttrHppQdJybx5gPBDNKWA6yUDGoS5UW/preview" },
              { name: "Backup", url: "https://drive.google.com/file/d/1FttrHppQdJybx5gPBDNKWA6yUDGoS5UW/preview" }, 
              { name: "Server 3", url: "https://drive.google.com/file/d/1FttrHppQdJybx5gPBDNKWA6yUDGoS5UW/preview" }
            ]
        }
      }
    ]
  }

];

// ─────────────────────────────────────────────────────────────────
// FEATURED ANIME — shown in hero slideshow
// ─────────────────────────────────────────────────────────────────
const featuredAnime = [
  "attack-on-titan",
  "death-note",
  "your-name",
  "solo-leveling",
  "vinland-saga",
  "suzume",
  "your-lie-in-april",
  "a-silent-voice"
];

// ─────────────────────────────────────────────────────────────────
// PROTECTED PAGES — require login to access
// ─────────────────────────────────────────────────────────────────
const protectedPages = ["watch", "profile", "settings"];

// ─────────────────────────────────────────────────────────────────
// ALL GENRES — used on the filter/browse page
// ─────────────────────────────────────────────────────────────────
const allGenres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
  "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Supernatural",
  "Thriller", "Isekai", "Military", "School", "Sports", "Mecha", "Historical",
  "Shounen", "Shoujo", "Seinen", "Josei", "Harem", "Magic", "Police",
  "Music", "Demons", "Samurai", "Space", "Vampire", "Martial Arts",
  "Super Power", "Game", "Parody"
];

// ─────────────────────────────────────────────────────────────────
// DAILY ANIME QUOTES — seeded by day number, changes each day
// ─────────────────────────────────────────────────────────────────
const ANIME_QUOTES = [
  { quote: "A lesson without pain is meaningless.",                                            author: "Edward Elric",     anime: "Fullmetal Alchemist" },
  { quote: "If you don't take risks, you can't create a future.",                              author: "Monkey D. Luffy",  anime: "One Piece" },
  { quote: "The world isn't perfect. But it's there for us, doing the best it can.",           author: "Roy Mustang",      anime: "FMA Brotherhood" },
  { quote: "Hard work is worthless for those that don't believe in themselves.",               author: "Naruto Uzumaki",   anime: "Naruto" },
  { quote: "Fear is not evil. It tells you what your weakness is.",                            author: "Gildarts Clive",   anime: "Fairy Tail" },
  { quote: "A dropout will beat a genius through hard work.",                                  author: "Rock Lee",         anime: "Naruto" },
  { quote: "People's lives don't end when they die. It ends when they lose faith.",            author: "Itachi Uchiha",    anime: "Naruto" },
  { quote: "The only ones who should kill are those who are prepared to be killed.",           author: "Lelouch",          anime: "Code Geass" },
  { quote: "Even if I am weak, becoming stronger is also a choice.",                          author: "Rimuru Tempest",   anime: "Tensura" },
  { quote: "I want to be strong enough so no one will ever have to be sad.",                  author: "Kousei Arima",     anime: "Your Lie in April" },
  { quote: "You should enjoy the little detours to the fullest.",                             author: "Ging Freecss",     anime: "Hunter x Hunter" },
  { quote: "Life is not a game of luck. If you wanna win, work hard.",                        author: "Sora",             anime: "No Game No Life" },
  { quote: "The moment you give up is the moment you let others win.",                        author: "Katsuki Bakugo",   anime: "My Hero Academia" },
  { quote: "I'll leave tomorrow's problems to tomorrow's me.",                                author: "Saitama",          anime: "One Punch Man" },
  { quote: "The world is cruel but also very beautiful.",                                     author: "Mikasa Ackerman",  anime: "Attack on Titan" },
  { quote: "Thinking you're no good and worthless is the worst thing you can do.",            author: "Nobita",           anime: "Doraemon" },
  { quote: "Vision is not what your eyes see, but an image your brain comprehends.",          author: "Touka Kirishima",  anime: "Tokyo Ghoul" },
  { quote: "Even in the darkest times, someone believes in you.",                             author: "Shoyo Hinata",     anime: "Haikyuu!!" },
  { quote: "People become stronger because they have memories they can't forget.",            author: "Tsunade",          anime: "Naruto" },
  { quote: "Without rain, nothing grows. Learn to embrace the storms of your life.",          author: "Unknown",          anime: "Naruto Shippuden" },
  { quote: "It's not the face that makes someone a monster. It's the choices they make.",     author: "Naruto",           anime: "Naruto" },
  { quote: "Power comes in response to a need, not a desire.",                                author: "Goku",             anime: "Dragon Ball Z" },
  { quote: "Simplicity is the easiest path to true beauty.",                                  author: "Seijuro Akashi",   anime: "Kuroko no Basket" },
  { quote: "If you can't find a reason to fight, then you shouldn't be fighting.",            author: "Akame",            anime: "Akame ga Kill" },
  { quote: "Being lonely is more painful than getting hurt.",                                 author: "Monkey D. Luffy",  anime: "One Piece" },
  { quote: "A person grows up when he's able to overcome hardships.",                         author: "Pain",             anime: "Naruto" },
  { quote: "We are all like fireworks. We climb, we shine, and always go our separate ways.", author: "Yuki",             anime: "Fruits Basket" },
  { quote: "The scariest thing about killing people is getting used to it.",                  author: "Seras Victoria",   anime: "Hellsing" },
  { quote: "If I can't do great things, I can do small things in a great way.",               author: "Martin Luther King", anime: "Bleach" },
  { quote: "Whatever you do, enjoy it to the fullest. That is the secret of life.",           author: "Rider",            anime: "Fate/Zero" },
];
