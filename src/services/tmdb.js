const API_ROOT = 'https://api.themoviedb.org/3';
const KEY_STORAGE = 'sluurm-tmdb-credential-v1';

export const getApiKey = () => {
  try { return localStorage.getItem(KEY_STORAGE) || ''; } catch { return ''; }
};
export const setApiKey = (value) => {
  try {
    if (value) localStorage.setItem(KEY_STORAGE, value);
    else localStorage.removeItem(KEY_STORAGE);
  } catch {}
};

export const image = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path.startsWith('/') ? '' : '/'}${path}` : '';

async function tmdb(path, params = {}) {
  const credential = getApiKey().trim();
  if (!credential) throw new Error('Add your TMDB API key in Settings to load movies and series.');
  const url = new URL(API_ROOT + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
  });
  const headers = { accept: 'application/json' };
  if (credential.startsWith('eyJ')) headers.Authorization = `Bearer ${credential}`;
  else url.searchParams.set('api_key', credential);
  const response = await fetch(url, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = response.status === 401
      ? 'TMDB rejected that key. Check it in Settings and try again.'
      : response.status === 404 ? 'That title could not be found.'
      : data.status_message || `TMDB request failed (${response.status}).`;
    throw new Error(message);
  }
  return data;
}

export async function getFeed(kind = 'movie') {
  const base = kind === 'tv' ? '/tv' : '/movie';
  const [trending, popular, top] = await Promise.all([
    tmdb(`/trending/${kind}/week`, { page: 1 }),
    tmdb(`${base}/popular`, { page: 1 }),
    tmdb(`${base}/top_rated`, { page: 1 })
  ]);
  return {
    trending: (trending.results || []).map(x => ({ ...x, media_type: kind })),
    popular: (popular.results || []).map(x => ({ ...x, media_type: kind })),
    top: (top.results || []).map(x => ({ ...x, media_type: kind }))
  };
}

export async function getCollection(kind = 'movie', category = 'popular', page = 1) {
  const base = kind === 'tv' ? '/tv' : '/movie';
  const path = category === 'trending' ? `/trending/${kind}/week`
    : `${base}/${category === 'top' ? 'top_rated' : category}`;
  const data = await tmdb(path, { page });
  return { ...data, results: (data.results || []).map(x => ({ ...x, media_type: kind })) };
}

export async function getDetails(kind, id) {
  return tmdb(`/${kind}/${id}`, { append_to_response: 'videos,credits,recommendations,similar' });
}

export async function searchTitles(query, page = 1) {
  const data = await tmdb('/search/multi', { query, page, include_adult: false });
  return { ...data, results: (data.results || []).filter(x => x.media_type === 'movie' || x.media_type === 'tv') };
}

export async function getGenres(kind = 'movie') {
  const data = await tmdb(`/genre/${kind}/list`);
  return data.genres || [];
}
