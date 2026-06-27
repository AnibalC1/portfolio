# Anibal Cabral — Portfolio Website

Professional portfolio website showcasing digital design and development work.

## Foundation: Bridgewell Standards

This site is built following the [Bridgewell minimum standards](https://github.com/AnibalC1/bridgewell) established by the team as the baseline for all web projects.

### Core Principles

✅ **Zero Dependencies** — Pure HTML, CSS, and JavaScript. No frameworks, no build tools, no npm packages.

✅ **Accessibility-First** — WCAG AA minimum compliance. Semantic HTML, ARIA labels, keyboard navigation, skip links, reduced motion support.

✅ **Mobile-First Responsive** — Clamp-based spacing, breakpoint-free design using CSS custom properties.

✅ **Progressive Enhancement** — Works without JavaScript, enhanced with it.

✅ **Performance Optimized** — Lazy loading, passive listeners, RequestAnimationFrame, GPU acceleration.

### 2026 Enhancements

🎨 **Motion-First UX** — Scroll-triggered animations using IntersectionObserver

🎯 **Bold Typography** — Larger hero headlines with gradient text effects

📊 **Case Study Format** — Process documentation (discovery → design → dev → results)

📈 **Results Metrics** — Quantifiable outcomes with animated counters

## Project Structure

```
/
├── index.html                          # Homepage
├── case-studies/
│   ├── bridgewell.html                 # Bridgewell case study
│   └── hospital-intranet.html          # Hospital intranet case study (placeholder)
├── assets/
│   ├── css/
│   │   └── styles.css                  # Single CSS file (Bridgewell pattern)
│   ├── js/
│   │   └── main.js                     # Single JS file (IIFE pattern)
│   ├── images/
│   │   ├── projects/                   # Project screenshots (WebP recommended)
│   │   └── brand/                      # Logo, favicon
│   └── videos/
│       └── demos/                      # Case study demo videos
└── README.md                           # This file
```

## Technology Stack

- **HTML5** — Semantic markup, accessibility features
- **CSS3** — Custom properties, grid, flexbox, backdrop-filter, animations
- **JavaScript (ES6+)** — Vanilla JS, IntersectionObserver, RAF, no frameworks
- **Zero Build Tools** — No webpack, no Vite, no bundlers
- **Zero External Dependencies** — No npm packages, no CDN links

## Features

### Homepage

- Hero section with gradient text and cursor spotlight effect
- Project showcase grid with 3D tilt cards
- About section with philosophy cards
- Process timeline with animated counters
- Contact form with client-side validation
- Section navigation rail
- Scroll progress bar

### Case Studies

- Hero with project metadata
- Challenge/solution sections
- Process timeline with numbered phases
- Results metrics with animated counters
- Technology stack breakdown
- Next project navigation

### Interactive Features

- **Loading Animation** — Cinematic intro loader
- **Header Behavior** — Sticky header with scroll hide/show
- **Mobile Navigation** — Burger menu with smooth transitions
- **Cursor Spotlight** — Radial gradient following mouse
- **Scroll Reveals** — IntersectionObserver-based animations
- **Counter Animations** — Number counters for metrics
- **Letter Animations** — Character-by-character reveals
- **3D Tilt Cards** — Perspective transforms on hover
- **Magnetic CTAs** — Buttons that follow cursor
- **Section Rail** — Quick navigation dots
- **Scroll Progress** — Top bar showing page position

## Accessibility Features

- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- Skip links for keyboard navigation
- ARIA labels on all interactive elements
- Reduced motion support (`prefers-reduced-motion`)
- Visible focus indicators
- Logical tab order
- Screen reader tested (NVDA, JAWS, VoiceOver)
- Color contrast ratio 4.5:1+ (WCAG AA)

## Performance

- **Lazy Loading** — Images load only when visible
- **Passive Listeners** — All scroll/touch events use `{ passive: true }`
- **RAF Animations** — RequestAnimationFrame for smooth 60fps
- **GPU Acceleration** — `transform` and `opacity` for animations
- **IntersectionObserver** — Replaces scroll events where possible
- **No Layout Thrashing** — Batched DOM reads/writes

## Security (Pending Scorpion Review)

Per Bridgewell Security Addendum requirements:

### Required Headers

- **CSP (Content Security Policy)** — NO `'unsafe-inline'`, external files only
- **HSTS (Strict Transport Security)** — `max-age=31536000; includeSubDomains; preload`
- **X-Content-Type-Options** — `nosniff`
- **X-Frame-Options** — `SAMEORIGIN`
- **Permissions-Policy** — Disable geolocation, camera, microphone
- **Referrer-Policy** — `strict-origin-when-cross-origin`

### Security Checklist

- [ ] CSP configured (no unsafe-inline)
- [ ] HSTS header added
- [ ] SRI hashes for external resources (if any)
- [ ] File permissions: 644 public, 600 secrets
- [ ] Contact form: server-side validation + CSRF tokens
- [ ] OWASP ZAP scan before launch
- [ ] SSL Labs A+ rating
- [ ] Security headers check

**Status:** Awaiting @Scorpion security audit

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

## Deployment

1. **No Build Step Required** — Upload files directly to server
2. **Configure Security Headers** — See Security section above
3. **HTTPS Required** — Enforce 301 redirects from HTTP
4. **Test Accessibility** — Screen readers, keyboard nav, contrast
5. **Performance Audit** — Lighthouse score 90+ target

## License

All rights reserved. © 2026 Anibal Cabral.

## Credits

- **Built by:** Ace (operations agent)
- **Research by:** Venom (research agent)
- **Security review by:** Scorpion (security agent)
- **Orchestration by:** Lucy (orchestrator agent)
- **Standards:** [Bridgewell minimum standards](https://github.com/AnibalC1/bridgewell)

---

**Ready for Security Review** ✅
