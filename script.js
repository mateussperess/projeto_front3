const CACHE_KEY = 'tmdb_movies_cache';
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hora

let currentPage = 1;
let totalPages = 1;
let allMovies = [];

class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.rating = data.vote_average;
    this.posterPath = data.poster_path;
    this.releaseDate = data.release_date;
  }

  getPosterUrl(size = "w500") {
    return this.posterPath
      ? `https://image.tmdb.org/t/p/${size}${this.posterPath}`
      : "https://via.placeholder.com/500x750?text=Sem+Imagem";
  }

  getFormattedRating() {
    return this.rating.toFixed(1);
  }
}

function saveToCache(data) {
  const cacheData = {
    timestamp: Date.now(),
    data: data
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  console.log('Dados salvos no localStorage');
}

function getFromCache() {
  const cached = localStorage.getItem(CACHE_KEY);

  if (!cached) return null;

  const cacheData = JSON.parse(cached);
  const isExpired = (Date.now() - cacheData.timestamp) > CACHE_EXPIRATION;

  if (isExpired) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  console.log('Dados recuperados do cache');
  return cacheData.data;
}

async function loadMovies(page = 1, append = false) {
  let data;

  // usa cache na primeira página
  if (page === 1 && !append) {
    data = getFromCache();
  }

  if (!data) {
    data = await fetchMovies(page);
    if (data && page === 1) saveToCache(data);
  }

  if (data && data.results) {
    totalPages = data.total_pages;

    if (append) {
      allMovies = [...allMovies, ...data.results];
    } else {
      allMovies = data.results;
    }

    renderMovies(allMovies, append);
    updatePaginationInfo();
  }

  return data;
}

function criarCardMovie(movie) {
  const movieObj = new Movie(movie);

  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.src = movieObj.getPosterUrl();
  img.className = "card-img-top";
  img.alt = movieObj.title;
  img.loading = "lazy";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = movieObj.title;

  const overview = document.createElement("p");
  overview.className = "card-text";
  overview.textContent = movieObj.overview || 'Sem descrição disponível';

  const rating = document.createElement("p");
  rating.className = "card-text";
  rating.innerHTML = `<small class="text-body-secondary">⭐ ${movieObj.getFormattedRating()}</small>`;

  cardBody.appendChild(title);
  cardBody.appendChild(overview);
  cardBody.appendChild(rating);

  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

function renderMovies(movies, append = false) {
  const movieList = document.querySelector('#movie-list .row');

  if (!movieList) {
    console.error('Elemento #movie-list .row não encontrado!');
    return;
  }

  if (!append) {
    movieList.innerHTML = '';
  }

  console.log('Renderizando', movies.length, 'filmes');

  const moviesToRender = append ? movies.slice(-(movies.length - (currentPage - 1) * 20)) : movies;

  moviesToRender.forEach(movie => {
    const movieCard = criarCardMovie(movie);
    movieList.appendChild(movieCard);
  });
}

function updatePaginationInfo() {
  const currentPageEl = document.getElementById('current-page');
  const totalPagesEl = document.getElementById('total-pages');
  const loadMoreBtn = document.getElementById('load-more-btn');

  if (currentPageEl) currentPageEl.textContent = currentPage;
  if (totalPagesEl) totalPagesEl.textContent = totalPages;

  if (loadMoreBtn) {
    if (currentPage >= totalPages) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Todos os filmes carregados';
    } else {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Carregar Mais Filmes';
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM carregado, buscando filmes...');
  await loadMovies(currentPage);

  // botão de carregar mais
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', async () => {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Carregando...';

      currentPage++;
      await loadMovies(currentPage, true);

      window.scrollTo({
        top: document.body.scrollHeight - window.innerHeight - 200,
        behavior: 'smooth'
      });
    });
  }
});