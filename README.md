# portfolio

Personal portfolio site, live at **https://rohanswami08.github.io/portfolio/**.
Plain HTML, CSS, and JavaScript with no build step.

```
index.html      page content (edit project text here)
style.css       layout, colors (see :root variables at the top), dark mode
script.js       project filters, scroll reveals, active nav link
assets/         photo, project screenshots, resume PDF
```

## Publishing changes

Commit and push to `main`. GitHub Pages redeploys automatically within a minute or two.

## Updating

- **Add a project:** copy one `<article class="card">` block in `index.html`, edit the text and links,
  and set `data-tags` to any of `web`, `ai`, `math` so the filter buttons pick it up.
- **Swap the resume:** replace `assets/Rohan_Swaminathan_Resume.pdf` (keep the filename).
- **Swap the photo:** replace `assets/rohan.jpg` with a 4:5 portrait (e.g. 880×1100).
- **Change the accent color:** edit `--accent` in `style.css`.
