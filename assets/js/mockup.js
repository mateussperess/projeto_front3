const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8",
  },
};

// ==================== MOCKUPS ====================

const MOCKUP_DATA = {
  popular: {
    page: 1,
    total_pages: 50,
    total_results: 1000,
    results: [
      {
        id: 1,
        title: "Avatar: O Caminho da Água",
        overview: "Ambientado mais de uma década após os eventos do primeiro filme, Avatar: O Caminho da Água começa a contar a história da família Sully.",
        vote_average: 7.8,
        poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        release_date: "2022-12-14"
      },
      {
        id: 2,
        title: "Homem-Aranha: Através do Aranhaverso",
        overview: "Miles Morales retorna para uma aventura épica que transportará o Homem-Aranha em tempo integral e amigável do bairro do Brooklyn.",
        vote_average: 8.5,
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        release_date: "2023-05-31"
      },
      {
        id: 3,
        title: "Guardiões da Galáxia Vol. 3",
        overview: "Peter Quill ainda está se recuperando da perda de Gamora, e deve reunir sua equipe para defender o universo.",
        vote_average: 8.1,
        poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        release_date: "2023-05-03"
      },
      {
        id: 4,
        title: "Oppenheimer",
        overview: "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
        vote_average: 8.3,
        poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        release_date: "2023-07-19"
      },
      {
        id: 5,
        title: "Barbie",
        overview: "Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano.",
        vote_average: 7.4,
        poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        release_date: "2023-07-19"
      },
      {
        id: 6,
        title: "John Wick 4: Baba Yaga",
        overview: "John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes, ele precisa enfrentar um novo inimigo.",
        vote_average: 7.9,
        poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        release_date: "2023-03-22"
      },
      {
        id: 7,
        title: "Missão Impossível: Acerto de Contas Parte 1",
        overview: "Ethan Hunt e sua equipe IMF embarcam em sua missão mais perigosa de todas.",
        vote_average: 7.7,
        poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        release_date: "2023-07-08"
      },
      {
        id: 8,
        title: "Velozes e Furiosos 10",
        overview: "Dom Toretto e sua família são alvos do filho vingativo do barão das drogas Hernan Reyes.",
        vote_average: 7.2,
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        release_date: "2023-05-17"
      }
    ]
  },

  brazil: {
    page: 1,
    total_pages: 20,
    total_results: 400,
    results: [
      {
        id: 101,
        title: "Cidade de Deus",
        overview: "Buscapé é um jovem pobre que cresce em um universo de muita violência. A fotografia é a sua única forma de expressão e também uma janela para o mundo.",
        vote_average: 8.4,
        poster_path: "/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
        release_date: "2002-08-30"
      },
      {
        id: 102,
        title: "Tropa de Elite",
        overview: "Nascimento, capitão do BOPE, tem que encontrar um substituto para sua cadeira antes que sua mulher dê à luz.",
        vote_average: 8.0,
        poster_path: "/5FQcIT1Eb8Pkn6TYlnxEVeXqBuO.jpg",
        release_date: "2007-10-05"
      },
      {
        id: 103,
        title: "O Auto da Compadecida",
        overview: "As aventuras de João Grilo e Chicó, dois nordestinos pobres que vivem de golpes para sobreviver.",
        vote_average: 8.5,
        poster_path: "/oKBzm8GCefn7rPEzcLmZz9G55GC.jpg",
        release_date: "2000-09-10"
      },
      {
        id: 104,
        title: "Bacurau",
        overview: "Poucos anos a partir de agora, Bacurau, um povoado do sertão brasileiro, é surpreendido com eventos estranhos.",
        vote_average: 7.6,
        poster_path: "/1xnSMyVutyWfEKDMCYVXq2hjUpy.jpg",
        release_date: "2019-08-29"
      },
      {
        id: 105,
        title: "Central do Brasil",
        overview: "Dora escreve cartas para analfabetos na estação Central do Brasil. Um dia, aparece uma mulher com seu filho.",
        vote_average: 7.8,
        poster_path: "/yJ55DTUnpFLj6V72RBVNFi4aRfq.jpg",
        release_date: "1998-04-03"
      },
      {
        id: 106,
        title: "Meu Nome Não é Johnny",
        overview: "A história real de João Guilherme Estrella, um jovem carioca de classe média que se tornou um dos maiores traficantes do Rio.",
        vote_average: 7.3,
        poster_path: "/zMW3033zXGqGVGdJDPOVnuQPHgY.jpg",
        release_date: "2008-01-04"
      }
    ]
  },

  action: {
    page: 1,
    total_pages: 100,
    total_results: 2000,
    results: [
      {
        id: 201,
        title: "Velozes e Furiosos 10",
        overview: "Dom Toretto e sua família são alvos do filho vingativo do barão das drogas Hernan Reyes.",
        vote_average: 7.2,
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        release_date: "2023-05-17"
      },
      {
        id: 202,
        title: "Missão Impossível: Acerto de Contas",
        overview: "Ethan Hunt e sua equipe IMF embarcam em sua missão mais perigosa de todas.",
        vote_average: 7.7,
        poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        release_date: "2023-07-08"
      },
      {
        id: 203,
        title: "John Wick 4",
        overview: "John Wick descobre um caminho para derrotar a Alta Cúpula.",
        vote_average: 7.9,
        poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        release_date: "2023-03-22"
      },
      {
        id: 204,
        title: "Guardiões da Galáxia Vol. 3",
        overview: "Peter Quill deve reunir sua equipe para defender o universo.",
        vote_average: 8.1,
        poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        release_date: "2023-05-03"
      },
      {
        id: 205,
        title: "Transformers: O Despertar das Feras",
        overview: "Uma nova aventura que levará o público através do tempo de volta aos anos 90.",
        vote_average: 7.4,
        poster_path: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
        release_date: "2023-06-06"
      }
    ]
  },

  pg: {
    page: 1,
    total_pages: 80,
    total_results: 1600,
    results: [
      {
        id: 301,
        title: "Toy Story 4",
        overview: "Woody sempre teve certeza sobre seu lugar no mundo e que sua prioridade era cuidar de seu dono.",
        vote_average: 7.7,
        poster_path: "/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
        release_date: "2019-06-20"
      },
      {
        id: 302,
        title: "Procurando Nemo",
        overview: "Nemo, um jovem peixe-palhaço, é capturado por mergulhadores. Seu pai superprotetor precisa encontrá-lo.",
        vote_average: 7.8,
        poster_path: "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
        release_date: "2003-05-30"
      },
      {
        id: 303,
        title: "Enrolados",
        overview: "A longa jornada de Rapunzel, a garota de longos cabelos dourados, para encontrar sua verdadeira família.",
        vote_average: 7.6,
        poster_path: "/ym7Kst6a4uodryxqbGOxmewF235.jpg",
        release_date: "2010-11-24"
      },
      {
        id: 304,
        title: "Shrek",
        overview: "Um ogro ranzinza é forçado a dividir seu pântano com criaturas de contos de fadas.",
        vote_average: 7.7,
        poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
        release_date: "2001-05-18"
      },
      {
        id: 305,
        title: "Homem-Aranha: Através do Aranhaverso",
        overview: "Miles Morales retorna para uma aventura épica no multiverso.",
        vote_average: 8.5,
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        release_date: "2023-05-31"
      }
    ]
  }
};

