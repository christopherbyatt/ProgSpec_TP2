<template>
  <MovieList :movies="movies" :page-size="5"></MovieList>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { getAllMovies } from '@/services/MovieService.js';

export default {
  components: {
    MovieList,
  },
  data() {
    return {
      movies: []
    }
  },
  mounted() {
    getAllMovies().then(response => this.movies = response);
  },
};
</script>
