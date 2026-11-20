# Sluurm

A cinematic movie and series discovery app with a dark violet palette, floating navigation, poster shelves, animated hover cards and a local watchlist.

## No API key or sign-up

Sluurm uses the public Cinemeta metadata catalogue used by Stremio. It does not ask you to create a TMDB developer application, enter contact details, or paste an API key.

- Movie and series catalogues
- Search across both catalogues
- Title details, synopsis, cast and genres when available
- IMDb links for title reference
- Local My List saved in the browser
- Cinejoy-derived animated Card and Swiper carousel components
- No ads

Cinemeta is a community metadata service, not a guaranteed commercial API. Availability and catalogue coverage depend on its upstream service. It provides metadata and artwork, not full-movie streaming or playback. See the [official Stremio documentation](https://github.com/Stremio/stremio-addons/blob/master/docs/tutorial/using-cinemeta.md).

## Run locally

```bash
npm install
npm run dev
```

## Deployment

GitHub Actions builds the Vite app and publishes it to GitHub Pages on pushes to `main`. If GitHub Pages has not been enabled yet, choose **Settings → Pages → GitHub Actions**.

## Design source

The animated poster card and Swiper carousel are adapted from [Cinejoy](https://github.com/Omarhussien072/Cinejoy). Sluurm is a separate project with its own branding, layout and styling. The original MIT license notice is retained in `LICENSE`.
