<template>
  <v-app>
    <v-container>
      <h1>Search Movies</h1>
      <v-row>
        <v-col cols="12" xl="1">
          <span>Year</span>
          <v-select :items="years" v-model="yearnum"></v-select>
        </v-col>
        <v-col cols="12" xl="7">
          <span>Find a movie</span>
          <v-text-field
            prepend-inner-icon="search"
            v-model="query"
            @keyup.enter="fetchUrl"
            @click:prepend-inner="fetchUrl"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <app-movie v-bind:movies="movies" v-bind:pages="pages"></app-movie>
      <v-pagination
        v-if="pagination"
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
  name: "SearchMovies",
  components: {
    "app-movie": Movie
  },
  data: () => ({
    baseurl: "https://api.themoviedb.org/3/search/movie?",
    apikey: "api_key=55a0220c1741f333a9a3a558c749b920",
    page: "&page=",
    pagenum: 1,
    year: "&primary_release_year=",
    yearnum: Number,
    othersettings: `&language=en-US&include_adult=false&include_valueo&query=`,
    movies: [],
    discoverurl: "",
    pages: 0,
    query: [],
    pagination: false
  }),
  methods: {
    formUrl: function() {
      this.discoverurl =
        this.baseurl +
        this.apikey +
        this.page +
        this.pagenum +
        this.year +
        this.yearnum +
        this.othersettings +
        this.query;
    },
    fetchUrl: function() {
      this.pagination = false;
      this.formUrl();
      this.axios.get(this.discoverurl).then(response => {
        this.movies = response.data.results;
        this.pages = response.data.total_pages;
        if (this.movies.length > 0) {
          this.pagination = true;
        }
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
