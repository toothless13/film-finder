// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// Clear the stored likes and dislikes
const clearLikesDislikes = () => {
    const movieLikeDiv = document.getElementById('likedPosters');
    const movieDislikeDiv = document.getElementById('dislikedPosters');
    movieLikeDiv.innerHTML = '';
    movieDislikeDiv.innerHTML = '';
}

// Make stored likes and dislikes visible
const makeLikedDislikedVisible = () => {
    const likedOrDisliked = document.getElementById('likeOrDislikeStore');
    likedOrDisliked.style.visibility = 'visible';
    const likeButton = document.getElementById('likeBtn');
    likeButton.removeEventListener('click', this.makeLikedDislikedVisible);
    const dislikeButton = document.getElementById('dislikeBtn');
    dislikeButton.removeEventListener('click', this.makeLikedDislikedVisible);
}

// Makes stored likes and dislikes hidden
const makeLikedDislikedHidden = () => {
    const likedOrDisliked = document.getElementById('likeOrDislikeStore');
    likedOrDisliked.style.visibility = 'hidden';
    const likeButton = document.getElementById('likeBtn');
    likeButton.addEventListener('click', this.makeLikedDislikedVisible);
    const dislikeButton = document.getElementById('dislikeBtn');
    dislikeButton.addEventListener('click', this.makeLikedDislikedVisible);
}

// Adds current movie to the movieLikeDiv
const addCurrentMovieToLikeOrDislike = (likeOrDislike) => {
    const moviePoster = document.getElementById('moviePoster');
    // const likeOrDislike = 'likeOrDislike';
    const movieLikeDislikeDiv = document.getElementById(`${likeOrDislike}`);

    const moviePosterClone = moviePoster.firstChild.cloneNode(true);
    // moviePosterClone.setAttribute('id', 'moviePosterClone');
    moviePosterClone.style.setProperty('width', '20%');
    moviePosterClone.style.setProperty('margin', '0');
    movieLikeDislikeDiv.append(moviePosterClone);
}

// After liking a movie, adds movie to liked movie section, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    addCurrentMovieToLikeOrDislike('likedPosters');
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    // Need to add code that pushes disliked movie to disliked 
    addCurrentMovieToLikeOrDislike('dislikedPosters');
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
    posterImg.setAttribute('class', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

// Create HTML for movie date
const createMovieDate = (date) => {
    const movieDate = document.createElement('p');
    movieDate.setAttribute('id', 'movieDate');
    const dateFormatted = new Date(Date.parse(date));
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric'};
    movieDate.innerHTML = `<p><strong>Release Date:</strong>&emsp;${dateFormatted.toLocaleDateString('en-gb', dateOptions)}</p>`;

    return movieDate;
}

// Create HTML for movie cast
const createMovieCast = (cast) => {
    if(cast.length > 0){
    const movieCast = document.createElement('p');
    movieCast.setAttribute('id', 'movieCast');
    let castList = cast.slice(0, 2);
    castList = castList.join(', ');
    castList = `${castList} and ${cast[2]}`;
    movieCast.innerHTML = `<p><strong>Top Cast:</strong>&emsp;${castList}</p>`;
    return movieCast;
    }
}



// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo, castInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    const releaseDate = createMovieDate(movieInfo.release_date);
    const topCast = createMovieCast(castInfo);
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(releaseDate);
    movieTextDiv.appendChild(topCast);

  
    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};