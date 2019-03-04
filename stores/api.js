const APIKEY = "73be4d439ae0fc2041dab7522c37c14f"
const BASE_URL = "http://127.0.0.1:6006"

export const searchTvDiscover = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/tv?api_key=${APIKEY}&query=${query}`);
        return await response.json();
    } catch (e) {
        console.log("failed on searchTvDiscover API request, got: ", e)
        return null
    }
}

export const loadTvDiscover = async (page) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${APIKEY}&page=${page}`);
        return await response.json();
    } catch (e) {
        console.log("failed on loadTvDiscover API request, got: ", e)
        return
    }
}
