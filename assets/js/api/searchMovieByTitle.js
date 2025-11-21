import { APICONFIG } from "../configs/apiConfig";
import { pageConfig } from "../configs/pageConfig";

export async function searchMovieByTitle() {
  const searchInput = document.getElementById("#search-input");
  const searchItem = searchInput?.value.trim()

  if(!searchItem) {
    alert("Por favor, informe o nome do filme!");
    return;
  }
}