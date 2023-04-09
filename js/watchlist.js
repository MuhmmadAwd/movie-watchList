let data
try {
    data = JSON.parse(localStorage.getItem('watchlist'))
} catch (error) {
    data = null
}
renderWatchList(data)



function renderWatchList(data) {
    document.querySelector(".data-wrapper").innerHTML = getWatchListHtml(data)

    const watchlistWrapper = document.querySelector(".watchlist-wrapper")

    document.addEventListener("click", removeFromWatchlist)
}

function getWatchListHtml(data) {
    let watchList = ''
    if (!data) {
        watchList = `
        <div class="wrapper">
            <div class="watchlist-placeholder">
                <h2>Your watchlist is looking a little empty...</h2>
                <div>
                    <a href="index.html">
                        <img src="./images/plus.png">
                        <p>Let's add some movies!</p>
                    </a>
                </div>
            </div>
        </div>
        `
        return watchList
    } else {
        data.map((movie) => {
            const movieHtml = movie.movieHtml.replace("plus", "minus")
            watchList += `
            ${movieHtml}
            <hr>
            `
            return watchList
        })
        return watchList
    }


}

function removeFromWatchlist(e) {
    if (e.target.dataset.id === "watchlist") {
        const movieElement = e.target.closest(".movie")
        const Id = movieElement.id;
        const movieHtml = movieElement.outerHTML
        let index = data.findIndex((movie) => {
            if (Id == movie.Id) {
                return movie
            }
        })
        data.splice(index, 1)
        localStorage.setItem("watchlist", JSON.stringify(data));
        renderWatchList(data)
    }
}
