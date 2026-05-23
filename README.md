# Windal Quote Builder

Internal tool for **Wadhwa Enterprises / Windal** to create branded architectural glass and aluminium quotations with a live PDF preview and export.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and publish to GitHub Pages (`/quotation-builder/`) |
| `npm run recolor-logo` | Regenerate blue logo assets from `LOGO - Windal.png` (requires `sharp`) |
| `npm run lint` | ESLint |

## Features

- Split UI: quote form (left) and live PDF preview (right)
- Line items with dimensions, specs, and cropped technical drawings (PNG/JPEG)
- Excel/CSV import for bulk items
- Save/load quotes as `.windal` JSON templates
- Auto-save to browser `localStorage` (large drawings may hit storage limits — export templates as backup)
- PDF download with quote number as filename

## Template format (`.windal`)

JSON export containing `meta`, `client`, `project`, `items`, and `totals`. Load via **Load** in the header.

## Deployment

The app is configured for GitHub Pages with base path `/quotation-builder/` (see `vite.config.js`). Deploy with:

```bash
npm run deploy
```

## Brand assets

Place logos and award images under `src/assets/`. To regenerate PDF-friendly blue logos from the orange master:

```bash
npm run recolor-logo
```

Output: `src/assets/brand_assets/LOGO_Blue.png` and `LOGO_Blue.jpg`.

## Project layout

```
src/
  App.jsx                    # Shell, import/export, PDF viewer
  store/quoteStore.js        # Zustand state + persistence
  components/
    QuotationPDFDocument.jsx # PDF layout
    form/                    # Form sections
  utils/calculateTotals.js   # Shared pricing math
  constants/upi.js           # UPI payment URI (matches bank account on quote)
```
