<template>
  <div>
      <p>
        <v-icon normal>face</v-icon>
        <span>E-mail:</span><span>{{email}}</span>
      </p>
      <p>
        <v-icon normal>phone</v-icon>
        <span>Telefon:</span>{{phone}}
      </p>
      <p>
        <v-icon normal>web</v-icon>
        <span>Web:</span>{{web}}
      </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfilContacts',
  components: {

  },
  data() {
    return {
      email: '',
      phone: '',
      web: ''
    }
  },
  mounted() {
    this.email = this.$store.state.currentProfile.email
    this.phone = this.$store.state.currentProfile.phone
    this.web = this.$store.state.currentProfile.web
    console.log(this.$store.state.currentProfile)
}
}
</script>

<style scoped>

</style>
