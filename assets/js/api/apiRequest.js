import { APICONFIG } from "../configs/apiConfig.js";

export async function request(url) {
  try {
    console.log("[DEBUG] sending request to: " + url)

    const req = await fetch(url, APICONFIG.OPTIONS);
    const data = await req.json()

    console.log("[DEBUG] received data: " + JSON.stringify(data))
    return data
  } catch (error) {
    console.log("[ERROR] error in request api: " + error)
    return {
        status: "error",
        message: "Erro ao buscar dados na API!"
    }
  }
}
