const APIKEY = "73be4d439ae0fc2041dab7522c37c14f"
// const BASE_URL = "https://35.185.191.136:8080"
const BASE_URL = "https://35.198.203.55:8080"

export const searchTvDiscover = async ({query, page}) => {
    let paging = ""
    if (typeof page === "undefined") {
        page = 1
    }
    paging = `&page=${page}`
    try {
        const response = await fetch(`${BASE_URL}/search/tv?api_key=${APIKEY}&query=${query}${paging}`);
        return await response.json();
    } catch (e) {
        console.log("failed on searchTvDiscover API request, got: ", e)
        return null
    }
}

export const loadTvDiscover = async ({page}) => {
    try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${APIKEY}&page=${page}`);
        return await response.json();
    } catch (e) {
        console.log("failed on loadTvDiscover API request, got: ", e)
        return null
    }
}

export const loadTvDiscoverSummary = async ({tvID}) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/${tvID}?api_key=${APIKEY}`);
        return await response.json();
    } catch (e) {
        console.log("failed on load tv shows summary, got: ", e)
        return null
    }
}

export const loadTvDiscoverEpisode = async ({tvID, seasonID}) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/${tvID}/season/${seasonID}?api_key=${APIKEY}`);
        return await response.json();
    } catch (e) {
        console.log("failed on load tv shows detail, got: ", e)
        return null
    }
}