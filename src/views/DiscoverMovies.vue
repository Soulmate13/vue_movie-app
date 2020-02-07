<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Discover Movies</h1>
        </v-col>
        <v-col cols="12" xl="1" lg="2" md="2" sm="3" xs="12">
          <v-select :items="years" v-model="yearnum" label="Year"></v-select>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="4" xs="12">
          <v-select :items="listofgenres" v-model="genres" multiple clearable label="Genres"></v-select>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="5" xs="12">
          <v-select :items="sortingcriteria" v-model="sortbyvalue" label="Other criteria"></v-select>
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
    sortby: "&sort_by=",
    sortbyvalue: "popularity.desc",
    othersettings: `&language=en-US&include_adult=false&include_valueo`,
    movies: [],
    discoverurl: "",
    pages: 1,
    loaded: false,
    listofgenres: [
      {
        value: 28,
        text: "Action"
      },
      {
        value: 12,
        text: "Adventure"
      },
      {
        value: 16,
        text: "Animation"
      },
      {
        value: 35,
        text: "Comedy"
      },
      {
        value: 80,
        text: "Crime"
      },
      {
        value: 99,
        text: "Documentary"
      },
      {
        value: 18,
        text: "Drama"
      },
      {
        value: 10751,
        text: "Family"
      },
      {
        value: 14,
        text: "Fantasy"
      },
      {
        value: 36,
        text: "History"
      },
      {
        value: 27,
        text: "Horror"
      },
      {
        value: 10402,
        text: "Music"
      },
      {
        value: 9648,
        text: "Mystery"
      },
      {
        value: 10749,
        text: "Romance"
      },
      {
        value: 878,
        text: "Science Fiction"
      },
      {
        value: 10770,
        text: "TV Movie"
      },
      {
        value: 53,
        text: "Thriller"
      },
      {
        value: 10752,
        text: "War"
      },
      {
        value: 37,
        text: "Western"
      }
    ],
    sortingcriteria: [
      {
        value: "popularity.desc",
        text: "Popularity descending"
      },
      {
        value: "popularity.asc",
        text: "Popularity Ascending"
      },
      {
        value: "primary_release_date.desc",
        text: "Release Date Descending"
      },
      {
        value: "primary_release_date.asc",
        text: "Release Date Ascending"
      }
    ],
    pagination: false
  }),
  methods: {
    formUrl: function() {
      this.discoverurl =
        this.baseurl +
        this.apikey +
        this.sortby +
        this.sortbyvalue +
        this.othersettings +
        this.page +
        this.pagenum +
        this.year +
        this.yearnum +
        this.genre +
        this.genres.toString();
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
    },
    genres: function() {
      this.pagenum = 1;
      this.fetchUrl();
    },
    sortbyvalue: function() {
      this.pagenum = 1;
      this.fetchUrl();
    }
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      let array = Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      ).reverse();
      array.unshift("Not specified");
      return array;
    }
  }
};
</script>

<style>
</style>
