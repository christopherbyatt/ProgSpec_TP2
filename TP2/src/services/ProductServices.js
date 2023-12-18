let baseURL = 'https://www.themoviedb.org/settings/api';
let apiKey = '709ac29d0b957202c09b702fecbd98c3';
let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

const RESOURCE_NAME = "movies"

export async function getAllMovies() {
    const response = await fetch(baseURL + RESOURCE_NAME, headers);
    return await response.json();
}

export async function getMovie(id) {
    const response = await fetch(baseURL + RESOURCE_NAME + "/" + id, headers);
    let movie = await response.json;
    return movie;
}