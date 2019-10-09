<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-2" style="margin-left: 1px;">
        <Avatar v-bind:profilPhoto="profilPhoto" />
      </v-col>
      <v-col class="profil">
        <p>
          <v-icon large color="#90e4f1">face</v-icon>
          <span>{{ getProfil }}</span>
        </p>
        <p>
          <v-icon large color="#90e4f1">build</v-icon>
          <span>{{ getJob }}</span>
        </p>
        <p>
          <v-icon large color="#90e4f1">location_city</v-icon>
          <span>{{ getCity }}</span>
        </p>
        <p>
          <v-icon large color="#90e4f1">money</v-icon>
          <span>{{ getMoney }}</span>
        </p>
        <p>
          <v-icon large color="#90e4f1">category</v-icon>
          <span>{{ getCategory }}</span>
        </p>
        </p>

      </v-col>
      <v-col class="profil">
        <p v-if="getWebVisible">
          <v-icon large color="#90e4f1">web</v-icon>
          <span>
            <a target="_blank" rel="noopener noreferrer" v-bind:href="web">{{ getWeb}}</a>
          </span>
        </p>
        <p v-if="getFacebookVisible">
          <v-icon large color="#90e4f1">thumb_up</v-icon><a target="_blank" rel="noopener noreferrer" :href="facebook">{{ getFacebook }}</a>
        </p>
        <p v-if="getInstagramVisible">
          <v-icon large color="#90e4f1">portrait</v-icon><a target="_blank" rel="noopener noreferrer" :href="instagram">{{ getInstagram }}</a>
        </p>
        <p v-if="getSkypeVisible">
          <v-icon large color="#90e4f1">call</v-icon>{{ getSkype }}
        </p>
        <p v-if="getWhatsappVisible">
          <v-icon large color="#90e4f1">add_alert</v-icon>{{ getWhatsapp }}
        </p>
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
          <v-card>
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

    <v-row justify="center" max-width="1826px" style="margin-left: 198px">
      <v-col v-for="(image, index) in getUserImages" v-bind:index="index" class="col-4">

        <v-img :src="getImgSrc(index)" :lazy-src="getImgSrc(index)" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
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
      whatsapp: ''
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
    getMoney() {
      return this.$store.state.selectedProfilData.money
    },
    getCategory() {
      let category = this.$store.state.selectedProfilData.category
      category = category.join(",")
      return category
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

p {
  text-align: left;
  font-size: 28px;
  margin: 0px;
}

.profil {
  /* display: block;
  text-align: left;
  margin-bottom: 10px; */
  /* float: right; */
  /* font-size: 20px; */
}

.profil p span {
  font-size: large;
  margin-left: 3%;
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
