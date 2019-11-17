<template>
  <!-- <v-app> -->
  <v-container>
  <v-row align="center" justify="space-between">
      <v-col class="mx-4 my-0 py-0" cols="2">
        <v-btn height="40px" width="40px" small color="error" @click="toPath">
          <v-icon large>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
<!-- </v-app> -->
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toPath() {
      window.location.href = "http://localhost:8080/" + this.path;
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
