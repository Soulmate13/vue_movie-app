<template>
  <v-container>
    <v-row>
      <v-col
        xl="3"
        lg="4"
        md="5"
        sm="7"
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
        <h2>{{show.original_name}}</h2>
        <p>{{show.first_air_date | TransformDate}}</p>
        <v-progress-circular
          class="rating"
          :color="chooseColor(show.vote_average)"
          :value="(show.vote_average*10)"
          size="45"
          rotate="270"
        >{{show.vote_average*10 + '%'}}</v-progress-circular>
        <v-btn fab @click="favlisttoggle(show.id)">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <p v-if="show.overview.lenghth <= 150">{{show.overview}}</p>
        <p v-else>{{show.overview.substring(0,150)+'...'}}</p>
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
      type: Number,
      required: true
    }
  },
  mounted() {
    if (localStorage.getItem("favouriteshows")) {
      try {
        this.favouriteshows = JSON.parse(
          localStorage.getItem("favouriteshows")
        );
      } catch (e) {
        localStorage.removeItem("favouriteshows");
      }
      console.log(localStorage.getItem("favouriteshows"));
    }
  },
  data: () => ({
    favouriteshows: []
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
    favlisttoggle(_id, btn) {
      let present = false;
      let arrayindex = 0;
      console.log(btn);
      console.log(_id);
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
        console.log(localStorage.getItem("favouriteshows"));
      }

      if (present == true) {
        this.favouriteshows.splice(arrayindex, 1);
        localStorage.setItem(
          "favouriteshows",
          JSON.stringify(this.favouriteshows)
        );
        console.log(localStorage.getItem("favouriteshows"));
      }
    }
  }
};
</script>

<style scoped>
.liked {
  color: red;
}

.notliked {
  color: yellow;
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