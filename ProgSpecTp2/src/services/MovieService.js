const url = 'https://api.themoviedb.org/3/';
const apiKey = '709ac29d0b957202c09b702fecbd98c3';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDlhYzI5ZDBiOTU3MjAyYzA5YjcwMmZlY2JkOThjMyIsInN1YiI6IjY1ODA3ZGY5M2E0OGM1M2JlNmFmNjY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxmQnNsAWPYT97Z0C44pRkH6DbWer5vt92t8u1-oMjY',
        // 'api-key': apiKey,
    }
};



const RESOURCE_NAME = "movie";

export async function getAllMovies() {
    try {
        const response = await fetch(url + RESOURCE_NAME + '/' + 'changes', options);
        const movies = await response.json();
        const movieArray = movies.results;

        // .map proposed by ChatGPT to solve foreach not working properly in async
        const movieDetailsPromises = movieArray.map(async (aMovie) => {
            const responseDetails = await fetch(url + RESOURCE_NAME + '/' + aMovie.id, options);
            const aMovieDetails = await responseDetails.json();
            aMovie.title = aMovieDetails.title;
            aMovie.release_date = aMovieDetails.release_date;
            aMovie.vote_average = aMovieDetails.vote_average;
            aMovie.poster_path = aMovieDetails.poster_path;
            aMovie.overview = aMovieDetails.overview;
            aMovie.runtime = aMovieDetails.runtime;
            aMovie.homepage = aMovieDetails.homepage;
            aMovie.genres = aMovieDetails.genres;
        });

        // Wait for all promises to resolve
        await Promise.all(movieDetailsPromises);

        console.log(movieArray);
        return movieArray;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getMovie(id) {
    const response = await fetch(url + RESOURCE_NAME + '/' + id, options);
    const movie = await response.json();
    return movie;
}