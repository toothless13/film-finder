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
    // console.log(jsonResponse);
    let randPage = 1;
    const pages = jsonResponse.total_pages;
    if(pages <= 500) {
        randPage = Math.floor(Math.random() * pages);
    } else {
        randPage = Math.floor(Math.random() * 500);
    }
    // console.log(typeof randPage);
    // console.log(randPage);
    const response2 = await fetch(`${urlToFetch}&page=${randPage}`);
    if(response2.ok) {
      const jsonResponse2 = await response2.json();
      // console.log(jsonResponse2);
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
      // console.log(movieInfo);
      return movieInfo;
    }
  } catch(error) {
    console.log(error);
  }
};

const getCastInfo = async (movie) => {
  const movieID = movie.id;
  const movieEndpoint = `/movie/${movieID}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const movieCast = [];
      if(jsonResponse.cast.length > 3) {
      for(let i = 0; i < 3; i++) {
        movieCast.push(jsonResponse.cast[i].name);
      }
      // console.log(movieCast);
      return movieCast;
      } else {
        return movieCast;
      } 
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
  const cast = await getCastInfo(randomMovie);
  displayMovie(info, cast);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
playBtn.addEventListener('click', clearLikesDislikes);
const likeButton = document.getElementById('likeBtn');
const dislikeButton = document.getElementById('dislikeBtn');
likeButton.addEventListener('click', makeLikedDislikedVisible);
dislikeButton.addEventListener('click', makeLikedDislikedVisible);
playBtn.addEventListener('click', makeLikedDislikedHidden);