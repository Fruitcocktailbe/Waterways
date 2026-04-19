# Waterways of the Low Countries

An interactive single-page app for scrolling through seven time periods of canals, rivers, and dikes across Belgium and the Netherlands — from Roman engineering on the Rhine (47 CE) to today's Rotterdam / Antwerp-Bruges mega-ports.

Each period offers two views:

- **Map** — an interactive schematic of the waterway network as it existed in that era, rendered in watercolor-cartography style
- **Photo** — a historical map or photograph fetched from Wikimedia Commons (period-appropriate: Blaeu atlases for the Golden Age, aerial photos for the Industrial era, ISS-53 night shot for today)

Pure static. No build step, no bundler, no framework. Just HTML, CSS, and vanilla JS.

## Use

- **Tap a chip** at the bottom to jump to a period
- **Scroll the chip bar** and it snaps to the centered period (wheel-style)
- **Swipe left/right** on the map/photo area to step to the next period
- **Map / Photo** toggle in the header switches between the schematic and the historical image
- **Keyboard:** ← → to step, `1`–`7` to jump, `M` for map view, `P` for photo view
- **Deep links:** `#era-4` or `#era-4-photo` are supported

## Deploy to Vercel

### Fastest — drag & drop
1. Open <https://vercel.com/new>
2. Drag this `waterways` folder onto the page
3. Click **Deploy**

Live in about 30 seconds.

### CLI
```bash
npm i -g vercel
cd waterways
vercel --prod
```

### Git-backed (recommended for iteration)
1. Push this folder to a GitHub repo
2. At <https://vercel.com/new>, import the repo
3. Every `git push` auto-deploys

## Files

```
waterways/
├── index.html     # markup + inline SVG map (fast first paint)
├── style.css      # design tokens, watercolor sea, chip selector, photo frame
├── app.js         # era + view state, Wikimedia image loader with fallback
├── favicon.svg    # water drop mark
├── vercel.json    # clean URLs + security headers
└── README.md
```

## Historical images

Images are hot-linked from Wikimedia Commons via `Special:FilePath` — stable, openly licensed, and resized on Wikimedia's side (so bandwidth stays modest). The app tries a primary file per era, with a backup file if the first fails.

| # | Era | Primary image |
| - | - | - |
| I | Roman | *Fossa Corbulonis map.png* |
| II | Early Medieval | *Frisia 716-la.svg* |
| III | Medieval | *Geschilderde plan Brugge.jpg* |
| IV | Dutch Golden Age | *Hollandia Comitatus* — Joan Blaeu, Atlas Maior, 1667 |
| V | Industrial | *Noordzeekanaal met de Hembrug, 1914* |
| VI | Twentieth c. | *Afsluitdijk construction (NIMH 2011-3551)* |
| VII | Today | *ISS-53 Rotterdam, Den Haag & Amsterdam at night* |

## Notes

- Mobile-first layout; respects `prefers-reduced-motion` and `safe-area-inset-bottom`
- The map is fully self-contained SVG and works offline; only the Photo view needs network
- If a Wikimedia image fails to load, the app falls back to its secondary file, and finally shows a friendly "use Map view instead" message
