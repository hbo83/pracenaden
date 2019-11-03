<template>
<v-card>
  <v-row class="profilParent" @click="selectProfil">
    <v-col class="col-4 pl-8 profil" no-gutters>
      <ProfilImg v-bind:index="this.index"></ProfilImg>
      <!-- <img :src="getProfilePath" alt="profilPhoto" style="max-height: 100%; margin: auto"> -->
    </v-col>
    <v-col class="col-8 pr-4 profil" no-gutters>
      <p>
        <span>
          <v-icon>face</v-icon>
        </span>
        <span>{{ getName }}</span>
        <span v-if="premium">
          <v-icon style="float: right" color="yellow">star</v-icon>
        </span>
        <span v-if="premium" style="font-size: 22px; float: right;">10</span>
      </p>

      <p>
        <span>
          <v-icon>build</v-icon>
        </span>
        <span>{{ getJob }}</span>
      </p>
      <p>
        <span>
          <v-icon>location_city</v-icon>
        </span>
        <span>{{ getCity }}</span>
      </p>
      <p>
        <span>
          <v-icon>money</v-icon>
        </span>
        <span>{{ getPricePlusCurrency }}</span>
      </p>
      <p>
        <span>
          <v-icon>category</v-icon>
        </span>
        <span>{{ getCategory }}</span>
      </p>
    </v-col>
  </v-row>

</v-card>
</template>

<script>
import ProfilImg from './ProfilImg.vue'

export default {
  name: 'Profil',
  // zde rikam ze props ktere jsem obdrzel od parent komponenty se nazyvaji profilData, ocekavany typ je pole a jsou required
  props: {
    profileDatas: {
      type: Object,
      required: false
    },
    index: { //index predany z parent komponenty summary
      type: Number,
      required: true
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

      this.$router.push({ //presmeruje na profilDetail
        name: 'ProfilDetail',
        params: {
          index: this.index
        }
      })

      this.storeProfilIndex(this.$props.index)

      // this.storeProfilCommit(this.email)
      // this.storeProfilIdCommit(this.id)

    },
    // storeProfilCommit: function(email) {
    //   this.$store.commit('setSelectedProfil', email)
    // },
    // storeProfilIdCommit: function(id) {
    //   this.$store.commit('setSelectedIdProfil', id)
    // },
    storeProfilIndex: function(index) {
      this.$store.commit('set_currentProfilIndex', index)
    },
    storeThisProfil: function(index) {
      this.$store.commit('setThisProfileWebVisible', index)
    }
  },
  mounted() {
    // console.log('Profil mounted')
    // console.log(this.profileDatas._id)
  },
  computed: {//tyhle data nebudu brat ze state
    getPricePlusCurrency() { //vraci money + currency z objektu
      return this.$store.state.allProfiles[this.index].money + this.$store.state.allProfiles[this.index].currency
    },
    getName() { //vraci name z objektu
      return this.$store.state.allProfiles[this.index].name
    },
    getJob() { //vraci job z objektu
      return this.$store.state.allProfiles[this.index].job
    },
    getCity() { //vraci city z objektu
      return this.$store.state.allProfiles[this.index].city
    },
    getCategory() { //vrací category
      return this.$store.state.allProfiles[this.index].category.toString('utf-8')
    },
  },
  components: {
    ProfilImg
  }
}
</script>

<style scoped>
.profil {
  cursor: pointer;
}

.profil:nth-child(odd) {
  /* border-left: 5px solid RGBA(144, 228, 241, 1); */
}

.profil:nth-child(even) {
  /* border-right: 1px solid black; */
}

.profilParent:hover {
  background-color: RGBA(144, 228, 241, 1);
}

p > span {
  margin-right: 10px
}
</style>
