<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.route"
          link
          :to="link.route"
          exact
          @click.native="$scrollToTop"
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-2" />
      <v-toolbar-title>Vue Movie App</v-toolbar-title>
      <v-icon right>movie</v-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data: () => ({
    drawer: false,
    links: [
      { icon: "home", text: "Home", route: "/" },
      {
        icon: "movie_filter",
        text: "Discover Movies",
        route: "/discover-movies"
      },
      { icon: "feedback", text: "Seach Movies", route: "/search-movies" },
      { icon: "tv", text: "Discover TV Shows", route: "/discover-shows" },
      { icon: "feedback", text: "Search TV Shows", route: "/search-shows" },
      { icon: "favorite", text: "Favourites", route: "/favourites" },
      { icon: "feedback", text: "About", route: "/about" }
    ]
  })
};
</script>