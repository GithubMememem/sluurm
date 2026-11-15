# Sluurm

A purple, motion-softened movie and series discovery interface inspired by Cinejoy's feature set.

## No API key required

Sluurm currently uses a small local catalogue bundled with the app. There is no TMDB API request, no API key, no `.env` file, and no secrets to configure. Movie poster and backdrop images are loaded from TMDB's public image CDN; the catalogue data itself is stored locally in `src/services/tmdb.js`.

## Run locally

```bash
npm install
npm run dev
```

## Features

- Local movie and series catalogue
- Trending, popular and top-rated shelves
- Search across the bundled titles
- Title detail view
- Local watchlist saved in the browser
- Responsive purple interface
- No advertisements or ad integrations

## Credits

Sluurm is a separate project. The original Cinejoy repository informed the feature direction and UI structure: https://github.com/Omarhussien072/Cinejoy (MIT License). Sluurm's current interface is a separate implementation; the original project license is included in this repository for reference.
