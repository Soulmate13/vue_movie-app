<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center heading">Welcome to VUE MOVIE APP</h1>
        <p
          class="text-center subheading"
        >Discover new movies or TV shows to watch. Save them to your list of favourites.</p>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <!-- <v-img src="../assets/movie-people.png" class="image"></v-img> -->
      </v-col>
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
.heading {
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 15px;
}

.subheading {
  font-size: 25px;
  font-weight: 300;
}

.image {
  max-width: 400px;
}

@media screen and (max-width: 1199px) {
  .heading {
    font-size: 40px;
  }

  .subheading {
    font-size: 20px;
  }
}

@media screen and (max-width: 992px) {
  .heading {
    font-size: 40px;
    padding: 0 15px;
  }

  .subheading {
    font-size: 20px;
    padding: 0 15px;
  }
}
</style>
