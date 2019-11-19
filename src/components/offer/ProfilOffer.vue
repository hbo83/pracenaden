<template>
<v-card>
  <v-row class="profilParent" @click="selectOffer">
    <v-col class="col-5 pl-8 profil" no-gutters>
      <p>
        <span>
          <v-icon>face</v-icon>
        </span>
        <span>{{ getEmail }}</span>
      </p>

      <!-- <p>
        <span>
          <v-icon>build</v-icon>
        </span>
        <span>{{ getCity }}</span>
      </p> -->
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

    </v-col>
    <v-col class="col-7 pr-4 profil" no-gutters>
      <v-card>
    <p><b>{{getTitle}}</b></p>
  </v-card>
    <!-- <v-card class="">
      {{getAboutOffer}}
    <v-card-text id="tr" style="text-align: left; color: green;"></v-card-text>
  </v-card> -->
  <v-col>
    <p>
      <span>
        <v-icon>category</v-icon>
      </span>
      <span>{{ getCategory }}</span>
    </p>
  </v-col>
    </v-col>
  </v-row>

</v-card>
</template>

<script>
// import ProfilImg from './ProfilImg.vue'

export default {
  name: 'ProfilOffer',
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
    selectOffer() {


      this.$router.push('/offerdetail/' + this.index)
      this.$store.commit('set_currentOffer', this.profileDatas)
      // this.storeProfilIndex(this.$props.index)

    },
    // storeProfilIndex: function(index) {
    //   this.$store.commit('set_currentProfilIndex', index)
    // }

  },
  mounted() {
console.log(this.profileDatas)
  },
  computed: {//tyhle data nebudu brat ze state
    getPricePlusCurrency() { //vraci money + currency z objektu
      return this.profileDatas.price + this.profileDatas.currency
    },
    getTitle() { //vraci name z objektu
      return this.profileDatas.title
    },
    getEmail() { //vraci job z objektu
      return this.profileDatas.email
    },
    getCity() { //vraci city z objektu
      return this.profileDatas.city
    },
    getCategory() { //vrací category
      return this.profileDatas.category
    },
    getAboutOffer() {
      return this.profileDatas.aboutOffer
    }
  },
  components: {

  }
}
</script>

<style scoped>
.profil {
  cursor: pointer;
}

.profilParent:hover {
  background-color: pink;
}

p > span {
  margin-right: 10px
}
</style>
