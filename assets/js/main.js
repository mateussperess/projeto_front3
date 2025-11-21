import { request } from "./api/apiRequest.js";
import { getClassifications } from "./api/classificationsService.js";
import { getGenres } from "./api/genresService.js";
import { FILTERS, pageConfig } from "./configs/pageConfig.js";
import { MovieList } from "./models/MovieList.js";

async function loadMovies(urlMovies) {
  const data = await request(urlMovies);

  if (data && data.results) {
    const moviesList = new MovieList();
    await moviesList.addMovies(data.results);

    moviesList.renderCards(document.getElementById("movie-grid"));
    moviesList.setPagination(data.page, data.total_pages);

    pageConfig.currentPage = data.page;
    pageConfig.totalPages = data.total_pages;
    pageConfig.currentUrlMovies = urlMovies;

    updatePaginationButtons();
  }
}

function updatePaginationButtons() {
  document.getElementById("prev-btn").disabled = pageConfig.currentPage <= 1;
  document.getElementById("next-btn").disabled =
    pageConfig.currentPage >= pageConfig.totalPages;

  document.getElementById("current-page").textContent = pageConfig.currentPage;
  document.getElementById("total-pages").textContent = pageConfig.totalPages;
}

function goToPage(page) {
  if (page < 1 || page > pageConfig.totalPages) return;

  pageConfig.currentPage = page;
  let url;

  if (pageConfig.currentFilter === "country") {
    url = FILTERS.country.getUrl(pageConfig.selectedCountry, page);
  } else if (pageConfig.currentFilter === "genre") {
    url = FILTERS.genre.getUrl(pageConfig.selectedGenre, page);
  } else {
    url = FILTERS[pageConfig.currentFilter].getUrl(page);
  }

  loadMovies(url);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function changeFilter(filter) {
  pageConfig.currentFilter = filter;
  pageConfig.currentPage = 1;

  document.getElementById("page-title").textContent = FILTERS[filter].title;

  const wrapper = document.getElementById("dynamic-select-wrapper");
  const select = document.getElementById("dynamic-select");

  wrapper.classList.add("d-none");

  if (filter === "country") {
    wrapper.classList.remove("d-none");

    select.innerHTML = `
      <option value="pt">Brasil</option>
      <option value="en">Inglês</option>
      <option value="es">Espanhol</option>
      <option value="de">Alemão</option>
      <option value="it">Italiano</option>
    `;

    pageConfig.selectedCountry = select.value;

    loadMovies(FILTERS.country.getUrl(select.value, 1));
    return;
  }

  if (filter === "genre") {
    wrapper.classList.remove("d-none");

    const genres = await getGenres();

    select.innerHTML = "";
    genres.forEach((g) => {
      const option = document.createElement("option");
      option.value = g.id;
      option.textContent = g.name;
      select.appendChild(option);
    });

    pageConfig.selectedGenre = select.value;

    loadMovies(FILTERS.genre.getUrl(select.value, 1));
    return;
  }

  if (filter === "classification") {
    wrapper.classList.remove("d-none");

    const classifications = await getClassifications();

    select.innerHTML = "";
    classifications.forEach((classification) => {
      const option = document.createElement("option");
      option.value = classification.certification;
      option.textContent = classification.certification;

      if (classification.certification === "L") {
        option.selected = true;
      }

      select.appendChild(option);
    });

    pageConfig.selectedGenre = select.value;

    loadMovies(FILTERS.classification.getUrl(select.value, 1));
    return;
  }

  loadMovies(FILTERS[filter].getUrl(1));
}

document.addEventListener("DOMContentLoaded", () => {
  changeFilter("popular");

  document.getElementById("prev-btn").addEventListener("click", () => {
    goToPage(pageConfig.currentPage - 1);
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    goToPage(pageConfig.currentPage + 1);
  });

  document.querySelectorAll("[data-filter]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const filter = e.target.dataset.filter;

      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");

      changeFilter(filter);
    });
  });

  document.getElementById("dynamic-select").addEventListener("change", (e) => {
    const value = e.target.value;

    if (pageConfig.currentFilter === "country") {
      pageConfig.selectedCountry = value;
      loadMovies(FILTERS.country.getUrl(value, 1));
    }

    if (pageConfig.currentFilter === "genre") {
      pageConfig.selectedGenre = value;
      loadMovies(FILTERS.genre.getUrl(value, 1));
    }

    if (pageConfig.currentFilter === "classification") {
      pageConfig.selecteedClassification = value;
      loadMovies(FILTERS.classification.getUrl(value, 1));
    }
  });
});
