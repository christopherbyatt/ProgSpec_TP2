<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  components: {

  },
  computed: {

  },
  data() {

  },
  props: {

  },
  mounted() {
    document.title = 'À Propos - TP2 Prog Spec';
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