// ==================== CONFIGURAÇÃO ====================

const USE_MOCKUP = true; // TODO: ze, quando for usar a API real, muda isso pra false (ou só faz do zero msm e comenta o script lá no index)
let currentFilter = 'popular'; // filtro atual

// ==================== FUNÇÕES ====================

async function fetchMovies(page = 1, filter = 'popular') {
  if (USE_MOCKUP) {
    console.log(`[MOCKUP] Retornando dados mockados - Filtro: ${filter}, Página: ${page}`);

    await new Promise(resolve => setTimeout(resolve, 500));

    const mockupKey = {
      'popular': 'popular',
      'country': 'brazil',
      'genre': 'action',
      'rating': 'pg'
    }[filter] || 'popular';

    return MOCKUP_DATA[mockupKey];
  }

  try {
    console.log(`[API REAL] Fazendo requisição - Página ${page}, Filtro: ${filter}...`);

    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`;

    switch (filter) {
      case 'country':
        url += '&with_origin_country=BR';
        break;
      case 'genre':
        url += '&with_genres=28'; // 28 = filmes de açao
        break;
      case 'rating':
        url += '&certification_country=US&certification.lte=PG-13';
        break;
    }

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(`Filmes recebidos da página ${page}:`, data);
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    return null;
  }
}

// auxiliar para buscar por título (mockup simplificado)
async function searchMovies(query) {
  if (USE_MOCKUP) {
    console.log(`[MOCKUP] Buscando por: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtra resultados de todos os mockups
    const allResults = Object.values(MOCKUP_DATA).flatMap(data => data.results);
    const filtered = allResults.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      page: 1,
      total_pages: 1,
      total_results: filtered.length,
      results: filtered
    };
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error("Erro na busca:", error);
    return null;
  }
}