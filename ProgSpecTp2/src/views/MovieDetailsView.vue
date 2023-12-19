<template>
    <h1>Id: {{ id }}</h1>
  <h2>{{ movieList.name }}</h2>
  <img
    :src="movie.imageUrl ? movie.imageUrl : 'https://placeimg.com/200/200/tech'" width="200"  style="float: right" />
  <h3>{{ movie.description }}</h3>
  <p>Prix: {{ movie.price }}</p>
  <p>Prix fixe? {{ movie.fixedPrice }}</p>
  <p>Discontinué? {{ movie.discontinued }}</p>
  <p>Date de modification: {{ movie.modifiedDate }}</p>
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
    getMovie(this.id).then(response => this.movie = response);
  },
};
</script>

<style lang="css" scoped></style>
