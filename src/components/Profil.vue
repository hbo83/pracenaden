<template>
  <v-col class="col-4">
<div class="profil" @click="selectProfil">
  <Avatar v-bind:email="profileDatas.email"></Avatar>
  <p><span><v-icon>face</v-icon></span><span>{{ profileDatas.name }}</span><span v-if="premium"><v-icon style="float: right" color="yellow">star</v-icon></span><span v-if="premium" style="font-size: 22px; float: right;">10</span></p>
  <p><span><v-icon>build</v-icon></span><span>{{ profileDatas.job }}</span></p>
  <p><span><v-icon>location_city</v-icon></span><span>{{ profileDatas.city }}</span></p>
  <p><span><v-icon>money</v-icon></span><span>{{ profileDatas.money }} {{ profileDatas.currency }}</span></p>
  <div style="width: 50%; float: right;">
    <ul>
      <li style="text-align:left; list-style-type: none;" v-for="(category, index) in profileDatas.category">{{ profileDatas.category[index] }}</li>
    </ul>
  </div>
</div>
</v-col>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'Profil',
  // zde rikam ze props ktere jsem obdrzel od parent komponenty se nazyvaji profilData, ocekavany typ je pole a jsou required
  props: {
    profileDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      id: this.profileDatas._id,
      email: this.profileDatas.email,
      premium: true
    }
  },
  methods: {
    //vybere profil, ulozi email a id vybraneho profilu do storu
    selectProfil() {

      this.$router.push({//presmeruje na profilDetail
        name: 'ProfilDetail',
        params: {}//nepouzity objekt
      })

      this.storeProfilCommit(this.email)
      this.storeProfilIdCommit(this.id)

    },
    storeProfilCommit: function(email) {
      this.$store.commit('setSelectedProfil', email)
    },
    storeProfilIdCommit: function(id) {
      this.$store.commit('setSelectedIdProfil', id)
    }
  },
  mounted() {
    // console.log('Profil mounted')
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.profil {
  width: 600px;
  height:255px;
  border-left: 5px solid RGBA(144,228,241,1);
  border-radius: 0 5px 5px 0;
  box-shadow: 5px 5px 5px grey;
  padding: 20px;
  margin: 5px 0 0 5px;
  float: left;
  cursor: pointer;
  /* background-color: RGBA(144,228,241,0.5); */
}
.profil:hover {
  background-color: RGBA(144,228,241,1);
}
.profil p {
  display: block;
  text-align: left;
  margin-bottom: 10px;
}
.profil p > span {
  margin-left: 50px;
}
a {
  color: #42b983;
}
</style>
