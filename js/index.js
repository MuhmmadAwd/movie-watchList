let searchInput = null
let movieList = null
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []


function init() {
    renderMovieList(movieList)

    searchInput = document.querySelector(".search-input")

    searchInput.addEventListener("change", getMovieName)
}

function getMovieName() {
    const movieName = searchInput.value
    getMoviesData(movieName)
    searchInput.value = ""
}

async function getMoviesData(movieName) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6dc3a7fd65156d4b3236883b015d8470&language=en-US&query=${movieName}&include_adult=false`)
    const data = await res.json()

    getMovieListHtml(data.results)
}

function getMovieListHtml(data) {
    movieList = ""
    data.map((movie) => {
        const { id, title, poster_path, vote_average, release_date, overview } = movie
        const Year = new Date(`${release_date}`).getFullYear()
        movieList += `
        <article id="${id}" class="movie">
            <div class="movie__image">
                <img class="poster" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="No poster available">
            </div>
            <div class="movie__data">
                <div class="movie__header">
                    <h3>${title} <span class="release-year">(${Year})</span></h3>
                    <div>
                        <img src="./images/star.png">
                        <p class="rating">${vote_average}</p>
                    </div>
                </div>

                <div class="movie__metadata">
                    <p class="runtime">${release_date}</p>
                    <div  class="watchlist-wrapper">
                        <img class="add" src="./images/plus.png">
                        <p class="add" data-id="watchlist">Watchlist</p>
                    </div>
                </div>

                <div class="movie__desc">
                    <p class="plot">${overview}</p>

                </div>
            </div>
        </article>
        <hr>

        `
        return movieList
    })
    renderMovieList(movieList)
}

function renderMovieList(movieList) {
    const movieListInit = `
    <div class="start-exploring">
        <img src="./images/film.png">
        <h3>Start exploring</h3>
    </div>
    `
    document.querySelector(".data-wrapper").innerHTML = movieList ? movieList : movieListInit

    if (movieList) {
        const watchlistWrapper = document.querySelector(".watchlist-wrapper")

        document.addEventListener("click", addToWatchlist)
    }
}

function addToWatchlist(e) {

    if (e.target.dataset.id === "watchlist") {
        const movieElement = e.target.closest(".movie")
        const Id = movieElement.id;
        const movieHtml = movieElement.outerHTML
        if (!watchlist.some(movie => movie.Id == Id)) {
        watchlist.push({ Id, movieHtml })
        }
        let stringWatchlist = JSON.stringify(watchlist)
        localStorage.setItem("watchlist", stringWatchlist)

    }
}

document.addEventListener("DOMContentLoaded", init)
