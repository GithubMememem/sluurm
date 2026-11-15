# Sluurm

Sluurm is a movie and series discovery app built as a separate project from [Cinejoy](https://github.com/Omarhussien072/Cinejoy). It reuses adapted Cinejoy card and Swiper carousel components, with a redesigned purple, Xiaomi HyperOS-inspired interface.

## Movie and series data

Cinejoy's original catalogue service uses the **TMDB API** for trending titles, discovery, top-rated lists, search, genres, watch providers, trailers, recommendations and title details. Its image assets use TMDB's image CDN.

TMDB's API requires an API key. Because Sluurm must work with **no API key and no .env file**, it currently ships a small bundled catalogue of TMDB titles and metadata in `src/services/tmdb.js`, while poster/backdrop images continue to load from TMDB's public image CDN. The bundled catalogue is not a live TMDB feed and does not update automatically. The app does not make unauthenticated TMDB API requests or use a hidden key.

## Features

- Adapted Cinejoy interactive media cards and Swiper carousels
- Purple glass-style interface with responsive navigation
- Bundled movie and series catalogue using TMDB title metadata
- TMDB image CDN for posters and backdrops
- Trending, popular and top-rated shelves based on the bundled catalogue
- Search across bundled titles
- Title details and trailer links when available in the catalogue
- Local watchlist saved in the browser
- No advertisements or ad integrations
- No API key, .env file, or deployment secrets required

## Run locally

```bash
npm install
npm run dev
```

## Publish

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. It builds the Vite app and deploys the `dist` folder to GitHub Pages on every push to `main`. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** if it is not already.

## Credits and license

Cinejoy source: https://github.com/Omarhussien072/Cinejoy

Cinejoy is MIT-licensed. Adapted source components are identified in their file comments. The original MIT license notice is retained in this repository's `LICENSE` file.
