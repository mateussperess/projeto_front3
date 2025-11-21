import { APICONFIG } from "./apiConfig.js";

// Maibe we not use this config. Problably will be a page configuration class
export const pageConfig = {
  currentPage: 1,
  totalPages: 1,
  currentUrlMovies: null,
  isSearchMode: false,
  selectedGenre: null,
  selectedCountry: null,
  selecteedClassification: null
};

export const FILTERS = {
  popular: {
    title: "Filmes Populares",
    getUrl: (page) => APICONFIG.endpoints.popularMovies(page),
  },
  genre: {
    title: "Filtrar por Gênero",
    getUrl: (genreId, page) => APICONFIG.endpoints.moviesByGenre(genreId, page),
  },
  country: {
    title: "Filtrar por País",
    getUrl: (country, page) => APICONFIG.endpoints.moviesByCountry(country, page),
  },
  classification: {
    title: "Filtrar por Classificação",
    getUrl: (classification, page) => APICONFIG.endpoints.moviesByClassification(classification, page),
  },
};
