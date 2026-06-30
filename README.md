Hello, my name is Julio. I’m a local web developer here in the Bronx, near the Bronx Park East 2 and 5 train station.
I came across Berlin Group Family Daycare and wanted to reach out as a local developer who helps small businesses build a stronger online presence.
I created a website preview for your daycare so you can see how your business could look online in a clean, professional, and organized way. I attached a short video walkthrough for you to review.
The website can be customized with your official business information, photos, services, hours, contact details, and anything else you would like to include.
No pressure at all — I just wanted to share what I created and see if this is something you may be interested in. I would be happy to answer any questions.
Best regards,
Julio Salas
Web Developer
(929) 246-3822
https://webdesign-multimedia.github.io/Julio-Salas-Portfolio/

Live: https://webdesign-multimedia.github.io/Berlin_Group_Family_DayCare/

# Berlin Group Family Daycare

A bilingual (English / Spanish) marketing website for **Berlin Group Family Daycare**, a NYS-licensed home daycare located in the Bronx, NY. Built with pure vanilla web technologies — no frameworks, no dependencies.

---

## About the Site

Berlin Group Family Daycare serves children ages **6 weeks to 12 years** with a warm, nurturing bilingual environment. The site communicates the business's services, credentials, and contact information to prospective families.

**Business details:**
- Address: 1844 Fowler Ave (Apt 2F), Bronx, NY 10462
- Phone: 917-684-3820
- Social: [@berlindaycarekids](https://www.instagram.com/berlindaycarekids) on Instagram & TikTok
- Licensed by: NYS Office of Children & Family Services (OCFS)
- Certified: CPR & First Aid
- Payments accepted: HRA/ACS vouchers, Zelle, Cash

---

## Features

- **Bilingual EN / ES toggle** — full site switches between English and Spanish instantly, always defaults to English
- **Animated background** — 2D floating daycare-themed emoji items and a canvas particle system (circles + sparkle stars)
- **Glassmorphism design** — semi-transparent cards on a deep teal gradient background
- **Scroll-reveal animations** — cards and list items fade in as you scroll using IntersectionObserver
- **Contact form** — with honeypot spam trap and phone/email regex validation
- **Responsive layout** — breakpoints at 1024px, 900px, 768px, 600px, and 380px; touch tap targets enforced at 44px min
- **Accessible** — semantic HTML5 landmarks, ARIA labels, roles, and `prefers-reduced-motion` support
- **Browser security headers** via CSP meta tag (no `frame-ancestors`, corrected `connect-src`)
- **Mobile navigation** — hamburger menu that animates into an × when open
- **Scroll-to-top button** — appears after scrolling 420px
- **Auto footer year** — always shows the current year via JS

---

## File Structure

```
Berlin_Group_Family_DayCare/
├── index.html          Semantic HTML — structure and content only
├── css/
│   └── style.css       All styles, animations, and responsive rules
├── js/
│   └── main.js         All JavaScript — toggle, nav, canvas, form, reveal
├── package.json        Local dev server script (npx serve)
└── start-server.sh     Auto-detect Node/Python and launch server
```

---

## Technologies Used

| Layer | Technology | Notes |
|---|---|---|
| Markup | **HTML5** | Semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>` |
| Styles | **CSS3** | Custom properties (variables), Flexbox, CSS Grid, `@keyframes` animations, `@media` queries |
| Scripts | **Vanilla JavaScript (ES5)** | No frameworks or libraries — IIFE pattern for encapsulation |
| Fonts | **Google Fonts** | Baloo 2 (headings) · Nunito (body) |
| Canvas | **Canvas 2D API** | Particle system — circles + 4-point sparkle stars floating upward, throttled to 30 fps |
| Animations | **CSS 2D transforms only** | `translateY`, `rotate`, `scale` — no 3D transforms, no `filter:blur` on animated elements |
| Server | **npx serve** (Node.js) | Zero-install local server; also supports Python 3 fallback |
| Security | **CSP meta tag** | `default-src`, `style-src`, `font-src`, `img-src`, `script-src`, `connect-src 'self'`, `base-uri`, `form-action` |

---

## Running Locally

The site must be served over HTTP (not opened as a `file://` URL) for security policies to work correctly.

**Option 1 — Node.js (recommended):**
```bash
npm start
# opens http://localhost:3000
```

**Option 2 — Shell script (Node or Python auto-detected):**
```bash
./start-server.sh
```

**Option 3 — VS Code Live Server extension:**
Open `index.html` and click **Go Live** in the status bar.

---

## Performance Decisions

- No `filter:blur()` on any animated element — forces CPU repaint every frame
- No `backdrop-filter` on cards/navbar — samples all background pixels per frame
- Floating background items capped at 10 (down from 30+)
- Canvas particle count capped at 35, render loop throttled to 30 fps
- `contain: strict` on the background scene to isolate paint to that layer
- Background items hidden entirely at ≤380px viewport width

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Canvas particle system and CSS animations degrade gracefully — if the browser doesn't support them the rest of the page is unaffected. Users with `prefers-reduced-motion` enabled will see all animations disabled automatically.
