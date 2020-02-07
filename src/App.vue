<template>
  <v-app :dark="true">
    <v-content class="mt-5">
      <router-view></router-view>
      <nav-application></nav-application>
      <footer-application></footer-application>
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "nav-application": Nav,
    "footer-application": Footer
  },

  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
