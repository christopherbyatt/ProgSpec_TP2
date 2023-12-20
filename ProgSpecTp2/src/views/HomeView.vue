<template>
  <main>
    <h1>Accueil</h1>
    <p>Bienvenue sur notre site de critiques de films.</p>
    <br/>
    <MovieList :movies="movies" :page-size="3"></MovieList>
  </main>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { getNewestMovies } from '@/services/MovieService.js';

export default {
  components: {
    MovieList,
  },
  computed: {

  },
  data() {
    return {
      movies: []
    }
  },
  props: {

  },
  mounted() {
    getNewestMovies().then(response => this.movies = response);
    document.title = 'Accueil - TP2 Prog Spec';
  },
};
</script>
