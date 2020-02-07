<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12 d-flex justify-center">
          <v-icon class="icon" size="250">emoji_people</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="mytitle text-center">
            My name is
            <a
              class="link"
              href="https://www.linkedin.com/in/hlib-zhurba13/"
              target="_blank"
            >Hlib Zhurba.</a> This is my graduation project in Beetroot Academy Mykolaiv.
            <br />It is created with Vue.js and Vuetify. API requests are made with
            <a
              class="link"
              href="https://developers.themoviedb.org/3"
              target="_blank"
            >The Movie Database (TMDb) API.</a>
            <br />Home image
            <a
              class="link"
              href="http://www.freepik.com"
            >Designed by rawpixel.com / Freepik</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "About"
};
</script>

<style>
.link {
  text-decoration: none;
  color: #01d277 !important;
}

.mytitle {
  font-weight: 300;
  font-size: 35px;
}

@media screen and (max-width: 992px) {
  .mytitle {
    font-size: 25px;
  }
}
</style>
