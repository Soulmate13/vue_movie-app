<template>
  <v-container>
    <v-row>
      <v-col
        xl="3"
        lg="4"
        md="5"
        sm="7"
        cols="12"
        v-for="movie in movies"
        :key="movie.id"
        class="column"
      >
        <v-img
          v-bind:src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"
          alt="poster image"
          @error="replaceImage"
          max-width="300px"
          lazy-src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
        />
        <h2>{{movie.title}}</h2>
        <p>{{movie.release_date | TransformDate}}</p>
        <p v-if="movie.overview.lenghth <= 150">{{movie.overview}}</p>
        <p v-else>{{movie.overview.substring(0,150)+'...'}}</p>
      </v-col>
    </v-row>
  </v-container>
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
  },
  methods: {
    replaceImage(e) {
      e.target.src =
        "https://cdn.theposterdb.com/prod/public/images/defaults/missing_poster.jpg";
    }
  }
};
</script>

<style scoped>
img {
  max-width: 280px;
}

@media screen and (max-width: 428px) {
  .column {
    max-width: 300px;
  }

  img {
    max-width: 280px;
  }
}

@media screen and (max-width: 340px) {
  .column {
    max-width: 280px;
  }

  img {
    max-width: 220px;
  }
}
</style>