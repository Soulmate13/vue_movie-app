<template>
  <v-app>
    <v-container>
      <h1>Favourite TV shows</h1>
      <app-show v-bind:shows="likedshows"></app-show>
    </v-container>
  </v-app>
</template>

<script>
import Show from "../components/Show";

export default {
  name: "Favourites",
  components: {
    "app-show": Show
  }
};
</script>

<style>
</style>
