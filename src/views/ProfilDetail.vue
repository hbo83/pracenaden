<template>
<v-app>
  <Header />
  <NavBar />
  <v-container>
    <v-row class="px-12">
      <v-col class="col-4 mx-lg-auto">
        <v-card class="pa-4">

          <ProfilImg v-bind:index="this.index"></ProfilImg>
        </v-card>
      </v-col>

                                                                        <!-- PROFIL -->
      <v-col class="col-4 profil">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="3" class="pa-0" style="text-align: left">
              <v-icon class="mr-4" large color="#90e4f1">face</v-icon>
              <span style="color: #90e4f1">E-mail:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">
              <span> {{ getEmail }}</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="pa-0" style="text-align: left">
              <v-icon class="mr-4" large color="#90e4f1">build</v-icon>
              <span style="color: #90e4f1">Profese:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">
              <span><a target="_blank" rel="noopener noreferrer" v-bind:href="job">{{ getJob }}</a></span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="pa-0" style="text-align: left">
              <v-icon class="mr-4" large color="#90e4f1">location_city</v-icon>
              <span style="color: #90e4f1">Místo:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">
              <span><a target="_blank" rel="noopener noreferrer" v-bind:href="city">{{ getCity }}</a></span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="pa-0" style="text-align: left">
              <v-icon class=" mr-4" large color="#90e4f1">money</v-icon>
              <span style="color: #90e4f1">Odměna:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">
              <span>{{ getPricePlusCurrency }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="pa-0" style="text-align: left">
              <v-icon class="mr-4" large color="#90e4f1">category</v-icon>
              <span style="color: #90e4f1">Kategorie:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">

              <span> {{ getCategory }} </span>
            </v-col>
          </v-row>
          <!-- </p> -->
        </v-card>
      </v-col>

                                                                         <!-- KONTAKTY -->
      <v-col class="col-4 profil">
        <v-card class="pa-4">
          <v-row v-if="getWebVisible">
            <v-col cols="3" class="pa-0" style="text-align: left">
            <v-icon large color="#90e4f1">web</v-icon>
            <span style="color: #90e4f1">Web:</span>
            </v-col>
            <v-col class="myColor pa-0 pt-1" style="text-align: left">
              <span><a target="_blank" rel="noopener noreferrer" v-bind:href="web">{{ getWeb}}</a>
            </span>
          </v-col>
        </v-row>
        <v-row v-if="getFacebookVisible">
          <v-col cols="3" class="pa-0" style="text-align: left">
            <v-icon large color="#90e4f1">thumb_up</v-icon>
            <span style="color: #90e4f1">Facebook:</span>
          </v-col>
          <v-col class="myColor pa-0 pt-1" style="text-align: left">
            <span>
              <a target="_blank" rel="noopener noreferrer" :href="facebook">{{ getFacebook }}</a>
            </span>
          </v-col>
        </v-row>
        <v-row v-if="getInstagramVisible">
          <v-col cols="3" class="pa-0" style="text-align: left">
            <v-icon large color="#90e4f1">portrait</v-icon>
            <span style="color: #90e4f1">Instagram:</span>
          </v-col>
          <v-col class="myColor pa-0 pt-1" style="text-align: left">
            <span>
              <a target="_blank" rel="noopener noreferrer" :href="instagram">{{ getInstagram }}</a>
            </span>
          </v-col>
        </v-row>
        <v-row v-if="getSkypeVisible">
          <v-col cols="3" class="pa-0" style="text-align: left">
            <v-icon large color="#90e4f1">call</v-icon>
            <span style="color: #90e4f1">Skype:</span>
          </v-col>
          <v-col class="myColor pa-0 pt-1" style="text-align: left">
            <span>
              {{ getSkype }}
            </span>
          </v-col>
        </v-row>
        <v-row v-if="getWhatsappVisible">
          <v-col cols="3" class="pa-0" style="text-align: left">
            <v-icon large color="#90e4f1">add_alert</v-icon>
            <span style="color: #90e4f1">Whatsapp:</span>
          </v-col>
          <v-col class="myColor pa-0 pt-1" style="text-align: left">
            <span>
              {{ getWhatsapp }}
            </span>
          </v-col>
        </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="px-12">
      <v-col>
        <v-card height="200px">
          <v-card class="pl-4">
            <v-card-title max-width="50%">Něco o mně:</v-card-title>
          </v-card>
          <v-card-text style="text-align: left; color: green;">{{ getAboutMe }}</v-card-text>

        </v-card>
      </v-col>
      <v-col>
        <v-card height="200px">
          <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2">
            <v-card-title>Nabízím:</v-card-title>
          </v-card>
        </v-hover>
          <v-card-text style="text-align: left; color: green;">{{ getOfferMe }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="padding-left: 10%; padding-right: 1%" justify="start" max-width="1826px">
      <v-col v-for="(image, imgIndex) in getUserImages" v-bind:index="imgIndex" class="galleryImg col-2">

        <v-img :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1" onclick="console.log(this)" class="grey lighten-2" max-width="300" max-height="200" style="border: 5px solid grey; border-radius: 0px; cursor: pointer"></v-img>
      <!-- <v-hover v-slot:default="{ hover }"> -->
        <v-card>sasa</v-card>
      <!-- </v-hover> -->
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
// import { mdiWebBox } from '@mdi/font';
export default {
  name: 'ProfilDetail',
  data() {
    return {
      index: null,
      imgIndex: null,
      profilIndex: null,
      id: '',
      email: '',
      profileDatas: null,
      //sicee tyhle atributy nepotrebuju, ptze je taham ze storage, ale inspektor rve ze je chce
      web: '',
      facebook: '',
      instagram: '',
      skype: '',
      whatsapp: '',
      job: '',
      city: '',
      category2: ''
      //sicee tyhle atributy nepotrebuju, ptze je taham ze storage, ale inspektor rve ze je chce

      // test: "http://localhost:8081/uploads/" + this.$store.state.userImages[0].productImage
    }
  },
  computed: {

// PROFIL
    getEmail() {//vraci email z objektu
      return this.$store.state.allProfiles[this.profilIndex].email
    },
    getJob() {//vraci job z objektu
      return this.$store.state.allProfiles[this.profilIndex].job
    },
    getCity() {//vraci city z objektu
      return this.$store.state.allProfiles[this.profilIndex].city
    },
    getPricePlusCurrency() {//vraci money + currency z objektu
      return this.$store.state.allProfiles[this.profilIndex].money + this.$store.state.allProfiles[this.profilIndex].currency
    },
    getCategory() { //vrací category
      return this.$store.state.allProfiles[this.profilIndex].category.toString('utf-8')
    },
// KONTAKTY
    getWeb() {
      return this.$store.state.allProfiles[this.profilIndex].web
    },
    getFacebook() {
      return this.$store.state.allProfiles[this.profilIndex].facebook
    },
    getInstagram() {
      return this.$store.state.allProfiles[this.profilIndex].instagram
    },
    getSkype() {
      return this.$store.state.allProfiles[this.profilIndex].skype
    },
    getWhatsapp() {
      return this.$store.state.allProfiles[this.profilIndex].whatsapp
    },
    // getCategory() { //vrací getter ze store
    //   console.log(this.$store.getters.getCategoryString)
    //   let category = this.$store.getters.getCategoryString.toString('utf8')//bez toho parametru mi to hlasilo chybu
    //   return category
    // },

// VISIBILITA
    getWebVisible() {
      return this.$store.state.allProfiles[this.profilIndex].webVisible
    },
    getFacebookVisible() {
      return this.$store.state.allProfiles[this.profilIndex].facebookVisible
    },
    getInstagramVisible() {
      return this.$store.state.allProfiles[this.profilIndex].instagramVisible
    },
    getSkypeVisible() {
      return this.$store.state.allProfiles[this.profilIndex].skypeVisible
    },
    getWhatsappVisible() {
      return this.$store.state.allProfiles[this.profilIndex].whatsappVisible
    },

// POPIS
    getAboutMe() {
      return this.$store.state.allProfiles[this.profilIndex].aboutMe
    },
    getOfferMe() {
      return this.$store.state.allProfiles[this.profilIndex].offerMe
    },
// GALERIE
    getUserImages: function() {
      return this.$store.state.userImages
    },

  },
  methods: {
    setUserData: function(userObj) {
      this.$store.commit('setUserData', userObj)
      // console.log(userObj)
    },
    setUserImgs: function(userObj) {
      this.$store.commit('setUserImgs', userObj)
      console.log(userObj)
    },
    getImgSrc: function(i) {
      return "http://localhost:8081/uploads/" + this.$store.state.userImages[i].productImage
    }
  },
  beforeMount() {
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou
    this.index = this.$route.params.index//priradi predany index z router.push() do data
    this.profilIndex = this.$store.state.currentProfilIndex//vezme ze store index aktuálního profilu
  },

  mounted() {
    // console.log('ProfilDetail mounted');
    // this.$store.state.serverData.then(json => console.log(json.title))
    // console.log(this.$store.state.serverData)
    // console.log(this.$store.state.userLogedId)
    // console.log(this.$route.params.index)
    // axios.get('http://localhost:8081/profilesedit/' + this.$store.state.selectedIdProfil)
    //   .then((response) => {
    //     this.setUserData(response.data[0])
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //
    axios.get('http://localhost:8081/img/' + this.$store.state.selectedProfil)
      // axios.get('http://localhost:8081/img/' + "hbo83@seznam.cz")
      .then((response) => {
        this.setUserImgs(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  },
  components: {
    Header,
    NavBar,
    ProfilImg
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
  color: #90e4f1;
}

.v-application p {
  margin: 0px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
