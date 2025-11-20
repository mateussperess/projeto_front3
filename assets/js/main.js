import { request } from "./api/apiRequest.js";
import { APICONFIG } from "./configs/apiConfig.js";
import { pageConfig } from "./configs/pageConfig.js";
import { MovieList } from "./models/MovieList.js";

async function loadMovies(urlMovies) {
  pageConfig.currentUrlMovies = urlMovies;
  const data = await request(urlMovies);

  if (data && data.results) {
    const moviesList = new MovieList();
    await moviesList.addMovies(data.results);
    moviesList.renderCards(document.getElementById("movie-grid"));
    moviesList.setPagination(data.page, data.total_pages);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMovies(APICONFIG.endpoints.popularMovies(pageConfig.currentPage));
});
