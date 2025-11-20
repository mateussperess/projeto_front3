export const APICONFIG = {
  endpoints: {
    popularMovies: (page = 1) => {
      return `https://api.themoviedb.org/3/discover/movie?include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`;
    },
    moviesByCountry: (page = 1) => {
      return `https://api.themoviedb.org/3/discover/movie?include_video=false&language=pt-BR&page=${page}&with_original_language=pt`;
    },
    moviesByGenre: (page = 1, genre) => {
      return `https://api.themoviedb.org/3/discover/movie?include_video=false&language=pt-BR&page=${page}&with_genres=${genre}`;
    },
    moviesByClassification: (page = 1, classification = "L") => {
      return `https://api.themoviedb.org/3/discover/movie?include_video=false&language=pt-BR&page=${page}&certification_country=BR&certification=${classification}&language=pt-BR`;
    },
    moviesByName: (page = 1, name) => {
      return `https://api.themoviedb.org/3/search/movie?query=${name}&language=pt-BR&page=${page}`;
    },
    searchGenres: () => {
      return `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR`;
    },
    searchClassifications: () => {
      return `https://api.themoviedb.org/3/certification/movie/list`;
    },
  },
  OPTIONS: {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8",
    },
  },
};
