<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn @click="$router.go(-1)">Go back</v-btn>
        </v-col>
        <v-col cols="12" xl="4" lg="5" offset-md="0" md="5" sm="5">
          <v-img
            class="poster"
            v-bind:src="'https://image.tmdb.org/t/p/w780' + showinfo.poster_path"
            lazy-src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
          ></v-img>
        </v-col>
        <v-col cols="12" xl="6" lg="7" md="7" sm="7">
          <h1>{{showinfo.name}}</h1>
          <h2 class="mb-3" v-if="showinfo.first_air_date">First aired on: {{showinfo.first_air_date | TransformDate}}</h2>
          <h2 class="mb-3" v-if="showinfo.last_air_date">Last aired on: {{showinfo.last_air_date | TransformDate}}</h2>
          <h3 class="mb-3" v-if="showinfo.number_of_seasons">Total Seasons: {{showinfo.number_of_seasons}}</h3>
          <v-progress-circular
            class="rating mr-3 mb-2"
            :color="chooseColor(showinfo.vote_average)"
            :value="(showinfo.vote_average*10)"
            size="53"
            rotate="270"
          >{{showinfo.vote_average*10 + '%'}}</v-progress-circular>
          <v-btn class="mb-2" fab @click="toggleId(id)" v-bind:class="isLiked(id)">
            <v-icon>mdi-heart</v-icon>
        </v-btn>
          <p class="information mb-1" v-if="showinfo.runtime">Runtime: {{showinfo.runtime}} min</p>
           <p class="information mb-2" v-if="showinfo.genres"> Genres:
              <ul class="list">
                  <li class="list-item" v-for="genre in showinfo.genres" :key="genre.id">{{genre.name}}</li>
              </ul>
          </p>
          <p class="information">
            Overview:
            <br />
            {{showinfo.overview}}
          </p>
          <p v-if="showinfo.homepage">
            <a class="link" :href="showinfo.homepage" target="_blank">Official Website</a>
          </p>
          <p v-if="showinfo.imdb_id">
            <a class="link" :href="'https://www.imdb.com/title/'+showinfo.imdb_id" target="_blank">IMDB</a>
          </p>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "SingleShow",
  components: {},
  data: function() {
    return {
      id: this.$route.params.id,
      showinfo: {},
      baseurl: "https://api.themoviedb.org/3/",
      show: "tv/",
      apikey: "?api_key=55a0220c1741f333a9a3a558c749b920",
      othersettings: "&language=en-US",
      showurl: "",
      favshows: []
    };
  },
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
  created() {
    this.formurl();
    this.fetchurl();
    this.checkStorage();
  },
  methods: {
    formurl() {
      this.showurl =
        this.baseurl + this.show + this.id + this.apikey + this.othersettings;
    },
    fetchurl() {
      this.axios.get(this.showurl).then(response => {
        this.showinfo = response.data;
      });
    },
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
          this.favshows = JSON.parse(
            localStorage.getItem("favouriteshows")
          );
        } catch (e) {
          localStorage.removeItem("favouriteshows");
        }
      }
    },
    toggleId(_id) {
      let arrayindex = 0;
      let present = false;
      for (let i = 0; i < this.favshows.length; i++) {
        if (_id == this.favshows[i]) {
          present = true;
          arrayindex = i;
        }
      }

      if (present == false) {
        this.favshows.push(_id);
        localStorage.setItem(
          "favouriteshows",
          JSON.stringify(this.favshows)
        );
      }

      if (present == true) {
        this.favshows.splice(arrayindex, 1);
        localStorage.setItem(
          "favouriteshows",
          JSON.stringify(this.favshows)
        );
      }
    },
    isLiked(_id) {
      let present = false;
      for (let i = 0; i < this.favshows.length; i++) {
        if (_id == this.favshows[i]) {
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

.tagline {
    font-style: italic;
}

.poster {
  max-width: 500px;
}

.information {
    font-size: 18px;
}

.link {
    text-decoration: none;
    font-size: 18px;

}

.list {
    list-style-type: none;
    display: inline;
    padding-left: 0;
}

.list-item {
    display: inline;
}

.list-item:after {
    content: ", "
}

.list .list-item:last-child:after {
    content: "";
}

.liked {
  color: red;
}

.notliked {
  color: grey;
}

@media screen and (max-width: 961px) {
    .poster {
    max-width: 300px;
    }
}
</style>