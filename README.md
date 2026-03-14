# 🎨 HTML Paint

A lightweight, browser-based drawing application built with the HTML5 Canvas API — no frameworks, no build step.

## What It Does

Open `index.html` in any modern browser and start drawing. Pick a color, adjust stroke width, and save your artwork as a PNG — all client-side.

### Features

- Freehand drawing with adjustable color and stroke width
- Touch support for tablets and phones
- Undo / Redo (button + `Ctrl+Z`)
- One-click save — downloads the canvas as a PNG
- Responsive canvas that adapts to the window
- Optional PHP endpoint for server-side saves

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| 🖼 Markup | HTML5, semantic elements |
| 🎨 Styling | Vanilla CSS (no framework) |
| ⚙️ Logic | Vanilla JavaScript (ES6+) |
| 🗄 Server (optional) | PHP — `save.php` |

## Getting Started

No dependencies. Just open the file:

```bash
# Clone
git clone https://github.com/stabgan/html-paint.git
cd html-paint

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Optional: server-side save

If you want `save.php` to work, serve the project with PHP:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## ⚠️ Known Issues

- The PHP save endpoint (`save.php`) has no authentication — do not expose it on a public server without adding auth.
- Very large canvases on high-DPI screens may produce heavy PNG files.

## License

Open source. Created by [Kaustabh Ganguly](https://linkedin.com/in/stabgan).
