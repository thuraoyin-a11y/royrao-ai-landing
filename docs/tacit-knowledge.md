# Tacit Knowledge

## 1. Design Decisions

- **Verb-first, subject-less Chinese Hero copy**: Emphasizes action and results while de-emphasizing the individual, aligning with a professional B2B tone.
- **Problem/Solution framed from the decision-maker's perspective**: The buyer (institution leader) pays the bill; teachers are the end users. This distinction elevates the pain points.
- **About section omits tech stacks**: Reinforces the "scholar-designer" positioning and avoids homogenizing competition with pure technologists.
- **Image Logo instead of text Logo**: Ensures brand visual consistency, supports complex graphic design, and maintains cross-language consistency.

## 2. Animation Cookbook

- **Hero text stagger 0.04s**: Based on an average reading speed of 200–250 ms per word—fluid without dragging.
- **Problem/Solution connector uses `power2.inOut`**: Simulates the physical feel of "connection," more natural than linear.
- **Services card stagger 0.2s**: Creates rhythmic pacing across three cards and prevents information overload from simultaneous appearance.
- **Slogan placement below the main CTA**: Acts as a trust "anchor" before conversion.

## 3. Bilingual Layout Strategy

- **Chinese buttons need ~20% more padding**: CJK characters are visually dense and require more breathing room.
- **Hero Chinese line-height 1.6 vs English 1.2**: CJK characters need extra leading to avoid crowding.
- **Prevent layout jump on language switch**: Dynamic text containers use `min-height` where possible to avoid page jolts.
- **Logo image cross-fade**: 0.3s CSS opacity transition prevents white flashes during language switches.

## 4. Performance & Accessibility Trade-offs

- **`prefers-reduced-motion`**: Respects user OS settings; animations are skipped for those who need static experiences.
- **Iframe lazy-load threshold 500px**: Balances first-screen performance with near-instant demo readiness.
- **Logo compression target <20KB**: Recommended via TinyPNG to keep FCP under 1.5s.
