<template>
  <v-app>
    <v-container>
      <h1>Discover Movies</h1>
      <v-row>
        <v-col cols="12" xl="1">
          <span>Year</span>
          <v-select :items="years" v-model="yearnum"></v-select>
        </v-col>
      </v-row>
      <app-movie v-bind:movies="movies" v-bind:pages="pages"></app-movie>
      <v-pagination
        :length="pages"
        total-visible="7"
        v-model="pagenum"
        @click.native="$scrollToTop"
      ></v-pagination>
    </v-container>
  </v-app>
</template>

<script>
import Movie from "../components/Movie";

export default {
  name: "DiscoverMovies",
  components: {
    "app-movie": Movie
  },
  data: () => ({
    baseurl: "https://api.themoviedb.org/3/discover/movie?",
    apikey: "api_key=55a0220c1741f333a9a3a558c749b920",
    page: "&page=",
    pagenum: 1,
    year: "&primary_release_year=",
    yearnum: Number,
    genre: "&with_genres=",
    genres: [],
    othersettings: `&sort_by=popularity.desc&language=en-US&include_adult=false&include_video`,
    movies: [],
    discoverurl: "",
    pages: 1,
    loaded: false
  }),
  methods: {
    formUrl: function() {
      this.discoverurl =
        this.baseurl +
        this.apikey +
        this.othersettings +
        this.page +
        this.pagenum +
        this.year +
        this.yearnum +
        this.genre +
        this.genres.toString();
    },
    fetchUrl: function() {
      this.formUrl();
      this.axios.get(this.discoverurl).then(response => {
        this.movies = response.data.results;
        this.pages = response.data.total_pages;
        console.log(this.movies);
        console.log(this.pages);
      });
    },
    nextPage: function() {
      this.pagenum += 1;
    },
    lastPage: function() {
      this.pagenum -= 1;
    }
  },
  created: function() {
    this.fetchUrl();
  },
  watch: {
    pagenum: function() {
      this.fetchUrl();
    },
    yearnum: function() {
      this.pagenum = 1;
      this.fetchUrl();
    }
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      ).reverse();
    }
  }
};
</script>

<style>
</style>
