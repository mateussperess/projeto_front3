const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8",
  },
};

const MOCKUP_DATA = {
  popular: {
    page: 1,
    total_pages: 50,
    total_results: 1000,
    results: [
      {
        id: 1,
        title: "Avatar: O Caminho da Água",
        overview:
          "Ambientado mais de uma década após os eventos do primeiro filme, Avatar: O Caminho da Água começa a contar a história da família Sully.",
        vote_average: 7.8,
        poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        genre_ids: [1],
        release_date: "2022-12-14",
      },
      {
        id: 2,
        title: "Homem-Aranha: Através do Aranhaverso",
        overview:
          "Miles Morales retorna para uma aventura épica que transportará o Homem-Aranha em tempo integral e amigável do bairro do Brooklyn.",
        vote_average: 8.5,
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        genre_ids: [2],
        release_date: "2023-05-31",
      },
      {
        id: 3,
        title: "Guardiões da Galáxia Vol. 3",
        overview:
          "Peter Quill ainda está se recuperando da perda de Gamora, e deve reunir sua equipe para defender o universo.",
        vote_average: 8.1,
        poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        genre_ids: [1],
        release_date: "2023-05-03",
      },
      {
        id: 4,
        title: "Oppenheimer",
        overview:
          "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
        vote_average: 8.3,
        poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        genre_ids: [3],
        release_date: "2023-07-19",
      },
      {
        id: 5,
        title: "Barbie",
        overview:
          "Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano.",
        vote_average: 7.4,
        poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        genre_ids: [4],
        release_date: "2023-07-19",
      },
      {
        id: 6,
        title: "John Wick 4: Baba Yaga",
        overview:
          "John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes, ele precisa enfrentar um novo inimigo.",
        vote_average: 7.9,
        poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        genre_ids: [1],
        release_date: "2023-03-22",
      },
      {
        id: 7,
        title: "Missão Impossível: Acerto de Contas Parte 1",
        overview:
          "Ethan Hunt e sua equipe IMF embarcam em sua missão mais perigosa de todas.",
        vote_average: 7.7,
        poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        genre_ids: [1],
        release_date: "2023-07-08",
      },
      {
        id: 8,
        title: "Velozes e Furiosos 10",
        overview:
          "Dom Toretto e sua família são alvos do filho vingativo do barão das drogas Hernan Reyes.",
        vote_average: 7.2,
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        genre_ids: [1],
        release_date: "2023-05-17",
      },
    ],
  },
  brazil: {
    page: 1,
    total_pages: 20,
    total_results: 400,
    results: [
      {
        id: 101,
        title: "Cidade de Deus",
        overview:
          "Buscapé é um jovem pobre que cresce em um universo de muita violência.",
        vote_average: 8.4,
        poster_path: "/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
        genre_ids: [10],
        release_date: "2002-08-30",
      },
      {
        id: 102,
        title: "Tropa de Elite",
        overview:
          "Nascimento, capitão do BOPE, tem que encontrar um substituto para sua cadeira.",
        vote_average: 8.0,
        poster_path: "/5FQcIT1Eb8Pkn6TYlnxEVeXqBuO.jpg",
        genre_ids: [10],
        release_date: "2007-10-05",
      },
      {
        id: 103,
        title: "O Auto da Compadecida",
        overview:
          "As aventuras de João Grilo e Chicó, dois nordestinos pobres que vivem de golpes.",
        vote_average: 8.5,
        poster_path: "/oKBzm8GCefn7rPEzcLmZz9G55GC.jpg",
        genre_ids: [11],
        release_date: "2000-09-10",
      },
      {
        id: 104,
        title: "Bacurau",
        overview:
          "Poucos anos a partir de agora, Bacurau, um povoado do sertão brasileiro, é surpreendido com eventos estranhos.",
        vote_average: 7.6,
        poster_path: "/1xnSMyVutyWfEKDMCYVXq2hjUpy.jpg",
        genre_ids: [12],
        release_date: "2019-08-29",
      },
      {
        id: 105,
        title: "Central do Brasil",
        overview:
          "Dora escreve cartas para analfabetos na estação Central do Brasil.",
        vote_average: 7.8,
        poster_path: "/yJ55DTUnpFLj6V72RBVNFi4aRfq.jpg",
        genre_ids: [11],
        release_date: "1998-04-03",
      },
      {
        id: 106,
        title: "Meu Nome Não é Johnny",
        overview:
          "A história real de João Guilherme Estrella, um jovem carioca de classe média.",
        vote_average: 7.3,
        poster_path: "/zMW3033zXGqGVGdJDPOVnuQPHgY.jpg",
        genre_ids: [10],
        release_date: "2008-01-04",
      },
    ],
  },
  action: {
    page: 1,
    total_pages: 100,
    total_results: 2000,
    results: [
      {
        id: 201,
        title: "Velozes e Furiosos 10",
        overview:
          "Dom Toretto e sua família são alvos do filho vingativo do barão das drogas Hernan Reyes.",
        vote_average: 7.2,
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        genre_ids: [20],
        release_date: "2023-05-17",
      },
      {
        id: 202,
        title: "Missão Impossível: Acerto de Contas",
        overview:
          "Ethan Hunt e sua equipe IMF embarcam em sua missão mais perigosa.",
        vote_average: 7.7,
        poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        genre_ids: [20],
        release_date: "2023-07-08",
      },
      {
        id: 203,
        title: "John Wick 4",
        overview:
          "John Wick descobre um caminho para derrotar a Alta Cúpula.",
        vote_average: 7.9,
        poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        genre_ids: [20],
        release_date: "2023-03-22",
      },
      {
        id: 204,
        title: "Guardiões da Galáxia Vol. 3",
        overview:
          "Peter Quill deve reunir sua equipe para defender o universo.",
        vote_average: 8.1,
        poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        genre_ids: [21],
        release_date: "2023-05-03",
      },
      {
        id: 205,
        title: "Transformers: O Despertar das Feras",
        overview:
          "Uma nova aventura que levará o público através do tempo de volta aos anos 90.",
        vote_average: 7.4,
        poster_path: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
        genre_ids: [21],
        release_date: "2023-06-06",
      },
    ],
  },
  pg: {
    page: 1,
    total_pages: 80,
    total_results: 1600,
    results: [
      {
        id: 301,
        title: "Toy Story 4",
        overview: "Woody sempre teve certeza sobre seu lugar no mundo.",
        vote_average: 7.7,
        poster_path: "/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
        genre_ids: [30],
        release_date: "2019-06-20",
      },
      {
        id: 302,
        title: "Procurando Nemo",
        overview:
          "Nemo, um jovem peixe-palhaço, é capturado por mergulhadores.",
        vote_average: 7.8,
        poster_path: "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
        genre_ids: [30],
        release_date: "2003-05-30",
      },
      {
        id: 303,
        title: "Enrolados",
        overview:
          "A longa jornada de Rapunzel, a garota de longos cabelos dourados.",
        vote_average: 7.6,
        poster_path: "/ym7Kst6a4uodryxqbGOxmewF235.jpg",
        genre_ids: [31],
        release_date: "2010-11-24",
      },
      {
        id: 304,
        title: "Shrek",
        overview:
          "Um ogro ranzinza é forçado a dividir seu pântano com criaturas de contos de fadas.",
        vote_average: 7.7,
        poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
        genre_ids: [31],
        release_date: "2001-05-18",
      },
      {
        id: 305,
        title: "Homem-Aranha: Através do Aranhaverso",
        overview:
          "Miles Morales retorna para uma aventura épica no multiverso.",
        vote_average: 8.5,
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        genre_ids: [30],
        release_date: "2023-05-31",
      },
    ],
  },
};

