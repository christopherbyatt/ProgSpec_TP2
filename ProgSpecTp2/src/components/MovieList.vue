<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="prevPage" :disabled="pageNumber === 1">
      &lt; Previous
    </button>
    <label for="genre">Select Genre:</label>
    <select id="genre" v-model="selectedGenre" @change="filterByGenre">
      <option value="">Tous les genres</option>
      <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
    </select>
    Page {{ pageNumber }} of {{pageCount}}
    <button @click="nextPage" :disabled="pageNumber >= pageCount">
      Next &gt;
    </button>
    <ul class="movies">
      <li
          v-for="movie in paginatedMovies"
          :key="movie.id"
          v-bind:class="{
          discontinued: movie.discontinued,
          selected: selectedMovie === movie,
        }"
          @click="onSelect(movie)"
      >
        <span class="pop"><img :src="movie.poster_path ? movie.poster_path : 'https://placehold.co/100x100'" width="100"  style="float: left" /></span>
        <span class="title">{{ movie.title }}</span>
        <span class="date">{{ movie.release_date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMovie } from '@/services/MovieService.js';

export default {
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  data() {
    return {
      title: "Films",
      selectedMovie: null,
      pageNumber: 1,
      genres: [],
    };
  },
  computed: {
    pageCount() {
      let nbMovies = this.movies.length;
      return Math.floor(nbMovies / this.pageSize);
    },
    paginatedMovies() {
      let filteredMovies = this.movies;

      // Appliquer le filtre par genre si un genre est sélectionné
      if (this.selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => {
          return movie.genres.includes(this.selectedGenre);
        });
      }

      const start = (this.pageNumber - 1) * this.pageSize;
      const end = start + this.pageSize;

      return filteredMovies.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
      this.selectedMovie = null;
      document.title = 'Liste de films Page ' + this.pageNumber + ' - TP2'
    },
    prevPage() {
      this.pageNumber--;
      this.selectedMovie = null;
      document.title = 'Liste de films Page ' + this.pageNumber + ' - TP2'
    },
    onSelect(movie) {
      this.selectedMovie = movie;
      this.$router.push({ name: "movie", params: { id: movie.id, title: movie.title } });
    },
    filterByGenre() {
      this.pageNumber = 1;
      this.selectedMovie = null;
    },
  },
  mounted() {
    document.title = 'Liste de films Page ' + this.pageNumber + ' - TP2'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDlhYzI5ZDBiOTU3MjAyYzA5YjcwMmZlY2JkOThjMyIsInN1YiI6IjY1ODA3ZGY5M2E0OGM1M2JlNmFmNjY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxmQnNsAWPYT97Z0C44pRkH6DbWer5vt92t8u1-oMjY'
      }
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(response => {
          // Extract genre names and update the genres array
          this.genres = response.genres.map(genre => genre.name);
        })
        .catch(err => console.error(err));

    getMovie(this.selectedMovie).then(response => this.movieDetailed = response);
  },
};
</script>

<style lang="css" scoped>
.movies {
  margin: 0;
  list-style-type: none;
  padding: 0;
}
.movies li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #eee;
  margin: 0.5em;
  padding: 0.3em 0em;
  height: 8em;
  border-radius: 4px;
}
.movies li:hover {
  color: #607d8b;
  background-color: yellow;
  left: 0.1em;
}
.movies li:hover .pop,
.movies li:hover .date {
  color: #607d8b;
  background-color: #ffd800;
  left: 0.1em;
}
.movies li.selected {
  background-color: #0094ff;
  color: white;
}
.movies li.selected:hover {
  color: white;
}
.movies li.selected .pop,
.movies li.selected .date {
  background-color: #0026ff;
  color: white;
}
.movies .text {
  position: relative;
  top: -3px;
}
.movies .pop {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 8em;
  margin-right: 0.8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movies .date {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 8em;
  margin-left: 0.8em;
  border-radius: 0px 4px 4px 0px;
}
.movies .title {
  height: 8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
</style>