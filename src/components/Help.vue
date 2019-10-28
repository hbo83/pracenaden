<template>
<v-card>

<p> {{ getHelpData }}</p>
<button @click="changeData">tlacitko</button>
</v-card>
</template>

<script>

export default {
  name: 'Help',

  data() {
    return {
      neco: "neco pred zmenou"
    }
  },
  methods: {
    changeData() {
      this.$store.commit('setHelpData', 'data po zmene')
    }
  },
  computed: {
    getHelpData() {
      return this.$store.state.helpData
    }
  },
  mounted() {
    // console.log('Profil mounted')

  },
  components: {

  }
}
</script>

<style scoped>



</style>
