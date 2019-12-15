<template>
  <div>
      <p>
        <v-icon normal>face</v-icon>
        <span>E-mail:</span><span>hbo</span>
      </p>
      <p>
        <v-icon normal>phone</v-icon>
        <span>Telefon:</span>
      </p>
      <p>
        <v-icon normal>web</v-icon>
        <span>Web:</span>
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
      name: '',
      surname: '',
      email: '',
      phone: '',
      web: ''
    }
  },
  mounted() {
    axios.get('http://10.0.0.22:8081/profiles/' + this.$store.state.userLogedId)
    .then((response) => {
      this.formContent = response.data[0]
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

</script>

<style scoped>

</style>
