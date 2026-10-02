# Replace the four home cards with the new uploaded portraits

## What the user wants
Swap the four homepage cards (Find the Signal / Shape the Story / Build the Presence / Compound It) from the shared wave background to the four newly uploaded images, in filename order:

1. `Card-1_for_CM.png` (man with headphones at a desk) → Find the Signal
2. `Card-2_for_CM.png` (man speaking into a podcast mic) → Shape the Story
3. `Card-3_for_CM.png` (young man looking at his phone) → Build the Presence
4. `Card-4_for_CM.png` (man thinking in a chair) → Compound It

Keep everything just approved: 2px thin borders, slightly rounded corners, and the white-text-on-blue-pill titles centered at the **bottom** of each card.

## Steps

1. Optimize each upload (resize to 800px wide, convert to WebP) and save as local files `public/home-card-1.webp` … `home-card-4.webp`, matching the project's fast-local-asset convention (uploads are ~1.4 MB PNGs each; WebP keeps the site loading fast).
2. Update `src/pages/Home.tsx`:
   - `systemSteps` gains a per-card `image` field (import the four WebP files).
   - Each card renders its own image as the full card background (replace the single `home-system-wave.webp` + `backgroundPosition` slicing).
   - Keep the clickable link to /create-suite, the `border-2 rounded-2xl` frame, and the bottom-centered blue pill with white title text.
3. Delete the now-unused `public/home-system-wave.webp` and its import.
4. Verify in the preview with Playwright: all four cards show the correct portrait in the correct order, borders and pills intact, no console errors; confirm the build is clean.

## Notes
- The uploads are already exactly 4:5, the same ratio as the cards, so no cropping or distortion.
- No animations, no extra text — only the existing four titles in the pills.
