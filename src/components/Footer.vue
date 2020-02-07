<template>
  <v-footer absolute class="font-weight-medium">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>Vue Movie APP</strong>
      <v-spacer></v-spacer>
      <span>
        Home image
        <a
          class="imagelink"
          href="http://www.freepik.com"
        >Designed by rawpixel.com / Freepik</a>
      </span>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({})
};
</script>

<style scoped>
.imagelink {
  text-decoration: none;
}
</style>