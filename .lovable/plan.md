## Newsletter Architect — Sequential Prompt + Safari Fix + DALL·E Image Prompts

### Update `src/components/NewsletterArchitect.tsx`

**1. New MEGA_PROMPT (sequential):**
```
Using your YouTube extension, FIRST analyze the content of this specific podcast episode: {url}

Based ONLY on the insights from this episode, perform the following tasks:

1. THE NEWSLETTER COPY: Write a high-authority LinkedIn post (institutional, Apple-meets-Bloomberg tone, bold headers, zero fluff) summarizing the guest's core investment thesis. Focus on IRR, Risk Mitigation, and First-Principles logic. Format as a copy-paste block.

2. THE VISUAL ASSETS: Generate 5 standalone DALL·E 3 / ChatGPT image prompts to accompany the newsletter. Each prompt must:
   - Be self-contained (no episode context required)
   - Specify an Apple-style minimalist aesthetic: dark background, soft glassmorphism, subtle blue (#02AAF5) accents, high-end editorial composition, generous negative space, institutional/Bloomberg-grade restraint
   - Be formatted as a clean copy-paste block, numbered IMAGE 1 through IMAGE 5
   - Cover: (1) hero conceptual visual, (2) data/chart abstraction, (3) portrait-style scene, (4) macro thesis metaphor, (5) closing brand mark composition

Constraints: zero fluff, no emojis, institutional tone throughout.
```

**2. New `handleAnalyze` flow (Safari-safe):**
- Validate URL (existing logic)
- Build prompt + target URL: `https://gemini.google.com/app?prompt=${encodeURIComponent(prompt)}`
- Copy full prompt to clipboard via `navigator.clipboard.writeText` (wrapped in try/catch fallback)
- Open Gemini using a dynamic anchor:
  ```ts
  const a = document.createElement('a');
  a.href = target;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
  ```
- Toast: "Launched Gemini — prompt also copied to clipboard as backup."
- Remove the artificial `setTimeout` delay (anchor click must run synchronously inside the user gesture for Safari to allow it)

### Out of scope
- No styling changes
- No new components / files
- No backend work

### Files touched
- `src/components/NewsletterArchitect.tsx`
