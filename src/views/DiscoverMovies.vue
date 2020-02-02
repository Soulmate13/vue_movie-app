<template>
  <v-app>
    <h1>Discover Movies</h1>
    <app-discover></app-discover>
    <app-movie v-bind:movies="movies" v-bind:pages="pages"></app-movie>
  </v-app>
</template>

<script>
import Discover from "../components/Discover";
import Movie from "../components/Movie";

export default {
  name: "DiscoverMovies",
  components: {
    "app-discover": Discover,
    "app-movie": Movie
  },
  data: () => ({
    baseurl: "https://api.themoviedb.org/3/discover/movie?",
    apikey: "api_key=55a0220c1741f333a9a3a558c749b920",
    page: "&page=",
    pagenum: 1,
    year: "&year=",
    yearnum: Number,
    genre: "&with_genres=",
    genres: [],
    othersettings: `&sort_by=popularity.desc&language=en-US&include_adult=false&include_video`,
    movies: [],
    discoverurl: "",
    pages: Number
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
    }
  },
  created: function() {
    this.fetchUrl();
  }
};
</script>

<style>
</style>
