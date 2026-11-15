# Sluurm

A purple, motion-softened movie and series discovery app. Built with React + Vite, using the TMDB API for movie and TV metadata.

## Run locally

1. Install Node.js (18+).
2. Copy `.env.example` to `.env`.
3. Get a TMDB API key from https://www.themoviedb.org/settings/api and put it in `.env`:

   ```env
   VITE_TMDB_API_KEY=your_key_here
   ```

4. Install and start:

   ```bash
   npm install
   npm run dev
   ```

## Features

- Trending, popular and top-rated movies and series
- Search across movie and TV titles
- Detail view with genres, overview, rating and trailer link
- Local watchlist saved in the current browser
- Responsive layout and no advertising integrations

Movie and TV metadata and images are provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.

## Attribution

Sluurm is a separate project. Its feature direction was informed by the public Cinejoy project (MIT License): https://github.com/Omarhussien072/Cinejoy. This implementation uses a fresh Sluurm interface and its own component structure. See the original project for its license terms.
