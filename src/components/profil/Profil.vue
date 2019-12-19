<template>
<div styel="border: 1px solid black">
  <v-card>
    <v-row class="profilParent mx-0" @click="selectProfil" :style="{ backgroundColor: selected }">
      <v-col cols="4" class=" pl-8 profil" no-gutters>
        <ProfilImg v-bind:index="this.index"></ProfilImg>
      </v-col>
      <v-col cols="8" class="pr-4 profil" no-gutters>
        <p>
          <span>
            <v-icon>build</v-icon>
          </span>
          <span>{{ getJob }}</span>
          <!-- <span v-if="premium">
          <v-icon style="float: right" color="yellow">star</v-icon>
        </span>
        <span v-if="premium" style="font-size: 22px; float: right;">10</span> -->
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
        <!-- <p>
        <span>
          <v-icon>category</v-icon>
        </span>
        <span style="fontSize: small">{{ getCategory }}</span>
      </p> -->
      </v-col>
    </v-row>

  </v-card>
</div>
</template>

<script>
import ProfilImg from '@/components/profil/ProfilImg.vue'
export default {
  name: 'Profil',
  components: {
    ProfilImg,

  },
  // zde rikam ze props ktere jsem obdrzel od parent komponenty se nazyvaji profilData, ocekavany typ je pole a jsou required
  props: {
    profileDatas: { //predan current profil, zde jsou data aktualniho profilu
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
      selected: "white",
      premium: true, //pozdeji premiovy ucet bude nejak oznaceny
      email: ''
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
      this.$router.push('/profildetail/' + this.profileDatas.email)//zobrazi profilDetail s routou tohoto mailu
      this.storeCurrentProfile(this.profileDatas) //ulozi aktualni profil do store
      console.log(this.profileDatas)

    },

    storeThisProfil: function(index) {
      this.$store.commit('setThisProfileWebVisible', index)
    },
    storeCurrentProfile: function(currentProfile) {
      this.$store.commit('set_currentProfile', currentProfile)
    }
  },
  mounted() {

  },
  computed: { //tyhle data nebudu brat ze state
    getPricePlusCurrency() { //vraci money + currency z objektu
      return this.profileDatas.money + this.profileDatas.currency
    },
    getJob() { //vraci job z objektu
      // return this.$store.state.allProfiles[this.index].job
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      return width + this.profileDatas.job
    },
    getCity() { //vraci city z objektu
      return this.profileDatas.city
    },
    getCategory() { //vrací category
      return this.profileDatas.category.toString('utf-8')
    },
  },

}
</script>

<style scoped>
.profil {
  cursor: pointer;
}

.profilParent {
  /* background-color: #e8f1ff */
}

.profilParent:hover {
  box-shadow: 10px 10px 5px grey;
}

p {
  font-size: 14px;
  margin-bottom: 7px !important;
}

p>span {
  margin-right: 10px;

}
</style>
