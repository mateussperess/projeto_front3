import { MovieCard } from "./MovieCard.js";

export function MovieList() {
    this.movies = [];
    this.page = 1;
    this.totalPages = 1;
}

MovieList.prototype.clear = function () {
    this.movies = [];
    this.page = 1;
};

MovieList.prototype.addMovies = async function (movieArray) {
    for (const movie of movieArray) {
        const card = new MovieCard(movie);
        await card.setGenres(movie);
        this.movies.push(card);
    }
};

MovieList.prototype.renderCards = function (container) {
    container.innerHTML = "";

    this.movies.forEach(movieCard => {
        container.innerHTML += movieCard.toHTML();
    });
};

MovieList.prototype.setPagination = function (currentPage, totalPages) {
    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("total-pages").textContent = totalPages;

    if (this.hasNextPage()) {
      const loadMoreBtn = document.getElementById("load-more-btn");
      loadMoreBtn.style.display = totalPages;
    }

    // Will be use in the future with new filters 
    this.page = currentPage;
    this.totalPages = totalPages;
};

MovieList.prototype.hasNextPage = function () {
    return this.page < this.totalPages;
};
