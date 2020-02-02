<template>
  <v-container>
    <v-row>
      <v-col
        xl="3"
        lg="4"
        md="5"
        sm="7"
        cols="12"
        v-for="show in shows"
        :key="show.id"
        class="column"
      >
        <img
          v-bind:src="'https://image.tmdb.org/t/p/w300/' + show.poster_path"
          alt="poster image"
          @error="replaceImage"
        />
        <h2>{{show.original_name}}</h2>
        <p>{{show.first_air_date | TransformDate}}</p>
        <p v-if="show.overview.lenghth <= 150">{{show.overview}}</p>
        <p v-else>{{show.overview.substring(0,150)+'...'}}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Show",
  props: {
    shows: {
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
  max-width: 300px;
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