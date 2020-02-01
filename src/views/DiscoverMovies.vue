<template>
  <v-app>
    <h1>Discover Movies</h1>
    <app-discover></app-discover>
  </v-app>
</template>

<script>
import Discover from "../components/Discover";

export default {
  name: "DiscoverMovies",
  components: {
    "app-discover": Discover
  },

  data: () => ({
    baseurl: "https://api.themoviedb.org/3/discover/movie?",
    apikey: "api_key=55a0220c1741f333a9a3a558c749b920",
    page: 300,
    othersettings: `&sort_by=popularity.desc&language=en-US&include_adult=false&include_video&page=`
  }),
  created: function() {
    let discoverurl =
      this.baseurl + this.apikey + this.othersettings + this.page;

    this.axios.get(discoverurl).then(response => {
      console.log(response.data.results);
    });
  }
};
</script>

<style>
</style>
