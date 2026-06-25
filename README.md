# Jamsheed — Python Full Stack Developer Portfolio

A world-class, premium dark-themed portfolio site built for **Jamsheed**, customized to grab the attention of recruiters and showcase advanced capabilities.

## 🛠️ Technology Stack

- **Core:** HTML5, CSS3, Vanilla JavaScript
- **Icons:** Lucide Icons (CDN)
- **Fonts:** Inter (body text), JetBrains Mono (coding fonts & terminals)

## ✨ Animations & Interactions

1. **Matrix Canvas Backdrop:** Subtle code rain running on HTML5 Canvas in the Hero container.
2. **Glitch Name Effect:** Standard cyan/magenta color-split text glitch on load/hover.
3. **Typewriter Text Loop:** Dynamic cycling of Jamsheed's primary developer titles.
4. **Smooth Custom Cursor Trail:** Lerped cursor follower with expand effects on interactive links.
5. **Scroll Reveals:** Staggered, delayed element transitions using the Intersection Observer API.

## 📂 File Structure

```text
portfolio/
├── index.html
├── styles/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── scripts/
│   ├── particles.js
│   ├── typewriter.js
│   ├── cursor.js
│   └── scrollReveal.js
├── assets/
│   └── resume.pdf
└── README.md
```

## 🚀 Local Run

To view the website locally, spin up a basic HTTP server inside the project root:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx -y http-server -p 8000
```

Then open `http://localhost:8000` in your web browser.
