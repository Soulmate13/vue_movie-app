<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Welcome to VUE MOVIE APP</h1>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn large color="indigo lighten-1 black--text" to="/discover-movies">
          <span>Start browsing</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style>
</style>
