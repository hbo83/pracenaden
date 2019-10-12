<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4 mx-lg-auto" style="padding-left: 15%">
        <Avatar v-bind:profilPhoto="profilPhoto" />
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
              <span> {{ getProfil }}</span>
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
              <span>{{ getMoneyPlusCurrency }}</span>
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

    <v-row style="margin-top: 50px;">
      <v-col class="col-1">
        <div class="profilDetailBack">
          <v-btn height="200px" width="52%" small color="error" to="/">
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </div>
      </v-col>
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
          <v-card>
            <v-card-title>Nabízím:</v-card-title>
          </v-card>
          <v-card-text style="text-align: left; color: green;">{{ getOfferMe }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="padding-left: 10%" justify="start" max-width="1826px">
      <v-col v-for="(image, index) in getUserImages" v-bind:index="index" class="col-2">

        <v-img :src="getImgSrc(index)" :lazy-src="getImgSrc(index)" aspect-ratio="1" class="grey lighten-2" max-width="300" max-height="200"></v-img>
      </v-col>
    </v-row>
  </v-container>

  </div>
</v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Avatar from '@/components/Avatar.vue'
import Profil from '@/components/Profil.vue'
import axios from 'axios'
// import { mdiWebBox } from '@mdi/font';
export default {
  name: 'ProfilDetail',
  data() {
    return {
      index: null,
      id: '',
      email: '',
      profileDatas: null,
      profilPhoto: '',
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
    getIdProfil() {
      return this.$store.state.selectedIdProfil
    },
    getJob() {
      return this.$store.state.selectedProfilData.job
    },
    getProfil() {
      return this.$store.state.selectedProfil
    },
    getCity() {
      return this.$store.state.selectedProfilData.city
    },
    getMoneyPlusCurrency() { //vrací getter ze store
      return this.$store.getters.getPricePlusCurrency
    },
    getCategory() { //vrací getter ze store
      console.log(this.$store.getters.getCategoryString)
      return this.$store.getters.getCategoryString
    },
    getWeb() {
      return this.$store.state.selectedProfilData.web
    },
    getWebVisible() {
      return this.$store.state.selectedProfilData.webVisible
    },
    getFacebook() {
      return this.$store.state.selectedProfilData.facebook
    },
    getFacebookVisible() {
      return this.$store.state.selectedProfilData.facebookVisible
    },
    getInstagram() {
      return this.$store.state.selectedProfilData.instagram
    },
    getInstagramVisible() {
      return this.$store.state.selectedProfilData.instagramVisible
    },
    getSkype() {
      return this.$store.state.selectedProfilData.skype
    },
    getSkypeVisible() {
      return this.$store.state.selectedProfilData.skypeVisible
    },
    getWhatsapp() {
      return this.$store.state.selectedProfilData.whatsapp
    },
    getWhatsappVisible() {
      return this.$store.state.selectedProfilData.whatsappVisible
    },
    getAboutMe() {
      return this.$store.state.selectedProfilData.aboutMe
    },
    getOfferMe() {
      return this.$store.state.selectedProfilData.offerMe
    },
    getUserImages: function() {
      return this.$store.state.userImages
    },

  },
  methods: {
    setUserData: function(userObj) {
      this.$store.commit('setUserData', userObj)
      console.log(userObj)
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
  },
  mounted() {
    // console.log('ProfilDetail mounted');
    console.log(this.$store.state.userLogedId)
    axios.get('http://localhost:8081/profilesedit/' + this.$store.state.selectedIdProfil)
      .then((response) => {
        this.setUserData(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });

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
    Avatar
  }
}
</script>

<style scoped>
.profilDetailBack {
  height: 192px;
  border-radius: 5px;
}

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
