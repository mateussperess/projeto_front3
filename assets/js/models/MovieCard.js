import { getGenres } from "../api/genresService.js";
import { mapGenres } from "../utils/mapGenres.js";

export function MovieCard(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.poster = movie.poster_path;
    this.year = this.setYear(movie.release_date);
    this.vote = movie.vote_average;
    this.genres = []
}

MovieCard.prototype.setYear = function(usDate) {
    return usDate
      ? new Date(usDate).getFullYear()
      : "N/A"
}

MovieCard.prototype.setGenres = async function(movie) {
    const genres = await getGenres()
    const mappedGenres = mapGenres(movie.genre_ids, genres)
    this.genres = mappedGenres
}

MovieCard.prototype.getPoster = function () {
    if (!this.poster) {
        return "https://via.placeholder.com/500x750?text=Sem+Imagem";
    }
    return `https://image.tmdb.org/t/p/w500${this.poster}`;
};

MovieCard.prototype.getFormattedTitle = function () {
    if (!this.title) return "Título Desconhecido";
    if (this.title.length > 30) {
        return this.title.slice(0, 27) + "...";
    }
    return this.title;
};

MovieCard.prototype.toHTML = function () {
    return `
          <div class="col">
            <div class="card h-100 border-0 movie-card">
              <img src="${this.getPoster()}" class="movie-poster" alt="${this.getFormattedTitle()}">
              <div class="card-body">
                <h5 class="card-title text-truncate" title="${this.title}">${this.title
    }</h5>
                <p class="card-text">
                <small>${this.genres.join(" • ")}</small>
                </p>
                <p class="card-text">
                  <small>⭐ ${this.vote.toFixed(1)} • ${this.year}
                  </small>
                </p>
              </div>
            </div>
          </div>
        `;
};
