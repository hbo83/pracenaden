<template>
<v-card>
  <v-row class="profilParent mx-0" @click="selectProfil">
    <v-col class="col-4 pl-8 profil" no-gutters>
      <ProfilImg v-bind:index="this.index"></ProfilImg>
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
        <span style="fontSize: small">{{ getCategory }}</span>
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
      premium: true//pozdeji premiovy ucet bude nejak oznaceny
    }
  },
  methods: {
    //vybere profil, ulozi email a id vybraneho profilu do storu
    selectProfil() {

      // this.$router.push({ //presmeruje na profilDetail
      //   name: 'ProfilDetail',
      //   params: {
      //     index: this.index,
      //     email: this.profileDatas.email
      //   }
      // })
      this.$router.push('/profildetail/' + this.index)
      console.log(this.profileDatas.email)
      this.storeProfilIndex(this.$props.index)

    },
    storeProfilIndex: function(index) {
      this.$store.commit('set_currentProfilIndex', index)
    },
    storeThisProfil: function(index) {
      this.$store.commit('setThisProfileWebVisible', index)
    }
  },
  mounted() {

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

.profilParent:hover {
  box-shadow: 10px 10px 5px grey;
}


p > span {
  margin-right: 10px
}
</style>
