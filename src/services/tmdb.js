const BASE='https://v3-cinemeta.strem.io';
async function request(path){
 const res=await fetch(BASE+path,{headers:{accept:'application/json'}});
 if(!res.ok) throw new Error('The catalogue is temporarily unavailable. Try again in a moment.');
 return res.json();
}
function normalise(m,type){
 const kind=m.type||type||'movie', date=m.releaseInfo||m.year||'';
 return {...m,id:m.id,media_type:kind==='series'?'tv':'movie',
 title:kind==='series'?undefined:m.name,name:kind==='series'?m.name:undefined,
 poster:m.poster||'',background:m.background||'',overview:m.description||'',
 release_date:kind==='movie'?date:'',first_air_date:kind==='series'?date:'',
 genres:Array.isArray(m.genres)?m.genres:[],cast:Array.isArray(m.cast)?m.cast:[],
 imdb_url:m.id?'https://www.imdb.com/title/'+m.id+'/':'',
 imdbRating:m.imdbRating||''};
}
export async function getCatalog(kind='movie',page=1,query=''){
 const type=kind==='tv'||kind==='series'?'series':'movie';
 const search=query.trim()?'/search='+encodeURIComponent(query.trim()):'';
 const skip=Math.max(0,(page-1)*50);
 const data=await request('/catalog/'+type+'/top'+search+'.json?skip='+skip);
 const metas=Array.isArray(data.metas)?data.metas:[];
 return {results:metas.map(m=>normalise(m,type)),hasMore:metas.length>=50};
}
export async function getDetails(kind,id){
 const type=kind==='tv'||kind==='series'?'series':'movie';
 const data=await request('/meta/'+type+'/'+encodeURIComponent(id)+'.json');
 if(!data.meta)throw new Error('No details were returned for this title.');
 return normalise(data.meta,type);
}
export async function searchTitles(q,page=1){
 const [m,s]=await Promise.all([getCatalog('movie',page,q),getCatalog('tv',page,q)]);
 return {results:[...m.results,...s.results],hasMore:m.hasMore||s.hasMore};
}
