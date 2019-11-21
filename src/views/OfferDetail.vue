<template>
<v-app>
  <Header color="pink" />
  <NavBar path="offers" />
  <v-container>
    <v-row class="col-10 mx-auto" justify="center">

      <v-col class="col-5">
        <v-col>
          <v-card>
            <b>
              {{currentOffer.title}}
            </b>
          </v-card>
        </v-col>

        <v-col class="category">
          <v-card>
            <v-icon large color="#90e4f1">category</v-icon>
            <span>Kategorie:</span>
            <span class="item" v-for="item in getCategory"> {{ item }} </span>
          </v-card>
          <v-col class="px-0">
            <AboutOffer />
          </v-col>
        </v-col>
      </v-col>

      <v-col cols="5">
        <OfferColumn />
      </v-col>

    </v-row>
    <v-row>
      <v-col>
    <OfferGalery />
  </v-col>
  </v-row>
  </v-container>

  </div>
</v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import ProfilImg from '@/components/ProfilImg.vue'
import Profil from '@/components/Profil.vue'
import axios from 'axios'
import OfferColumn from '@/components/offer/OfferColumn.vue'
import AboutOffer from '@/components/offer/AboutOffer.vue'
import OfferGalery from '@/components/offer/OfferGalery.vue'
import OfferScore from '@/components/offer/OfferScore.vue'

// import { mdiWebBox } from '@mdi/font';
export default {
  name: 'ProfilDetail',
  components: {
    Header,
    NavBar,
    ProfilImg,
    OfferColumn,
    AboutOffer,
    OfferGalery,
    OfferScore
  },
  data() {
    return {
      profilIndex: null, //index aktuálního profilu
      category: '',
      profilePath: 'http://localhost:8081/uploads/no-photo.png', //cesta k obrazku, pokud se neprepise ze response, pak bude tento default
      currentOffer: {} //naplnim ze storu aktualni currentOffer

    }
  },
  computed: {
    getProfilePath() { //vrací profilePath
      return this.profilePath
    },
    getCategory() { //vrací category
      return this.currentOffer.category
    },

  },
  methods: {

  },
  beforeMount() {
    this.currentOffer = this.$store.state.currentOffer //naplnim ze storu aktualni currentOffer

  }
}
</script>

<style scoped>
img {
  position: relative;
  top: 17px;
  margin-right: 20px;
}

.v-application p {
  margin: 0px;
}

.profilImg {
  max-width: 200px;
  max-height: 166px;
  /* overflow: hidden; */
  margin-left: 25%;
  margin-top: -15px;
}

.profil span,
.stars span,
.category span {
  margin-left: 10px;
}

.item+.item:before {
  /*oddeli category z pole od sebe jako string*/
  content: ", ";
}
</style>
