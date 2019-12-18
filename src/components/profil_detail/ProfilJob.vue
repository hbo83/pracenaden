<template>
<div>
  <v-card class="px-6">
    <p>
      <v-icon normal>build</v-icon>
      <span>Profese:</span>{{job}}
    </p>
    <p>
      <v-icon normal>sort</v-icon>
      <span>Kategorie:</span>{{category}}
    </p>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'ProfilJob',
  components: {

  },
  data() {
    return {
      job: '',
      category: ''
    }
  },
  mounted() {
    this.job = this.$store.state.currentProfile.job
    this.category = this.$store.state.currentProfile.category
  }
}
</script>

<style scoped>

</style>
