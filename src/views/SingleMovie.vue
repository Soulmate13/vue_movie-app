<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" xl="4" lg="5" offset-md="0" md="5" sm="5">
          <v-img
            class="poster"
            v-bind:src="'https://image.tmdb.org/t/p/w780' + movieinfo.poster_path"
            lazy-src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
          ></v-img>
        </v-col>
        <v-col cols="12" xl="6" lg="7" md="7" sm="7">
          <h1>{{movieinfo.title}}</h1>
          <p class="tagline mb-3" v-if="movieinfo.tagline">{{movieinfo.tagline}}</p>
          <h2 class="mb-3">{{movieinfo.release_date | TransformDate}}</h2>
          <v-progress-circular
            class="rating mr-3 mb-2"
            :color="chooseColor(movieinfo.vote_average)"
            :value="(movieinfo.vote_average*10)"
            size="53"
            rotate="270"
          >{{movieinfo.vote_average*10 + '%'}}</v-progress-circular>
          <v-btn class="mb-2" fab @click="toggleId(id)" v-bind:class="isLiked(id)">
            <v-icon>mdi-heart</v-icon>
        </v-btn>
          <p class="information mb-1" v-if="movieinfo.runtime">Runtime: {{movieinfo.runtime}} min</p>
           <p class="information mb-2"> Genres:
              <ul class="list">
                  <li class="list-item" v-for="genre in movieinfo.genres" :key="genre.id">{{genre.name}}</li>
              </ul>
          </p>
          <p class="information">
            Overview:
            <br />
            {{movieinfo.overview}}
          </p>
          <p v-if="movieinfo.homepage">
            <a class="link" :href="movieinfo.homepage" target="_blank">Official Website</a>
          </p>
          <p v-if="movieinfo.imdb_id">
            <a class="link" :href="'https://www.imdb.com/title/'+movieinfo.imdb_id" target="_blank">IMDB</a>
          </p>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "SingleMovie",
  components: {},
  data: function() {
    return {
      id: this.$route.params.id,
      movieinfo: {},
      baseurl: "https://api.themoviedb.org/3/",
      show: "movie/",
      apikey: "?api_key=55a0220c1741f333a9a3a558c749b920",
      othersettings: "&language=en-US",
      showurl: "",
      favmovies: []
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
        console.log(this.response);
        this.movieinfo = response.data;
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
      if (localStorage.getItem("favouritemovies")) {
        try {
          this.favmovies = JSON.parse(
            localStorage.getItem("favouritemovies")
          );
        } catch (e) {
          localStorage.removeItem("favouritemovies");
        }
      }
    },
    toggleId(_id) {
      let arrayindex = 0;
      let present = false;
      for (let i = 0; i < this.favmovies.length; i++) {
        if (_id == this.favmovies[i]) {
          present = true;
          arrayindex = i;
        }
      }

      if (present == false) {
        this.favmovies.push(_id);
        localStorage.setItem(
          "favouritemovies",
          JSON.stringify(this.favmovies)
        );
      }

      if (present == true) {
        this.favmovies.splice(arrayindex, 1);
        localStorage.setItem(
          "favouritemovies",
          JSON.stringify(this.favmovies)
        );
      }
    },
    isLiked(_id) {
      let present = false;
      for (let i = 0; i < this.favmovies.length; i++) {
        if (_id == this.favmovies[i]) {
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