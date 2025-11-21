import { request } from "./api/apiRequest.js";
import { APICONFIG } from "./configs/apiConfig.js";
import { pageConfig } from "./configs/pageConfig.js";
import { MovieList } from "./models/MovieList.js";

let totalPages = 1;

async function loadMovies(urlMovies) {
  pageConfig.currentUrlMovies = urlMovies;
  const data = await request(urlMovies);

  if (data && data.results) {
    const moviesList = new MovieList();
    await moviesList.addMovies(data.results);
    moviesList.renderCards(document.getElementById("movie-grid"));
    moviesList.setPagination(data.page, data.total_pages);
    
    totalPages = data.total_pages;
    updatePaginationButtons();
  }
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  prevBtn.disabled = pageConfig.currentPage <= 1;
  
  nextBtn.disabled = pageConfig.currentPage >= totalPages;
}

function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  
  pageConfig.currentPage = page;
  loadMovies(APICONFIG.endpoints.popularMovies(pageConfig.currentPage));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  prevBtn.addEventListener("click", () => {
    goToPage(pageConfig.currentPage - 1);
  });
  
  nextBtn.addEventListener("click", () => {
    goToPage(pageConfig.currentPage + 1);
  });
  
  loadMovies(APICONFIG.endpoints.popularMovies(pageConfig.currentPage));
});