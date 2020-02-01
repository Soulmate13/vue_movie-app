<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <nav-application></nav-application>
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    "nav-application": Nav
  },

  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
