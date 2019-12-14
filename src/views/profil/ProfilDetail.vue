<template>
<div>
  <Header color="#90e4f1"/>
  <ProfilFiltering></ProfilFiltering>
  <v-row>
    <v-col>
      <ProfilImg />
  </v-col>
</v-row>

</div>
</template>

<script>
import Header from '@/components/global/Header.vue'
import ProfilFiltering from '@/components/profil/ProfilFiltering.vue'
import ProfilImg from '@/components/profil/ProfilImg.vue'
export default {
  name: 'ProfilDetail',
  components: {
    Header,
    ProfilFiltering,
ProfilImg

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
