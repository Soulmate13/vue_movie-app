<template>
  <v-app>
    <v-container>
      <h1>Favourites</h1>
      <v-btn
        @click="toggleMovies()"
        v-bind:style=" displaymovies ? 'background-color: green;' : 'background-color: #121212;'"
      >Movies</v-btn>
      <v-btn
        @click="toggleShows()"
        v-bind:style=" displayshows ? 'background-color: green;' : 'background-color: #121212;'"
      >Shows</v-btn>
      <keep-alive>
        <app-show v-bind:shows="favshowsdata" v-if="displayshows"></app-show>
        <app-movie v-bind:movies="favmoviesdata" v-if="displaymovies"></app-movie>
      </keep-alive>
    </v-container>
  </v-app>
</template>

<script>
import Show from "../components/Show";
import Movie from "../components/Movie";

export default {
  name: "Favourites",
  components: {
    "app-show": Show,
    "app-movie": Movie
  },
  created() {
    if (localStorage.getItem("favouriteshows")) {
      try {
        this.favshowids = JSON.parse(localStorage.getItem("favouriteshows"));
      } catch (e) {
        localStorage.removeItem("favouriteshows");
      }
    }

    if (localStorage.getItem("favouritemovies")) {
      try {
        this.favmovieids = JSON.parse(localStorage.getItem("favouritemovies"));
      } catch (e) {
        localStorage.removeItem("favouritemovies");
      }
    }

    this.fetchshows();
    this.fetchmovies();
  },
  data: () => ({
    favshowids: [],
    favshowinfo: {},
    favshowsdata: [],
    favmovieids: [],
    favmovieinfo: {},
    favmoviesdata: [],
    baseurl: "https://api.themoviedb.org/3/",
    show: "tv/",
    movie: "movie/",
    apikey: "?api_key=55a0220c1741f333a9a3a558c749b920",
    othersettings: "&language=en-US",
    displaymovies: true,
    displayshows: false
  }),
  methods: {
    fetchshows() {
      for (let i = 0; i < this.favshowids.length; i++) {
        this.axios
          .get(
            this.baseurl +
              this.show +
              this.favshowids[i] +
              this.apikey +
              this.othersettings
          )
          .then(response => {
            this.favshowinfo = response.data;
            console.log(this.favshowsdata);
            this.favshowsdata.push(this.favshowinfo);
          });
        console.log(this.favshowsdata);
      }
    },
    fetchmovies() {
      for (let i = 0; i < this.favmovieids.length; i++) {
        this.axios
          .get(
            this.baseurl +
              this.movie +
              this.favmovieids[i] +
              this.apikey +
              this.othersettings
          )
          .then(response => {
            this.favmovieinfo = response.data;
            console.log(this.favshowsdata);
            this.favmoviesdata.push(this.favmovieinfo);
          });
        console.log(this.favmoviesdata);
      }
    },
    toggleShows() {
      this.displayshows = true;
      this.displaymovies = false;
    },
    toggleMovies() {
      this.displayshows = false;
      this.displaymovies = true;
    }
  }
};
</script>

<style>
</style>
