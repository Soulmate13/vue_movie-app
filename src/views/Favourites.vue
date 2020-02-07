<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Favourites</h1>
          <v-btn
            class="mr-2"
            @click="toggleMovies()"
            v-bind:style=" displaymovies ? 'background-color: #5c6bc0' : 'background-color: #ccc;'"
          >Movies</v-btn>
          <v-btn
            @click="toggleShows()"
            v-bind:style=" displayshows ? 'background-color: #5c6bc0' : 'background-color: #ccc;'"
          >Shows</v-btn>
        </v-col>
      </v-row>
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
    this.checkStorage();
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
    displayshows: false,
    noshows: true,
    nomovies: true
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
            this.favshowsdata.push(this.favshowinfo);
          });
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
            this.favmoviesdata.push(this.favmovieinfo);
          });
      }
    },
    toggleShows() {
      this.displayshows = true;
      this.displaymovies = false;
    },
    toggleMovies() {
      this.displayshows = false;
      this.displaymovies = true;
    },
    checkStorage() {
      if (localStorage.getItem("favouriteshows")) {
        try {
          this.favshowids = JSON.parse(localStorage.getItem("favouriteshows"));
        } catch (e) {
          localStorage.removeItem("favouriteshows");
        }
      }

      if (localStorage.getItem("favouritemovies")) {
        try {
          this.favmovieids = JSON.parse(
            localStorage.getItem("favouritemovies")
          );
        } catch (e) {
          localStorage.removeItem("favouritemovies");
        }
      }
    }
  }
};
</script>

<style>
</style>
