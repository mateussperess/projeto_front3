import { APICONFIG } from "../configs/apiConfig.js";
import { request } from "./apiRequest.js";

const GENRES_KEY = "cached_genres";

export async function getGenres() {
    const genres = localStorage.getItem(GENRES_KEY);

    if (genres) {
        return JSON.parse(genres);
    }

    const data = await request(APICONFIG.endpoints.searchGenres())

    localStorage.setItem(GENRES_KEY, JSON.stringify(data.genres));
    return data.genres;
}
