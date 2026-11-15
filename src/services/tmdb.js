// Local catalogue: no API key, network API, or .env file required.
const make = (id,title,release_date,vote_average,poster_path,backdrop_path,overview,genres=[]) => ({
  id,title,release_date,vote_average,poster_path,backdrop_path,overview,
  genre_ids: genres, media_type:"movie"
});
const movies = [
make(1,"Interstellar","2014-11-07",8.7,"gEU2QniE6E77NI6lCU6MxlNBvIx.jpg","xJHokMbljvjADYdit5fK5VcsnhR.jpg","A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",[18,878,12]),
make(2,"The Batman","2022-03-04",7.7,"74xTEgt7R36Fpooo50r9T25onhq.jpg","b0PlSFdDwbyK0cf5RxwDpa8G3h.jpg","Batman investigates corruption in Gotham City while pursuing a mysterious serial killer.",[80,9648,53]),
make(3,"Spider-Man: Across the Spider-Verse","2023-06-02",8.4,"8Vt6mWEReuy4Of61Lnj5Xj within.jpg","4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg","Miles Morales is pulled into a multiverse of Spider-People and a new adventure.",[16,28,12]),
make(4,"Dune: Part Two","2024-03-01",8.2,"1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg","xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg","Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",[878,12,28]),
make(5,"Everything Everywhere All at Once","2022-03-25",7.8,"w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg","ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg","An exhausted laundromat owner discovers she may be the key to saving the multiverse.",[28,12,878]),
make(6,"Whiplash","2014-10-10",8.4,"7fn624j5lj3xTme2SgiLCeuedmO.jpg","6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg","A young drummer enters a demanding music conservatory where ambition is pushed to its limits.",[18,10402]),
make(7,"The Grand Budapest Hotel","2014-03-28",8.0,"eWdyYQreja6JGCzqHw5F2xZs5Jg.jpg","nX5XotM9yprCKarRH4fzOq1VM1J.jpg","A hotel concierge and his protégé become caught up in a mystery involving a priceless painting.",[35, drama=18]),
make(8,"Blade Runner 2049","2017-10-06",8.0,"gajva2L0rPYkEWjzgFlBXCAVBE5.jpg","ilRyazdMJwN05exqhwK4tMKBYZs.jpg","A new blade runner uncovers a secret that could change the future of humanity.",[878,18]),
make(9,"Past Lives","2023-06-02",7.8,"k3waqVXSnvCZWfJYNtdamTgTtTA.jpg","k3waqVXSnvCZWfJYNtdamTgTtTA.jpg","Two deeply connected childhood friends are wrested apart after one family emigrates.",[18,10749]),
make(10,"The Social Network","2010-10-01",7.7,"n0ybibhJtQ5icDqTp8eRytcIHJx.jpg","5Y2PN5YA602P6M2ZKJx3Z6L5G4f.jpg","The story of the people behind the creation of a world-changing social network.",[18])
];
const shows = [
{id:101,name:"Severance",first_air_date:"2022-02-18",vote_average:8.7,poster_path:"lFf6LLrQjYldcZItzOkGmMMIGwH.jpg",backdrop_path:"6oH378KUfCEitzJkm07r97L0RsZ.jpg",overview:"Employees at a mysterious company undergo a procedure that separates their work and personal memories.",media_type:"tv",genre_ids:[18,9648]},
{id:102,name:"The Last of Us",first_air_date:"2023-01-15",vote_average:8.6,poster_path:"uKvVjHNqB5VmOr라는.jpg",backdrop_path:"uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",overview:"A hardened survivor escorts a teenager across a dangerous changed world.",media_type:"tv",genre_ids:[18,10759]},
{id:103,name:"Arcane",first_air_date:"2021-11-06",vote_average:9.0,poster_path:"fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",backdrop_path:"rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",overview:"Two sisters find themselves on opposing sides of a conflict between two cities.",media_type:"tv",genre_ids:[16,18,878]},
{id:104,name:"The Bear",first_air_date:"2022-06-23",vote_average:8.3,poster_path:"y5Z0WesTjvn59jP6yo459eUsbli.jpg",backdrop_path:"7t4b7k1Y6W8QpP7l9uJ3m2X8g4.jpg",overview:"A young chef returns home to run his family's sandwich shop.",media_type:"tv",genre_ids:[18,35]},
{id:105,name:"Andor",first_air_date:"2022-09-21",vote_average:8.4,poster_path:"khZqmwHQicTYoS7Fl모.jpg",backdrop_path:"g1z1ZvYKcmk9EnVOTYXR6vkNjkZ.jpg",overview:"A thief becomes involved in the growing rebellion against an oppressive empire.",media_type:"tv",genre_ids:[18,10765]}
];
const top = [...movies].sort((a,b)=>b.vote_average-a.vote_average);
export const image = (path,size="w500") => path ? "https://image.tmdb.org/t/p/"+size+"/"+path : "";
export async function getFeed(kind="movie") {
  const list = kind==="tv" ? shows : movies;
  return {trending:list, popular:[...list].reverse(), top:kind==="tv"?[...shows].sort((a,b)=>b.vote_average-a.vote_average):top};
}
export async function getDetails(kind,id) {
  const item=(kind==="tv"?shows:movies).find(x=>x.id===Number(id));
  if(!item) return null;
  return {...item,genres:(item.genre_ids||[]).map((id)=>({id,name:({18:"Drama",878:"Science Fiction",12:"Adventure",28:"Action",80:"Crime",9648:"Mystery",53:"Thriller",16:"Animation",35:"Comedy",10402:"Music",10749:"Romance",10759:"Action & Adventure",10765:"Sci-Fi & Fantasy"})[id]||"Drama"})),videos:{results:[]},credits:{cast:[]},recommendations:{results:[]}};
}
export async function searchTitles(q) {
  const term=q.toLowerCase();
  return {results:[...movies,...shows].filter(x=>(x.title||x.name).toLowerCase().includes(term))};
}
