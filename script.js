// IMPORTANTE: Para este ambiente, o armazenamento persistente deve idealmente usar o Firebase Firestore
// em vez de localStorage para aplicativos multiusuário e compatibilidade total.
// Mantive o localStorage apenas para fins de demonstração de cache local.

let currentPage = 1;
let totalPages = 1;
let currentFilter = "popular";
let isSearchMode = false;

function getGenreName(genreIds) {
  return window.getGenreNameByIds(genreIds);
}

function createMovieCard(movie) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return `
  <div class="col">
    <div class="card h-100 shadow-sm border-0 rounded-3 movie-card">
      <img src="${posterUrl}" class="card-img-top rounded-top-3 movie-poster" alt="${movie.title
    }">
        <div class="card-body">
          <h5 class="card-title text-truncate" title="${movie.title}">${movie.title
    }</h5>
          <p class="card-text text-muted">
            <small>${getGenreName(
      movie.genre_ids
    )} | ⭐ ${movie.vote_average.toFixed(1)}</small>
          </p>
          <p class="card-text">
            <small class="text-muted">${movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "N/A"
    }</small>
          </p>
        </div>
    </div>
  </div>
  `;
}

async function loadMovies(filter, page = 1, append = false) {
  const data = await window.fetchMovies(page, filter);

  if (data && data.results) {
    const grid = document.getElementById("movie-grid");

    if (!append) {
      grid.innerHTML = "";
    }

    data.results.forEach((movie) => {
      grid.innerHTML += createMovieCard(movie);
    });

    currentPage = data.page;
    totalPages = data.total_pages;
    currentFilter = filter;

    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("total-pages").textContent = totalPages;

    const loadMoreBtn = document.getElementById("load-more-btn");
    loadMoreBtn.style.display =
      currentPage >= totalPages ? "none" : "block";
  }
}

async function performSearch(query) {
  const data = await window.searchMovies(query);

  if (data && data.results) {
    const grid = document.getElementById("movie-grid");
    grid.innerHTML = "";

    if (data.results.length === 0) {
      grid.innerHTML =
        '<div class="col-12"><p class="text-center text-muted">Nenhum filme encontrado.</p></div>';
    } else {
      data.results.forEach((movie) => {
        grid.innerHTML += createMovieCard(movie);
      });
    }

    document.getElementById(
      "page-title"
    ).textContent = `Resultados para: "${query}"`;
    document.getElementById("load-more-btn").style.display = "none";
    isSearchMode = true;
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  loadMovies("popular");

  // Navigation links
  document.querySelectorAll("[data-filter]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = e.target.dataset.filter;

      if (filter === "search") return;

      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");

      const titles = {
        popular: "Filmes Populares",
        country: "Filmes Brasileiros",
        genre: "Filmes de Ação",
        rating: "Filmes para Toda Família",
      };

      document.getElementById("page-title").textContent =
        titles[filter] || "Catálogo de Filmes";
      isSearchMode = false;
      loadMovies(filter);
    });
  });

  // Load more button
  document
    .getElementById("load-more-btn")
    .addEventListener("click", () => {
      loadMovies(currentFilter, currentPage + 1, true);
    });

  // Search functionality
  const searchBtn = document.getElementById("search-btn");
  const searchModal = document.getElementById("search-modal");
  const closeSearch = document.getElementById("close-search");
  const searchSubmit = document.getElementById("search-submit");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchModal.classList.add("active");
    searchInput.focus();
  });

  closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("active");
    searchInput.value = "";
  });

  searchSubmit.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query);
      searchModal.classList.remove("active");
      searchInput.value = "";
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchSubmit.click();
    }
  });

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("active");
    }
  });
});