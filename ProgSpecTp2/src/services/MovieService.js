let baseURL = 'https://api.themoviedb.org/3/';
let callToApi = '?api_key=';
let apiKey = '709ac29d0b957202c09b702fecbd98c3';
let headers = {
  // Accept: "application/json",
  // "Content-Type": "application/json"
};

const RESOURCE_NAME = "movie";

export async function getAllMovies() {
  const response = await fetch(baseURL + RESOURCE_NAME + callToApi + apiKey , {headers: headers});
  return await response.json();
}

export async function getMovie(id) {
    const response = await fetch(baseURL + RESOURCE_NAME + '/' + id + callToApi + apiKey, {headers: headers});
    let movie = await response.json();
    return movie;
  }

