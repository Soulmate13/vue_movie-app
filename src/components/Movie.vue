<template>
  <div>
    <div v-for="movie in movies" :key="movie.id">
      <img v-bind:src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path" alt="poster image" />
      <h2>{{movie.title}}</h2>
      <p>{{movie.release_date | TransformDate}}</p>
      <p>{{movie.overview}}</p>
    </div>
    <v-pagination></v-pagination>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movies: {
      type: Array,
      required: true
    },
    pages: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  filters: {
    TransformDate(string) {
      let options = { year: "numeric", month: "long", day: "numeric" };
      const [year, month, day] = string.split("-");
      return new Date(year, month - 1, day).toLocaleDateString(
        "en-US",
        options
      );
    }
  }
};
</script>