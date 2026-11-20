# Sluurm

Sluurm is a movie and series discovery app, built separately from [Cinejoy](https://github.com/Omarhussien072/Cinejoy). It adapts Cinejoy's original interactive Card and Swiper Carousel components and its cinematic, full-bleed home-page approach, with a restrained Xiaomi HyperOS-inspired purple accent.

## Live movie and series data

Sluurm uses the TMDB API for trending titles, popular and top-rated lists, search, genres, title details, cast, recommendations and trailers. It is no longer a bundled demo catalogue.

### Connect your TMDB credential

1. Create a free account at [TMDB](https://www.themoviedb.org/).
2. Open [API settings](https://www.themoviedb.org/settings/api) and request an API credential.
3. Open Sluurm → **Settings**.
4. Paste either your **API Read Access Token** (the long JWT-style token) or your **v3 API key**, then choose **Save and connect**.

The credential is stored in this browser's local storage and sent directly from the browser to TMDB. It is not included in this repository, committed to GitHub, or uploaded to a Sluurm server. Anyone with access to this browser profile can access its local storage, so use your own credential and remove it from Settings on shared devices.

## Features

- Live TMDB trending, popular and top-rated movie and TV shelves
- Paginated browse lists and search results, not a hardcoded 15-title catalogue
- Search across movies and TV series
- Working title detail requests with synopsis, genres, cast, recommendations and YouTube trailers when TMDB provides them
- Cinejoy-derived hover cards and Swiper carousel navigation
- Cinematic hero layout and floating glass navigation
- Local watchlist saved in the browser
- Responsive mobile and desktop layouts
- No ads or ad integrations

Sluurm is a discovery app. TMDB provides metadata and trailer references; it does not provide full-movie streaming rights or playback.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Run locally

```bash
npm install
npm run dev
```

## Publish

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. It builds the Vite app and deploys the `dist` folder to GitHub Pages on every push to `main`. In the repository's **Settings → Pages**, set the source to **GitHub Actions** if it is not already.

## Credits and license

Cinejoy source: https://github.com/Omarhussien072/Cinejoy

Cinejoy is MIT-licensed. Adapted source components are identified in their file comments. The original MIT license notice is retained in this repository's `LICENSE` file.
