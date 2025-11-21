import { APICONFIG } from "../configs/apiConfig.js";
import { request } from "./apiRequest.js";

const CLASSIFICATIONS_KEY = "chached_classifications";

export async function getClassifications() {
    const classifications = localStorage.getItem(CLASSIFICATIONS_KEY);

    if (classifications) {
        return JSON.parse(classifications);
    }

    const data = await request(APICONFIG.endpoints.searchClassifications())

    localStorage.setItem(CLASSIFICATIONS_KEY, JSON.stringify(data.certifications.BR));
    return data.certifications.BR;
}
