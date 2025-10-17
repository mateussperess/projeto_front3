const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8",
  },
};

const CACHE_KEY = 'tmdb_movies_cache';
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hora em milissegundos

class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.rating = data.vote_average;
    this.voteCount = data.vote_count;
    this.popularity = data.popularity;
    this.releaseDate = data.release_date;
    this.posterPath = data.poster_path;
    this.backdropPath = data.backdrop_path;
    this.adult = data.adult;
    this.originalLanguage = data.original_language;
    this.genreIds = data.genre_ids;
  }

  getPosterUrl(size = "w500") {
    return this.posterPath 
      ? `https://image.tmdb.org/t/p/${size}${this.posterPath}`
      : null;
  }

  getBackdropUrl(size = "w1280") {
    return this.backdropPath
      ? `https://image.tmdb.org/t/p/${size}${this.backdropPath}`
      : null;
  }

  getFormattedRating() {
    return this.rating.toFixed(1);
  }

  isHighRated(minRating = 7) {
    return this.rating >= minRating;
  }

  getReleaseYear() {
    return this.releaseDate ? new Date(this.releaseDate).getFullYear() : null;
  }
}

class MovieManager {
  constructor() {
    this.movies = [];
    this.totalPages = 0;
    this.totalResults = 0;
  }

  load(apiResponse) {
    this.movies = apiResponse.results.map(movieData => new Movie(movieData));
    this.totalPages = apiResponse.total_pages;
    this.totalResults = apiResponse.total_results;
    return this;
  }

  getAll() {
    return this.movies;
  }

  getById(id) {
    return this.movies.find(movie => movie.id === id);
  }

  getTopRated(minRating = 7) {
    return this.movies.filter(movie => movie.rating >= minRating);
  }

  sortByRating(descending = true) {
    return [...this.movies].sort((a, b) => 
      descending ? b.rating - a.rating : a.rating - b.rating
    );
  }

  sortByPopularity(descending = true) {
    return [...this.movies].sort((a, b) => 
      descending ? b.popularity - a.popularity : a.popularity - b.popularity
    );
  }

  search(term) {
    const searchTerm = term.toLowerCase();
    return this.movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.originalTitle.toLowerCase().includes(searchTerm)
    );
  }

  getByYear(year) {
    return this.movies.filter(movie => movie.getReleaseYear() === year);
  }

  getByGenre(genreId) {
    return this.movies.filter(movie => movie.genreIds.includes(genreId));
  }

  getStats() {
    if (this.movies.length === 0) return null;

    const ratings = this.movies.map(m => m.rating);
    return {
      total: this.movies.length,
      avgRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2),
      maxRating: Math.max(...ratings).toFixed(1),
      minRating: Math.min(...ratings).toFixed(1),
      highRated: this.movies.filter(m => m.rating >= 7).length
    };
  }
}

function saveToCache(data) {
  const cacheData = {
    timestamp: Date.now(),
    data: data
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  console.log('✅ Dados salvos no localStorage');
}

function getFromCache() {
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (!cached) {
    console.log('❌ Nenhum cache encontrado');
    return null;
  }

  const cacheData = JSON.parse(cached);
  const now = Date.now();
  const isExpired = (now - cacheData.timestamp) > CACHE_EXPIRATION;

  if (isExpired) {
    console.log('⏰ Cache expirado, será feita nova requisição');
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  console.log('✅ Dados recuperados do localStorage (cache válido)');
  return cacheData.data;
}

function clearCache() {
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ Cache limpo');
}

async function Api() {
  try {
    let data = getFromCache();

    if (!data) {
      console.log('🌐 Fazendo requisição para a API...');
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc",
        options
      );
      data = await response.json();
      
      saveToCache(data);
    }

    const movieManager = new MovieManager();
    movieManager.load(data);

    console.log("📊 Estatisticas:", movieManager.getStats());
    console.log("⭐ Top 5 por rating:", movieManager.sortByRating().slice(0, 5).map(m => ({
      title: m.title,
      rating: m.getFormattedRating()
    })));
    
    const firstMovie = movieManager.getAll()[0];
    console.log("🎬 Primeiro filme:", {
      title: firstMovie.title,
      rating: firstMovie.getFormattedRating(),
      year: firstMovie.getReleaseYear(),
      poster: firstMovie.getPosterUrl()
    });

    return movieManager;

  } catch (error) {
    console.error("❌ Erro na API:", error);
    return null;
  }
}

Api();

window.clearMovieCache = clearCache;
window.reloadMovies = () => {
  clearCache();
  Api();
};