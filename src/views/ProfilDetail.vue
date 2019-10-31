<template>
<v-app>
  <Header />
  <NavBar />
  <v-container>
    <v-row class="col-12" justify="center">
      <v-col class="col-8">
        <v-row>
          <v-col class="col-4">

            <div class="profilImg">
              <img :src="profilePath" alt="profilPhoto" style="width: 150px; height: 150px; margin: auto; border-radius: 100px;">
            </div>

          </v-col>
          <v-col class="col-8">
            <v-row justify="center">
              <v-col class="col-12">
                <v-card class="">
                  <v-row class="stars" justify="center">
                    <v-col cols="4" class="">
                      <p><span>
                          <v-icon color="yellow">star</v-icon>
                        </span><span>10</span></p>

                    </v-col>
                    <v-col cols="4">
                      <span>
                        <v-icon color="pink">star</v-icon>
                      </span><span>10</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

            </v-row>
            <v-row>
              <v-col class="col-12">
                <v-card class="">
                  <v-row class="" justify="center">
                    <v-col cols="4" class="category">
                      <v-icon class="" large color="#90e4f1">category</v-icon>
                      <span>Kategorie:</span>
                    </v-col>
                    <v-col cols="4" class="myColor pa-0 pt-4">
                      <span class="item" v-for="item in getCategory"> {{ item }} </span><!--takhle z pole udelat string + dole css.. s toString to hlasi naky kraviny-->
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <ProfilAboutMe />
        </v-row>
      </v-col>
<ProfilColumn />

    </v-row>
<ProfilGalery />
    
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
import ProfilColumn from '@/components/ProfilColumn.vue'
import ProfilAboutMe from '@/components/ProfilAboutMe.vue'
import ProfilGalery from '@/components/ProfilGalery.vue'
// import { mdiWebBox } from '@mdi/font';
export default {
  name: 'ProfilDetail',
  data() {
    return {

      imgIndex: null,
      profilIndex: null, //index aktuálního profilu
      thisProfil: {},//naplní objekt aktuálním profilem z metody get v mounted
      id: '',
      email: '',
      profileDatas: null,
      category2: '',
      category: '',
      pricePlusCurrency: '',
      profilePath: '',
      ownUserImages: []


    }
  },
  computed: {
    getThisProfile() {
      return this.$store.state.thisProfile
    },

    getProfilePath() {
      return 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.profilIndex].email + '/profilPhoto.jpg'
    },
    getOwnUserImages() { //vrací pole imgs. které se načtou v axios monted dole
      return this.ownUserImages
    },
    // PROFIL
    getEmail() { //vraci email z objektu
      return this.thisProfil.email
    },
    getJob() { //vraci job z objektu
      return this.thisProfil.job
    },
    getCity() { //vraci city z objektu
      return this.thisProfil.city
    },
    getPricePlusCurrency() { //vraci money + currency z objektu
      return this.thisProfil.money + this.thisProfil.currency
    },
    getCategory() { //vrací category
      return this.thisProfil.category
    },

  },
  methods: {

    // setAsProfilPhoto(imgIndex) {//nastavi jako profilovou
    //   console.log(this.ownUserImages[imgIndex].productImage)
    // },


  },
  beforeMount() {
    console.log('nyní beforemount')
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

    this.profilePath = 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.$store.state.currentProfilIndex].email + '/profilPhoto.jpg'


  },

  mounted() {
    console.log('nyní mounted')
    //ne vsechno musi byt ve store, nechal bych kazdou komponentu at si posila svoje requesty
  },
  beforeCreate() {
    console.log('nyni beforeCreate')
  },
  created() {
    console.log('nyní created')
  },
  beforeUpdate() {
    console.log('nyní beforeupdate')
  },
  updated() {
    console.log('nyní updated')
  },
  activated() {
    console.log('nyní activated')
  },

  components: {
    Header,
    NavBar,
    ProfilImg,
    ProfilColumn,
    ProfilAboutMe,
    ProfilGalery
  }
}
</script>

<style scoped>
img {
  position: relative;
  top: 17px;
  margin-right: 20px;
}

.myColor {
  /* color: #90e4f1; */
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

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.item + .item:before {/*oddeli category z pole od sebe jako string*/
  content: ", ";
}
</style>
