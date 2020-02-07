<template>
  <v-container>
    <v-row>
      <v-col
        xl="3"
        lg="4"
        md="6"
        sm="6"
        cols="12"
        v-for="show in shows"
        :key="show.id"
        class="column"
      >
        <v-img
          v-bind:src="'https://image.tmdb.org/t/p/w300/' + show.poster_path"
          alt="poster image"
          max-width="300px"
          lazy-src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
        />
        <router-link class="movie-link" :to="'/tvshow/' + show.id">
          <h2>{{show.name}}</h2>
        </router-link>
        <p class="air-date">{{show.first_air_date | TransformDate}}</p>
        <v-progress-circular
          class="rating mr-3 mb-2"
          :color="chooseColor(show.vote_average)"
          :value="(show.vote_average*10)"
          size="53"
          rotate="270"
        >{{show.vote_average*10 + '%'}}</v-progress-circular>
        <v-btn class="mb-2" fab @click="toggleId(show.id)" v-bind:class="isLiked(show.id)">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <p v-if="show.overview.length <= 150">{{show.overview}}</p>
        <p v-else>{{show.overview.substring(0,150)+'...'}}</p>
      </v-col>
      <v-col cols="12" v-if="empty">
        There are no results that matched your query.
        <v-img class="error-image" src="../assets/no-results.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Show",
  props: {
    shows: {
      type: Array,
      required: true
    },
    pages: {
      type: Number
    }
  },
  created() {
    this.checkStorage();
    this.empty = false;
  },
  updated() {
    if (this.shows.length == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  },
  data: () => ({
    favouriteshows: [],
    empty: Boolean
  }),

  filters: {
    TransformDate(string) {
      if (string == undefined) {
        return "Date not found";
      } else {
        let options = { year: "numeric", month: "long", day: "numeric" };
        const [year, month, day] = string.split("-");
        return new Date(year, month - 1, day).toLocaleDateString(
          "en-US",
          options
        );
      }
    }
  },
  methods: {
    chooseColor(progress) {
      if (progress * 10 <= 33) {
        return "#D50000";
      } else if (progress * 10 <= 66 && progress * 10 > 33) {
        return "#FBC02D";
      } else if (progress * 10 > 66) {
        return "success";
      } else if (progress == 0) {
        return "#ccc";
      }
    },
    checkStorage() {
      if (localStorage.getItem("favouriteshows")) {
        try {
          this.favouriteshows = JSON.parse(
            localStorage.getItem("favouriteshows")
          );
        } catch (e) {
          localStorage.removeItem("favouriteshows");
        }
      }
    },
    toggleId(_id) {
      let present = false;
      let arrayindex = 0;
      for (let i = 0; i < this.favouriteshows.length; i++) {
        if (_id == this.favouriteshows[i]) {
          present = true;
          arrayindex = i;
        }
      }

      if (present == false) {
        this.favouriteshows.push(_id);
        localStorage.setItem(
          "favouriteshows",
          JSON.stringify(this.favouriteshows)
        );
      }

      if (present == true) {
        this.favouriteshows.splice(arrayindex, 1);
        localStorage.setItem(
          "favouriteshows",
          JSON.stringify(this.favouriteshows)
        );
      }
    },
    isLiked(_id) {
      let present = false;
      for (let i = 0; i < this.favouriteshows.length; i++) {
        if (_id == this.favouriteshows[i]) {
          present = true;
        }
      }

      if (present == true) {
        return "liked";
      }

      if (present == false) {
        return "notliked";
      }
    }
  }
};
</script>

<style scoped>
.movie-link {
  text-decoration: none;
}

.error-image {
  max-width: 300px;
}

.air-date {
  margin-bottom: 10px;
}

.liked {
  color: red;
}

.notliked {
  color: grey;
}

img {
  max-width: 300px;
}

@media screen and (max-width: 428px) {
  .column {
    max-width: 300px;
  }

  img {
    max-width: 280px;
  }
}

@media screen and (max-width: 340px) {
  .column {
    max-width: 280px;
  }

  img {
    max-width: 220px;
  }
}
</style>