window.currentFilter = "popular";
const USE_MOCKUP = true;

window.getGenreNameByIds = function (ids) {
  if (!ids || !ids.length) return "Não Classificado";
  const firstId = ids[0];
  if (firstId >= 1 && firstId < 10) return "Ação / Sci-fi";
  if (firstId >= 10 && firstId < 20) return "Nacional / Drama";
  if (firstId >= 20 && firstId < 30) return "Ação / Aventura";
  if (firstId >= 30 && firstId < 40) return "Animação / Família";
  return "Gênero Desconhecido";
};

async function fetchMovies(page = 1, filter = "popular") {
  if (USE_MOCKUP) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockupKey =
      {
        popular: "popular",
        country: "brazil",
        genre: "action",
        rating: "pg",
      }[filter] || "popular";
    const mockData = MOCKUP_DATA[mockupKey];
    if (page > 1) {
      return {
        ...mockData,
        results: [],
        page: page,
        total_pages: mockData.total_pages,
      };
    }
    return mockData;
  }
}

async function searchMovies(query) {
  if (USE_MOCKUP) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const allResults = Object.values(MOCKUP_DATA).flatMap(
      (data) => data.results
    );
    const filtered = allResults.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return {
      page: 1,
      total_pages: 1,
      total_results: filtered.length,
      results: filtered,
    };
  }
}

window.fetchMovies = fetchMovies;
window.searchMovies = searchMovies;

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
    : "https://via.placeholder.com/500x750/1e293b/6366f1?text=Sem+Imagem";

  return `
          <div class="col">
            <div class="card h-100 border-0 movie-card">
              <img src="${posterUrl}" class="movie-poster" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title text-truncate" title="${movie.title}">${movie.title
    }</h5>
                <p class="card-text">
                  <small>${getGenreName(movie.genre_ids)}</small>
                </p>
                <p class="card-text">
                  <small>⭐ ${movie.vote_average.toFixed(1)} • ${movie.release_date
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
        '<div class="col-12"><p class="text-center" style="color: var(--muted-text);">Nenhum filme encontrado.</p></div>';
    } else {
      data.results.forEach((movie) => {
        grid.innerHTML += createMovieCard(movie);
      });
    }

    document.getElementById(
      "page-title"
    ).textContent = `🔍 Resultados para: "${query}"`;
    document.getElementById("load-more-btn").style.display = "none";
    isSearchMode = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMovies("popular");

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
        country: "🇧🇷 Filmes Brasileiros",
        genre: "💥 Filmes de Ação",
        rating: "👨‍👩‍👧‍👦 Filmes para Toda Família",
      };

      document.getElementById("page-title").textContent =
        titles[filter] || "Catálogo de Filmes";
      isSearchMode = false;
      loadMovies(filter);
    });
  });

  document
    .getElementById("load-more-btn")
    .addEventListener("click", () => {
      loadMovies(currentFilter, currentPage + 1, true);
    });

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