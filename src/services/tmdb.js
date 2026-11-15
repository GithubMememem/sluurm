const API = 'https://api.themoviedb.org/3';
export const IMG = 'https://image.tmdb.org/t/p/';
const KEY = import.meta.env.VITE_TMDB_API_KEY || '';

export async function tmdb(path, params = {}) {
  if (!KEY) throw new Error('Add your TMDB API key to the .env file to load live movies.');
  const query = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const response = await fetch(API + path + '?' + query.toString());
  if (!response.ok) throw new Error('TMDB request failed (' + response.status + '). Check your API key.');
  return response.json();
}
export const image = (path, size = 'w500') => path ? IMG + size + path : '';
export const getFeed = async (kind = 'movie') => {
  const [trending, popular, top] = await Promise.all([
    tmdb('/trending/' + kind + '/week'),
    tmdb('/' + kind + '/popular'),
    tmdb('/' + kind + '/top_rated')
  ]);
  return { trending: trending.results || [], popular: popular.results || [], top: top.results || [] };
};
export const getDetails = (kind, id) => tmdb('/' + kind + '/' + id, { append_to_response: 'videos,credits,recommendations' });
export const searchTitles = (q) => tmdb('/search/multi', { query: q, include_adult: 'false' });
