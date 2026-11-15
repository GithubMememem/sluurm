// Local catalogue. No API key, API requests, or .env file required.
const movies = [
  {id:1,title:"Interstellar",release_date:"2014-11-07",vote_average:8.7,poster_path:"gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",backdrop_path:"xJHokMbljvjADYdit5fK5VcsnhR.jpg",overview:"A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",genre_ids:[18,878,12],media_type:"movie"},
  {id:2,title:"The Batman",release_date:"2022-03-04",vote_average:7.7,poster_path:"74xTEgt7R36Fpooo50r9T25onhq.jpg",backdrop_path:"b0PlSFdDwbyK0cf5RxwDpa8G3h.jpg",overview:"Batman investigates corruption in Gotham City while pursuing a mysterious serial killer.",genre_ids:[80,9648,53],media_type:"movie"},
  {id:3,title:"Spider-Man: Across the Spider-Verse",release_date:"2023-06-02",vote_average:8.4,poster_path:"8Vt6mWEReuy4Of61Lnj5Xj.jpg",backdrop_path:"4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",overview:"Miles Morales is pulled into a multiverse of Spider-People and a new adventure.",genre_ids:[16,28,12],media_type:"movie"},
  {id:4,title:"Dune: Part Two",release_date:"2024-03-01",vote_average:8.2,poster_path:"1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",backdrop_path:"xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",overview:"Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",genre_ids:[878,12,28],media_type:"movie"},
  {id:5,title:"Everything Everywhere All at Once",release_date:"2022-03-25",vote_average:7.8,poster_path:"w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",backdrop_path:"ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",overview:"An exhausted laundromat owner discovers she may be the key to saving the multiverse.",genre_ids:[28,12,878],media_type:"movie"},
  {id:6,title:"Whiplash",release_date:"2014-10-10",vote_average:8.4,poster_path:"7fn624j5lj3xTme2SgiLCeuedmO.jpg",backdrop_path:"6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg",overview:"A young drummer enters a demanding music conservatory where ambition is pushed to its limits.",genre_ids:[18,10402],media_type:"movie"},
  {id:7,title:"The Grand Budapest Hotel",release_date:"2014-03-28",vote_average:8.0,poster_path:"eWdyYQreja6JGCzqHw5F2xZs5Jg.jpg",backdrop_path:"nX5XotM9yprCKarRH4fzOq1VM1J.jpg",overview:"A hotel concierge and his protégé become caught up in a mystery involving a priceless painting.",genre_ids:[35,18],media_type:"movie"},
  {id:8,title:"Blade Runner 2049",release_date:"2017-10-06",vote_average:8.0,poster_path:"gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",backdrop_path:"ilRyazdMJwN05exqhwK4tMKBYZs.jpg",overview:"A new blade runner uncovers a secret that could change the future of humanity.",genre_ids:[878,18],media_type:"movie"},
  {id:9,title:"Past Lives",release_date:"2023-06-02",vote_average:7.8,poster_path:"k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",backdrop_path:"k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",overview:"Two deeply connected childhood friends are wrested apart after one family emigrates.",genre_ids:[18,10749],media_type:"movie"},
  {id:10,title:"The Social Network",release_date:"2010-10-01",vote_average:7.7,poster_path:"n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",backdrop_path:"5Y2PN5YA602P6M2ZKJx3Z6L5G4f.jpg",overview:"The story of the people behind the creation of a world-changing social network.",genre_ids:[18],media_type:"movie"}
];
const shows = [
  {id:101,name:"Severance",first_air_date:"2022-02-18",vote_average:8.7,poster_path:"lFf6LLrQjYldcZItzOkGmMMIGwH.jpg",backdrop_path:"6oH378KUfCEitzJkm07r97L0RsZ.jpg",overview:"Employees at a mysterious company undergo a procedure that separates their work and personal memories.",media_type:"tv",genre_ids:[18,9648]},
  {id:102,name:"The Last of Us",first_air_date:"2023-01-15",vote_average:8.6,poster_path:"uKvVjHNqB5VmOrLy2gG9zJKAAZ.jpg",backdrop_path:"uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",overview:"A hardened survivor escorts a teenager across a dangerous changed world.",media_type:"tv",genre_ids:[18,10759]},
  {id:103,name:"Arcane",first_air_date:"2021-11-06",vote_average:9.0,poster_path:"fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",backdrop_path:"rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",overview:"Two sisters find themselves on opposing sides of a conflict between two cities.",media_type:"tv",genre_ids:[16,18,878]},
  {id:104,name:"The Bear",first_air_date:"2022-06-23",vote_average:8.3,poster_path:"y5Z0WesTjvn59jP6yo459eUsbli.jpg",backdrop_path:"y5Z0WesTjvn59jP6yo459eUsbli.jpg",overview:"A young chef returns home to run his family's sandwich shop.",media_type:"tv",genre_ids:[18,35]},
  {id:105,name:"Andor",first_air_date:"2022-09-21",vote_average:8.4,poster_path:"khZqmwHQicTYoS7Fl.jpg",backdrop_path:"g1z1ZvYKcmk9EnVOTYXR6vkNjkZ.jpg",overview:"A thief becomes involved in the growing rebellion against an oppressive empire.",media_type:"tv",genre_ids:[18,10765]}
];
const genres = {18:"Drama",878:"Science Fiction",12:"Adventure",28:"Action",80:"Crime",9648:"Mystery",53:"Thriller",16:"Animation",35:"Comedy",10402:"Music",10749:"Romance",10759:"Action & Adventure",10765:"Sci-Fi & Fantasy"};
export const image = (path,size="w500") => path ? "https://image.tmdb.org/t/p/"+size+"/"+path : "";
export async function getFeed(kind="movie") {
  const list = kind==="tv" ? shows : movies;
  return {trending:list,popular:[...list].reverse(),top:[...list].sort((a,b)=>b.vote_average-a.vote_average)};
}
export async function getDetails(kind,id) {
  const item=(kind==="tv"?shows:movies).find(x=>x.id===Number(id));
  if(!item) return null;
  return {...item,genres:(item.genre_ids||[]).map(id=>({id,name:genres[id]||"Drama"})),videos:{results:[]},credits:{cast:[]},recommendations:{results:[]}};
}
export async function searchTitles(q) {
  const term=q.toLowerCase();
  return {results:[...movies,...shows].filter(x=>(x.title||x.name).toLowerCase().includes(term))};
}
