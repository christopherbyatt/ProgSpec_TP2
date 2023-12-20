<template>
  <h1>Id: {{ id }}</h1>
  <h2>{{ movie.title }}</h2>
  <img :src="movie.poster_path ? movie.poster_path : 'https://placehold.co/200x200'" width="200"  style="float: right" />
  <h3>{{ movie.vote_average }}/10</h3>
  <p>Date de sortie: {{ movie.release_date }}</p>
  <p>Synopsis: {{ movie.overview }}</p>
  <p>Durée: {{ movie.runtime }}</p>
  <p>Site web: {{ movie.homepage }}</p>
</template>

<script>
import { getMovie } from '@/services/MovieService.js';
import movieList from "../components/MovieList.vue";

export default {
  computed: {
    movieList() {
      return movieList
    }
  },
  data() {
    return {
      movie: Object,
    };
  },
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    getMovie(this.id).then(response => {
      this.movie = response;
      console.log(this.movie);
      document.title = 'Fiche de ' + this.movie.title + ' - TP2';
    });
  },
  methods: {
    getMoviePosterPath() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w200/${this.movie.poster_path}`
        : 'https://placehold.co/200x200';
    },
  },
};
</script>

<style lang="css" scoped;></style>
