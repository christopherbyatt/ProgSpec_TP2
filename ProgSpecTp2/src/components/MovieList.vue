<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="prevPage" :disabled="pageNumber === 1">
      &lt; Previous
    </button>
    Page {{ pageNumber }}
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
        <span class="name">{{ movie.name }}</span>
        <span class="description">{{ movie.description }}</span>
        <span class="price">{{ movie.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
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
    };
  },
  computed: {
    pageCount() {
      let nbMovies = this.movies.length;
      return Math.floor(nbMovies / this.pageSize);
    },
    paginatedMovies() {
      const start = (this.pageNumber - 1) * this.pageSize,
        end = start + this.pageSize;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
      this.selectedMovie = null;
    },
    prevPage() {
      this.pageNumber--;
      this.selectedMovie = null;
    },
    onSelect(movie) {
      this.$router.push({ name: "movie", params: { id: movie.id } });
    },
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
  height: 1.8em;
  border-radius: 4px;
}
.movies li:hover {
  color: #607d8b;
  background-color: yellow;
  left: 0.1em;
}
.movies li:hover .name,
.movies li:hover .price {
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
.movies li.selected .name,
.movies li.selected .price {
  background-color: #0026ff;
  color: white;
}
.movies .text {
  position: relative;
  top: -3px;
}
.movies .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: 0.8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movies .price {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: 0.8em;
  border-radius: 0px 4px 4px 0px;
}
.movies .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movies .discontinued,
.movies .discontinued * {
  color: red !important;
}
</style>
