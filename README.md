# rohanswami08.github.io

Personal portfolio site. Plain HTML, CSS, and JavaScript with no build step.

```
index.html      page content (edit project text here)
style.css       layout, colors (see :root variables at the top), dark mode
script.js       hero curve animation, project filters, scroll reveals
assets/         project screenshots + resume PDF
```

## Hosting on GitHub Pages

1. Create a new public repo named exactly **`rohanswami08.github.io`**.
2. Push the contents of this folder to the `main` branch:
   ```bash
   cd rohanswami08.github.io
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/rohanswami08/rohanswami08.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set Source to **Deploy from a branch**, pick `main` / `(root)`, and save.
4. After a minute, the site is live at **https://rohanswami08.github.io**. Your existing project pages
   (`/graphing-calculator`, `/learntocube`, `/flashcardmaker`) keep working at the same URLs.

## Updating

- **Add a project:** copy one `<article class="card">` block in `index.html`, edit the text and links,
  and set `data-tags` to any of `web`, `ai`, `math` so the filter buttons pick it up.
- **Swap the resume:** replace `assets/Rohan_Swaminathan_Resume.pdf` (keep the filename).
- **Change the accent color:** edit `--accent` in `style.css`.
