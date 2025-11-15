const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8",
  },
};

async function fetchMovies(page = 1) {
  try {
    console.log(`Fazendo requisição para a API - Página ${page}...`);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
      options
    );
    const data = await response.json();
    console.log(`Filmes recebidos da página ${page}:`, data);
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    return null;
  }
}