# Shashikant Gupta — portfolio

A static, single-page portfolio. Open `index.html` in a browser, or serve this folder from any static host (XAMPP, GitHub Pages, Netlify). There is no build step and no backend.

## Open locally

From this folder:

```bash
python3 -m http.server 8088
```

Then visit [http://localhost:8088](http://localhost:8088).

With XAMPP, the site is already under `htdocs/FreeLance Project/My-Work`. Open that path from the XAMPP dashboard, or go to `http://localhost/FreeLance%20Project/My-Work/` if Apache is running.

## What’s on the page

The copy follows the 2026 resume: about, five pieces of selected work, three roles, skill groups, education, and contact. LinkedIn is linked from the header, hero, contact section, and footer. A control in the header switches between the dark command-deck theme and a light lab theme. The choice is saved in the browser. Scrolling draws a progress bar, fades each block in, and grows the experience timeline.

## Share it

Zip this folder, or upload `index.html`, `css/`, and `js/` to a static host. Keep those paths together so the stylesheet and script load.
