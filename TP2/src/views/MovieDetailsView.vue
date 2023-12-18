<template>
  <h1>Id: {{ id }}</h1>
  <h2>{{ movie.name }}</h2>
  <img
    :src="movie.imageUrl ? movie.imageUrl : 'https://placeimg.com/200/200/tech'"
    width="200"
    style="float: right"/>
  <h3>{{ movie.description }}</h3>
</template>

<script>
import {getMovie} from "../services/ProductServices";

export default {
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
    getMovie(this.id).then((response) => (this.movie = response));
  },
};
</script>