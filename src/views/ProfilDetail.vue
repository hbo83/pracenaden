<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4" style="margin-left: 141px;">
        <Avatar v-bind:profilPhoto="profilPhoto"/>
        <p class="profil"><span style="margin-left: 50px">
            <v-icon color="yellow">face</v-icon>
          <!-- </span><span style="margin-left: 50px;">{{ profileDatas.name }}</span></p> -->
        </span><span style="margin-left: 50px;">{{ getProfil }}</span></p>
        <p class="profil"><span style="margin-left: 50px">
            <v-icon>build</v-icon>
          </span><span style="margin-left: 50px;">{{ this.$store.state.selectedProfilData.job }}</span></p>
        <p class="profil"><span style="margin-left: 50px">
            <v-icon>location_city</v-icon>
          </span><span style="margin-left: 50px;">{{ this.$store.state.selectedProfilData.city }}</span></p>
        <p class="profil"><span style="margin-left: 50px">
            <v-icon>money</v-icon>
          </span><span style="margin-left: 50px;">{{ this.$store.state.selectedProfilData.money }}</span></p>
        <p class="profil"><span style="margin-left: 50px">
            <v-icon>category</v-icon>
          </span><span style="margin-left: 50px;">{{ this.$store.state.selectedProfilData.category[0] + " | " + this.$store.state.selectedProfilData.category[1] + " |  " + this.$store.state.selectedProfilData.category[2] }}</span></p>

      </v-col>
      <v-col style="margin-left: 248px;">
        <div class="profilDetailMoreHeader">

          <div class="more">
            <p><img src="https://img.icons8.com/color/48/000000/web.png"><a target="_blank" rel="noopener noreferrer" v-bind:href="web">{{this.$store.state.selectedProfilData.web}}</a></p>
            <p><img src="https://img.icons8.com/color/48/000000/facebook-new.png"><a target="_blank" rel="noopener noreferrer" :href="facebook">{{this.$store.state.selectedProfilData.facebook}}</a></p>
            <p><img src="https://img.icons8.com/color/48/000000/instagram-new.png"><a target="_blank" rel="noopener noreferrer" :href="instagram">{{this.$store.state.selectedProfilData.instagram}}</a></p>
          </div>

          <div class="socials">
            <p><img src="https://img.icons8.com/color/48/000000/skype--v2.png">{{this.$store.state.selectedProfilData.skype}}</p>
            <p><img src="https://img.icons8.com/color/48/000000/whatsapp.png">{{this.$store.state.selectedProfilData.whatsapp}}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row style="margin-top: 50px;">
      <v-col class="col-1">
        <div class="profilDetailBack">
          <v-btn height="63px" width="52%" small color="error" to="/">
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <v-card height="200px">
          <v-card>
            <v-card-title max-width="50%">Něco o mně:</v-card-title>
          </v-card>
          <v-card-text style="text-align: left; color: green;">{{ this.$store.state.selectedProfilData.aboutMe }}</v-card-text>

        </v-card>
      </v-col>
      <v-col>
        <v-card height="200px">
          <v-card>
            <v-card-title>Nabízím:</v-card-title>
          </v-card>
          <v-card-text style="text-align: left; color: green;">{{ this.$store.state.selectedProfilData.offerMe }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" max-width="1826px" style="margin-left: 198px">
      <v-col v-for="(image, index) in imgs2" v-bind:index="index" class="col-4">

        <v-img :src="imgs2[index]" lazy-src="imgs2[index]" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
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
export default {
  name: 'ProfilDetail',
  data() {
    return {
      index: null,
      id: '',
      email: 'abc',
      web: '',
      facebook: '',
      instagram: '',
      profileDatas: null,
      imgs: [],
      imgs2: [],
      profilPhoto: ''

    }
  },
  computed: {
    // ap: function() {
    //   return "http://localhost:8081/uploads/" + this.imgs[0].productImage
    // },
    // ap2: function() {
    //   for ( var i in this.imgs) {
    //     this.imgs2.push("http://localhost:8081/uploads/" + imgs[i].productImage)
    //     return this.imgs2
    //   }
    // }
getProfil() {
  return this.$store.state.selectedProfil
},
getIdProfil() {
  return this.$store.state.selectedIdProfil
}
  },
  methods: {
    setUserData: function(userObj) {
      this.$store.commit('setUserData', userObj)
      console.log(userObj)
    }
  },
  beforeMount() {
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou
  },
  mounted() {
    console.log('ProfilDetail mounted');

    axios.get('http://localhost:8081/profilesedit/' + this.$store.state.selectedIdProfil)
      .then((response) => {
        this.setUserData(response.data[0])
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
.profilDetailMoreHeader {
  height: 192px;
  margin: 5px 0 0 5px;
  border-radius: 5px;
}

.profilDetailBack {
  height: 192px;
  border-radius: 5px;
}

.profilDetailMore {
  height: 192px;
  border-radius: 5px;
}

.more {
  width: 49%;
  height: 150px;
  float: left;
  font-size: 19px;
}

.more p {
  font-size: 19px;
}

img {
  position: relative;
  top: 17px;
  margin-right: 20px;
}

.socials {
  width: 49%;
  height: 150px;
  /* border: 1px solid black; */
  float: left;
}

.socials p {
  font-size: 19px;
}

.profilDetailMore p {
  font-size: 15px;
}

p {
  text-align: left;
  font-size: 28px;
  margin: 0px;
}

.profil {
  display: block;
  text-align: left;
  margin-bottom: 10px;
  /* float: right; */
  font-size: 20px;
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
