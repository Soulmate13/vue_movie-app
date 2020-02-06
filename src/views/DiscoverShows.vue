<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Discover TV shows</h1>
        </v-col>
        <v-col cols="12" xl="1">
          <v-select :items="years" v-model="yearnum" label="Year"></v-select>
        </v-col>
        <v-col cols="12" xl="2">
          <v-select :items="listofgenres" v-model="genres" multiple clearable label="Genres"></v-select>
        </v-col>
        <v-col cols="12" xl="2">
          <v-select :items="sortingcriteria" v-model="sortbyvalue" label="Other criteria"></v-select>
        </v-col>
      </v-row>
      <app-show v-bind:shows="shows" v-bind:pages="pages"></app-show>
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
import Show from "../components/Show";

export default {
  name: "DiscoverShows",
  components: {
    "app-show": Show
  },
  data: () => ({
    baseurl: "https://api.themoviedb.org/3/discover/tv?",
    apikey: "api_key=55a0220c1741f333a9a3a558c749b920",
    page: "&page=",
    pagenum: 1,
    year: "&first_air_date_year=",
    yearnum: Number,
    genre: "&with_genres=",
    sortby: "&sort_by=",
    sortbyvalue: "popularity.desc",
    genres: [],
    othersettings: `&language=en-US&include_null_first_air_dates=false`,
    shows: [],
    discoverurl: "",
    pages: 1,
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
        value: "first_air_date.desc",
        text: "First Air Date Descending"
      },
      {
        value: "first_air_date.asc",
        text: "First Air Date Ascending"
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
      this.formUrl();
      this.pagination = false;
      this.axios.get(this.discoverurl).then(response => {
        this.shows = response.data.results;
        this.pages = response.data.total_pages;
        if (this.shows.length > 0) {
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
