<template>
<div>
  <Header color="#90e4f1" />
  <ProfilFiltering></ProfilFiltering>

  <v-container style="max-width: 60%"><!--//ten container nad rwo byt musi-->
  <v-row style="margin-top: 120px" justify="space-between">
    <v-col cols="12">
      <p>Martin Habal</p>
    </v-col>
    <v-col md="3" lg="3" style="border: 1px solid black">
      <ProfilImg />
    </v-col>
    <v-col md="3" lg="3" style="border: 1px solid black">
      <ProfilContacts />
    </v-col>
    <v-col md="3" lg="3" style="border: 1px solid black">
      <ProfilJob />
    </v-col>

  </v-row>

  <v-row class="py-12">
    <v-col md="6" lg="6" style="border: 1px solid black">
      <ProfilAboutMe />
    </v-col>
  </v-row>

  <v-row>
    <v-col style="border: 1px solid black">
      <ProfilCarousel />
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import Header from '@/components/global/Header.vue'
import ProfilFiltering from '@/components/profil/ProfilFiltering.vue'
import ProfilImg from '@/components/profil/ProfilImg.vue'
import ProfilContacts from '@/components/profil/ProfilContacts.vue'
import ProfilAboutMe from '@/components/profil/ProfilAboutMe.vue'
import ProfilJob from '@/components/profil/ProfilJob.vue'
import ProfilCarousel from '@/components/profil/ProfilCarousel.vue'
export default {
  name: 'ProfilDetail',
  components: {
    Header,
    ProfilFiltering,
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
