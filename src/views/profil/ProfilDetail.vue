<template>
<div>
  <Header color="#90e4f1" />
  <NavBar path="" color="#90e4f1" nav="detail"/>
  <v-container><!--//ten container nad rwo byt musi-->
  <!-- <v-row justify="center">
    <v-col cols="6">
      <ProfilFiltering />
    </v-col>
  </v-row> -->

  <v-row style="margin-top: 50px" justify="center">
    <v-col cols="12">
      <p style="text-align: center">{{this.$store.state.currentProfile.name}}</p>
    </v-col>
    <!-- cols="12" znamena na kolik cols se to deli -->
    <v-col cols="12" md="1" lg="1" xs="12" class="">
      <ProfilImg />
    </v-col>
    <v-col cols="12" md="3" lg="3" xs="12">
      <ProfilContacts />
    </v-col>
    <v-col cols="12" md="3" lg="3" xs="12">
      <ProfilJob />
    </v-col>

  </v-row>

  <v-row class="py-1" justify="center">
    <v-col md="6" lg="6">
      <ProfilAboutMe />
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col cols="12" md="4" lg="4">
      <ProfilCarousel />
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
// import ProfilFiltering from '@/components/profil_detail/ProfilFiltering.vue'
import ProfilImg from '@/components/profil/ProfilImg.vue'
import ProfilContacts from '@/components/profil_detail/ProfilContacts.vue'
import ProfilAboutMe from '@/components/profil_detail/ProfilAboutMe.vue'
import ProfilJob from '@/components/profil_detail/ProfilJob.vue'
import ProfilCarousel from '@/components/profil_detail/ProfilCarousel.vue'
export default {
  name: 'ProfilDetail',
  components: {
    Header,
    NavBar,
    // ProfilFiltering,
    ProfilContacts,
    ProfilAboutMe,
    ProfilImg,
    ProfilJob,
    ProfilCarousel
  },
  created() {

  },
  mounted() {

  },
  beforeCreate() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  activated() {

  },
}
</script>

<style scoped>

</style>
