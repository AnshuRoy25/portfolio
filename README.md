# Anshu Roy, portfolio

Plain HTML, CSS and JS. No build step, no dependencies.

## Files

- `index.html` all the content
- `styles.css` the theme (colors are at the top under `:root`)
- `script.js` mobile menu and active nav link
- `assets/favicon.svg` tab icon

## Before you deploy

Search `index.html` for `EDIT:` and fill these in:

1. Email (Contact section): replace `you@example.com` in both spots, then remove the `<!--` and `-->` around it.
2. LinkedIn (Contact section): same thing with your profile URL.
3. Resume (top of page): drop `resume.pdf` into `assets/` and uncomment the Resume link.

## Run locally

Just open `index.html` in a browser, or:

```
npx serve .
```

## Deploy on Vercel

Drag the folder into vercel.com/new, or from the folder run `npx vercel`. Framework preset: Other. No build command, output directory is the root.
