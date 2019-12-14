<template>
<v-col class="col-12">
  <ProfilColumn />
<ProfilAboutMe />
<Carousel />
</v-col>
</template>

<script>
import axios from 'axios'
import ProfilAboutMe from '@/components/profil/ProfilAboutMe.vue'
import ProfilColumn from '@/components/profil/ProfilColumn.vue'
import Carousel from '@/components/profil/Carousel'
export default {
  name: 'ProfilDetail',
  components: {
    ProfilAboutMe,
    ProfilColumn,
    Carousel
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
