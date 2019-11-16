<template>
<v-app>
  <Header color="pink" />
  <NavBar path="offers" />
  <v-container>

    <v-row class="col-10 mx-auto" justify="center">
      <v-col class="col-8">

        <v-row>
          <v-col class="col-6">
            <v-card style="min-height:100px">
              Nadpis</v-card>
          </v-col>
          <v-col class="col-6">
            <v-row justify="center">
              <OfferScore /><!--tohle je na hovno, ve views maji bej sablony a komponenty nemaji mit vlasni obalovej column-->
            </v-row>
          </v-col>

          <v-row>
            <v-col class="col-12">
              <v-card class="">

                <v-col cols="4" class="category">
                  <v-icon class="" large color="#90e4f1">category</v-icon>
                  <span>Kategorie:</span>
                </v-col>
                <v-col cols="4" class="myColor pa-0 pt-4">
                  <span class="item" v-for="item in getCategory"> {{ item }} </span>

                </v-col>

              </v-card>
            </v-col>
          </v-row>
        </v-row>

        <v-row>
          <AboutOffer />
        </v-row>
      </v-col>
      <OfferColumn />

    </v-row>
    <OfferGalery />
    <!-- <GaleryCarousel /> -->
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
      thisProfil: {}, //naplní objekt aktuálním profilem z metody get v mounted
      category: '',
      profilePath: 'http://localhost:8081/uploads/no-photo.png'

    }
  },
  computed: {
    getProfilePath() {
      return this.profilePath
    },
    getCategory() { //vrací category
      return this.thisProfil.category
    },

  },
  methods: {

  },
  beforeMount() {
    // console.log('nyní beforemount')
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

    //najde vsechny obrázky, s timto emailem
    axios.get('http://localhost:8081/img/' + this.$store.state.allProfiles[this.profilIndex].email)

      .then((response) => {
        response.data.map(img => { //vrati imgs z profilu a vytvori path k profilovy fotcce
          if (img.profilPhoto) {
            this.profilePath = 'http://localhost:8081/uploads/' + img.productImage
          }


        })
        // console.log(this.profilePath)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:8081/profiles/' + this.$store.state.allProfiles[this.profilIndex].email) //vrátí aktuální profil
      .then((response) => {
        // console.log(response.data)
        this.thisProfil = response.data[0]
      })
      .catch((error) => {
        console.log(error);
      });


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
