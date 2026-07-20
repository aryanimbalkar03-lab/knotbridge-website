# Techbridge — Premium Tech Agency Website

> Blending required tech with your business to grow

## 🚀 Quick Start (Local)

```bash
# Option 1: Using npx serve
npx -y serve -l 3000

# Option 2: Using Python
python -m http.server 3000

# Option 3: Using VS Code Live Server
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit: **http://localhost:3000**

---

## 📦 Deploy to Production

### Option A: Vercel (Recommended — Free)

1. **Install Vercel CLI** (one-time):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts. Your site will be live at `https://your-project.vercel.app`.

3. **Custom domain** (optional):
   ```bash
   vercel domains add yourdomain.com
   ```

### Option B: Netlify (Free)

1. **Drag & Drop**: Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this entire folder.

2. **Or use CLI**:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir .
   ```

### Option C: GitHub Pages (Free)

1. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/techbridge.git
   git push -u origin main
   ```

2. Go to **Settings → Pages → Source → main branch → / (root)** → Save.

3. Your site will be live at `https://YOUR_USERNAME.github.io/techbridge/`.

### Option D: Firebase Hosting (Free tier)

1. Install Firebase CLI:
   ```bash
   npm i -g firebase-tools
   firebase login
   ```

2. Initialize and deploy:
   ```bash
   firebase init hosting
   # Select "Use an existing project" or create new
   # Public directory: .
   # Single-page app: No
   firebase deploy
   ```

---

## 🏗️ Project Structure

```
techbridge/
├── index.html      ← Main page (all 3 screens)
├── style.css       ← Premium design system
├── script.js       ← Three.js, wizard, algorithm
├── vercel.json     ← Vercel deployment config
├── netlify.toml    ← Netlify deployment config
└── README.md       ← This file
```

## 🎨 Tech Stack

- **HTML5** + **CSS3** (vanilla, no frameworks)
- **JavaScript** (vanilla ES6+)
- **Three.js** r128 (CDN) — 3D constellation bridge scene
- **Google Fonts** — Source Serif 4 + Inter

## ✨ Features

- 🌉 3D constellation bridge with connected nodes, energy pulses, mouse-reactive camera
- 🎭 Curtain-reveal preloader with SVG bridge drawing
- 📊 Multi-step assessment wizard with micro-economics scoring
- 🕸️ Radar chart visualization of business tech maturity
- ✋ Custom cursor with magnetic button effects
- 📱 Fully responsive (mobile-first)
- ⚡ Zero dependencies (CDN for Three.js only)
