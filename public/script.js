const tmdbKey = '211e93ef4c7d5aca4b3ce31e13737a60';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
// Get a random page number
  const requestParams =`?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
//   const requestParams2 = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randPage}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;


//   Get results using random page number
  const response = await fetch(urlToFetch);
  try {
    if(response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const pages = jsonResponse.total_pages;
    console.log(pages);
    const randPage = Math.floor(Math.random() * pages);
    // return randPage;
    
    console.log(randPage);
    const response2 = await fetch(`${urlToFetch}&page=${randPage}`);
    if(response2.ok) {
      const jsonResponse2 = await response2.json();
      console.log(jsonResponse2);
      const results = jsonResponse2.results;
      return results;   
    }
  }} catch(error) {
    console.log(error);
  }

};

// getMovies();

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch(error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;