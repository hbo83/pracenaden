<template>
<v-card>
  <v-row class="profilParent mx-0" @click="selectOffer">
    <v-col class="col-5 pl-8 profil" no-gutters>
      <p>
        <span>
          <v-icon>face</v-icon>
        </span>
        <span>{{ getEmail }}</span>
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

    </v-col>
    <v-col class="col-7 pr-4 profil" no-gutters>
      <v-card>
    <p><b>{{getTitle}}</b></p>
  </v-card>
  <v-col>
    <p>
      <span>
        <v-icon>category</v-icon>
      </span>
      <!-- <span>{{ getCategory }}</span> -->
      <span style="fontSize: small" class="item" v-for="item in getCategory"> {{ item }} </span>
    </p>
  </v-col>
    </v-col>
  </v-row>

</v-card>
</template>

<script>


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
      this.$router.push('/offerdetail/' + this.index)//presmeruje na offerDetail s indexem profilu v route
      this.$store.commit('set_currentOffer', this.profileDatas)//komitne aktualni profil, ktery se pak nacte v offerDetailu
    },
  },
  mounted() {

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

.profilParent {
  background-color: #ffeaed
}

.profilParent:hover {
  box-shadow: 10px 10px 5px grey;
}

p > span {
  margin-right: 10px
}

.item+.item:before {
  /*oddeli category z pole od sebe jako string*/
  content: ",";
}
</style>
