<template>
<v-app>
  <Header />
  <NavBar />
  <v-container>
    <v-row class="col-12" justify="center">
      <v-col class="col-8">
        <v-row>
          <v-col class="col-4">
            <!-- <v-card> -->
              <!-- <ProfilImg v-bind:index="this.index"></ProfilImg> -->
              <div class="profilImg">
              <img :src="profilePath" alt="profilPhoto" style="width: 150px; height: 150px; margin: auto; border-radius: 100px;">
            </div>
            <!-- </v-card> -->
          </v-col>
          <v-col class="col-8">
            <v-row justify="center">
            <v-col class="col-12">
            <v-card class="">
              <v-row class="" justify="center">
                <v-col cols="4" class="">
                <p><span><v-icon color="yellow">star</v-icon></span><span>10</span></p>

              </v-col>
              <v-col cols="4">
                <span><v-icon color="pink">star</v-icon></span><span>10</span>
              </v-col>
            </v-row>
            </v-card>
          </v-col>

        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-card class="">
                <v-row class="" justify="center">
                  <v-col cols="4" class="">
                    <v-icon class="" large color="#90e4f1">category</v-icon>
                    <span>Kategorie:</span>
                  </v-col>
                  <v-col cols="4" class="myColor pa-0 pt-4">

                    <span> {{ getCategory }} </span>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-card height="367px">
              <v-card class="">
                <v-card-title max-width="50%">Něco o mně:</v-card-title>
              </v-card>
              <v-card-text style="text-align: left; color: green;">{{ getAboutMe }}</v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- PROFIL -->
      <v-col class="col-3 profil">
        <v-card style="min-height: 560px;">
          <v-row class="" justify="center">
            <v-col cols="4" class="myColor">
              <v-icon class="" large>face</v-icon>
              <span>E-mail:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span> {{ getEmail }}</span>
            </v-col>
          </v-row>

          <v-row class="" justify="center">
            <v-col cols="4" class="myColor" style="text-align: left">
              <v-icon class="" large>build</v-icon>
              <span>Profese:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span><a target="_blank" rel="noopener noreferrer" :href="job">{{ getJob }}</a></span>
            </v-col>
          </v-row>

          <v-row class="" justify="center">
            <v-col cols="4" class="myColor">
              <v-icon class="" large>location_city</v-icon>
              <span>Místo:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span><a target="_blank" rel="noopener noreferrer" :href="city">{{ getCity }}</a></span>
            </v-col>
          </v-row>
          <v-row class="" justify="center">
            <v-col cols="4" class="myColor">
              <v-icon class="" large>money</v-icon>
              <span>Odměna:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span>{{ getPricePlusCurrency }}</span>
            </v-col>
          </v-row>

          <v-row  justify="center" class="" v-if="getWebVisible">
            <v-col cols="4" class="myColor">
              <v-icon large>web</v-icon>
              <span>Web:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span><a target="_blank" rel="noopener noreferrer" :href="web">{{ getWeb}}</a>
              </span>
            </v-col>
          </v-row>
          <v-row justify="center" class="" v-if="getFacebookVisible">
            <v-col cols="4" class="myColor">
              <v-icon large>thumb_up</v-icon>
              <span>Facebook:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span>
                <a target="_blank" rel="noopener noreferrer" :href="facebook">{{ getFacebook }}</a>
              </span>
            </v-col>
          </v-row>
          <v-row justify="center"  class="" v-if="getInstagramVisible">
            <v-col cols="4" class="pmyColor">
              <v-icon large>portrait</v-icon>
              <span>Instagram:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span>
                <a target="_blank" rel="noopener noreferrer" :href="instagram">{{ getInstagram }}</a>
              </span>
            </v-col>
          </v-row>
          <v-row justify="center" class="" v-if="getSkypeVisible">
            <v-col cols="4" class="myColor">
              <v-icon large>call</v-icon>
              <span>Skype:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span>
                {{ getSkype }}
              </span>
            </v-col>
          </v-row>
          <v-row justify="center" class="" v-if="getWhatsappVisible">
            <v-col cols="4" class="myColor">
              <v-icon large>add_alert</v-icon>
              <span>Whatsapp:</span>
            </v-col>
            <v-col cols="4" class="myColor">
              <span>
                {{ getWhatsapp }}
              </span>
            </v-col>
          </v-row>
          <!-- </p> -->
        </v-card>
      </v-col>

      <!-- KONTAKTY -->
      <!-- <v-col class="col-4 profil">

      </v-col> -->
    </v-row>



    <v-row style="padding-left: 10%; padding-right: 1%" justify="start" max-width="1826px">
      <v-col v-for="(image, imgIndex) in getOwnUserImages" v-bind:index="imgIndex" class="galleryImg col-2">

        <v-img :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1" onclick="console.log(this)" class="grey lighten-2" max-width="300" max-height="200" style="border: 5px solid grey; border-radius: 0px; cursor: pointer">
        </v-img>
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
      profilIndex: null,//index aktuálního profilu
      id: '',
      email: '',
      profileDatas: null,
      //sicee tyhle atributy nepotrebuju, ptze je taham ze storage, ale inspektor rve ze je chce
      web: '',
      webVisible: true,
      facebook: '',
      facebookVisible: true,
      instagram: '',
      instagramVisible: true,
      skype: '',
      skypeVisible: true,
      whatsapp: '',
      whatsappVisible: true,
      job: '',
      city: '',
      category2: '',
      category: '',
      aboutMe: '',
      pricePlusCurrency: '',
      profilePath: '',
      ownUserImages: []
      //sicee tyhle atributy nepotrebuju, ptze je taham ze storage, ale inspektor rve ze je chce

      // test: "http://localhost:8081/uploads/" + this.$store.state.userImages[0].productImage
    }
  },
  computed: {
    getAboutMe() {
      return this.aboutMe = this.$store.state.allProfiles[this.profilIndex].aboutMe
    },
    getThisProfile() {
      return this.$store.state.thisProfile
    },

    getProfilePath() {
      return 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.profilIndex].email + '/profilPhoto.jpg'
    },
    getOwnUserImages() {//vrací pole imgs. které se načtou v axios monted dole
      return this.ownUserImages
    },
    // PROFIL
    getEmail() { //vraci email z objektu
      return this.$store.state.allProfiles[this.profilIndex].email
    },
    getJob() { //vraci job z objektu
      return this.$store.state.allProfiles[this.profilIndex].job
    },
    getCity() { //vraci city z objektu
      return this.$store.state.allProfiles[this.profilIndex].city
    },
    getPricePlusCurrency() { //vraci money + currency z objektu
      return this.$store.state.allProfiles[this.profilIndex].money + this.$store.state.allProfiles[this.profilIndex].currency
    },
    getCategory() { //vrací category
      return this.$store.state.allProfiles[this.profilIndex].category.toString('utf-8')
      // return this.$store.state.allProfiles[this.profilIndex].category.toString('utf-8')
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
      console.log(this.$store.state.allProfiles[this.profilIndex].webVisible)
      // return this.$store.state.allProfiles[this.profilIndex].webVisible
      return this.$store.getters.getWebVisible
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
    // getAboutMe() {
    //   this.aboutMe = this.$store.state.allProfiles[this.profilIndex].aboutMe
    //   // return this.$store.state.allProfiles[this.profilIndex].aboutMe
    // },
    // getOfferMe() {
    //   return this.$store.state.allProfiles[this.profilIndex].offerMe
    // },
    // GALERIE
    getUserImages: function() {
      console.log(this.$store.state.userImages)
      // this.ownUserImages = this.$store.state.userImages
      return this.$store.state.userImages
    },
    updateImages: function() {
      return this.ownUserImages
    }

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
  beforeMount() {console.log('nyní beforemount')
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou
    // this.getWebVisible()
    this.index = this.$route.params.index //priradi predany index z router.push() do data
    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

    this.profilePath = 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.$store.state.currentProfilIndex].email + '/profilPhoto.jpg'
    // this.setUserImgs()
  },

  mounted() {
console.log('nyní mounted')
    console.log(this.$store.getters.getThisProfil)
    axios.get('http://localhost:8081/img/' + this.$store.state.allProfiles[this.profilIndex].email)

      .then((response) => {
        this.setUserImgs(response.data)
        this.ownUserImages = response.data
      })
      .catch((error) => {
        console.log(error);
      });
  // this.profilePath = 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.profilIndex].email + '/profilPhoto.jpg'
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

.profil span {
  margin-left: 10px;
}
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
