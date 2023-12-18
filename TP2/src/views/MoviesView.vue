<template>
  <MovieList : movies="movies" :page-size="5"></MovieList>
</template>

<script setup>
import MovieList from "../components/MovieList.vue";
import {getAllMovies} from "../services/ProductServices";

export default {
  components: {
    MovieList,
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    getAllMovies().then((response) => (this.movies = response));
  },
};
</script>