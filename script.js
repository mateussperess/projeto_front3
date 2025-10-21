const CACHE_KEY = 'tmdb_movies_cache';
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hora

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

// carregar filmes (cache ou API)
async function loadMovies() {
  let data = getFromCache();

  if (!data) {
    data = await fetchMovies();
    if (data) saveToCache(data);
  }

  return data;
}

function criarCardMovie(movie) {
  const movieObj = new Movie(movie);

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = movieObj.getPosterUrl();
  img.className = "card-img-top";
  img.alt = movieObj.title;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = movieObj.title;

  const overview = document.createElement("p");
  overview.className = "card-text";
  overview.textContent = movieObj.overview;

  const rating = document.createElement("p");
  rating.className = "card-text";
  rating.innerHTML = `<small class="text-body-secondary">${movieObj.getFormattedRating()}</small>`;

  cardBody.appendChild(title);
  cardBody.appendChild(overview);
  cardBody.appendChild(rating);

  card.appendChild(img);
  card.appendChild(cardBody);

  return card;
}

// carrega os filmes
async function renderMovies() {
  const data = await loadMovies();

  if (!data || !data.results) {
    console.error('Não foi possível carregar os filmes');
    return;
  }

  const cardGroup = document.querySelector('.card-group');
  cardGroup.innerHTML = ''; // Limpa os cards de exemplo

  data.results.slice(0, 3).forEach(movie => {
    const card = criarCardMovie(movie);
    cardGroup.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderMovies);