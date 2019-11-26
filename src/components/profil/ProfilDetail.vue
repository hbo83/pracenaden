<template>
<v-col class="col-12">
<ProfilAboutMe />
</v-col>
</template>

<script>
import axios from 'axios'
import ProfilAboutMe from '@/components/profil/ProfilAboutMe.vue'

export default {
  name: 'ProfilDetail',
  components: {
    ProfilAboutMe
  },
  data() {
    return {
      userLoged: null,
      profilIndex: null,
      starProfil: null,//email profilu, ktery je hodnocen
      goldStarsCount: 1,//pocet zlatych hvezd
      allreadyMarked: false//hodnotil jiz userLoge tento starProfil?
    }
  },
  methods: {

  },
  computed: {

  },
  mounted() {

  },

}
</script>

<style scoped>



</style>
