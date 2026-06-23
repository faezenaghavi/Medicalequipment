# MedEquip — Brand & Design Tokens

## Color Palette

| Token       | Hex       | Usage                              |
|-------------|-----------|-------------------------------------|
| Mint 200    | `#B9DFC5` | Primary brand, buttons, accents     |
| Surface 100 | `#F5FFFA` | Page background, card surfaces      |
| Gold 300    | `#DEA25E` | CTA highlight, featured badges      |
| Forest      | `#1A2E24` | Headings, primary text, nav         |
| Stone 500   | `#6B7C73` | Secondary text, placeholders        |
| White       | `#FFFFFF` | Card backgrounds                    |

## Typography

| Role    | Font            | Weights     | Notes                    |
|---------|-----------------|-------------|--------------------------|
| Display | Inter           | 700, 800    | Headings, hero copy      |
| Body    | Inter           | 400, 500    | Paragraphs, UI copy      |
| Mono    | JetBrains Mono  | 400, 500    | Badges, SKUs, code       |

## Motion Principles

- **Entrance:** `power3.out`, 0.5–0.8s, stagger 0.06–0.1s for lists
- **Scroll parallax:** `scrub: 1.5` on hero blob, `power1.none` ease
- **3D tilt:** `rotateX/Y ±12°`, perspective `800px`, `elastic.out(1,0.5)` on leave
- **Hover transitions:** 200–300ms `ease-in-out`
- **Reduced motion:** All GSAP + CSS animations disabled via `prefers-reduced-motion`

## Glassmorphism (`.glass`)

```css
background: rgba(245, 255, 250, 0.8);
backdrop-filter: blur(16px) saturate(180%);
border: 1px solid rgba(185, 223, 197, 0.35);
```

## Spacing & Radii

| Token | Value  | Usage              |
|-------|--------|--------------------|
| xl    | 12px   | Input fields       |
| 2xl   | 16px   | Cards, panels      |
| 3xl   | 24px   | Hero card, modals  |
| 4xl   | 32px   | Large sections     |
