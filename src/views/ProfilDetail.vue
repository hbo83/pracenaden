<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4" style="margin-left: 141px;">
        <Avatar />
        <p class="profil"><span style="margin-left: 50px"><v-icon>face</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.name }}</span></p>
        <p class="profil"><span style="margin-left: 50px"><v-icon>build</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.job }}</span></p>
        <p class="profil"><span style="margin-left: 50px"><v-icon>location_city</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.city }}</span></p>
        <p class="profil"><span style="margin-left: 50px"><v-icon>money</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.money }}</span></p>
        <p class="profil"><span style="margin-left: 50px"><v-icon>category</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.category[0] + " | " + profileDatas.category[1] + " |  " + profileDatas.category[2] }}</span></p>

      </v-col>
      <v-col style="margin-left: 248px;">
        <div class="profilDetailMoreHeader">
          <!-- <p><span><b>Kategorie: </b></span><span>
              <v-btn color="success">Renovace</v-btn>
            </span></p> -->
          <div class="more">
            <p><img src="https://img.icons8.com/color/48/000000/web.png"><a target="_blank" rel="noopener noreferrer" v-bind:href="web">{{web}}</a></p>
            <p><img src="https://img.icons8.com/color/48/000000/facebook-new.png"><a target="_blank" rel="noopener noreferrer" :href="facebook">{{facebook}}</a></p>
            <p><img src="https://img.icons8.com/color/48/000000/instagram-new.png"><a target="_blank" rel="noopener noreferrer" :href="instagram">{{instagram}}</a></p>
          </div>

          <div class="socials">
            <p><img src="https://img.icons8.com/color/48/000000/skype--v2.png">{{skype}}</p>
            <p><img src="https://img.icons8.com/color/48/000000/whatsapp.png">{{whatsapp}}</p>
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
            <v-card-title>Něco o mně</v-card-title>
          </v-card>
          <v-card-text style="text-align: left; color: green;">I'm card text</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="200px">
          <v-card>
            <v-card-title>Nabízím</v-card-title>
          </v-card>
          4
          5
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" max-width="1826px" style="margin-left: 198px">
      <v-col  v-for="image in imgs" class="col-4">
        <!-- <v-carousel>
    <v-carousel-item
      v-for="(item,i) in pictures"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel> -->
  <v-img
      src="https://picsum.photos/id/11/500/300"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    ></v-img>
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

      name: '',
      job: '',
      id: '',
      email: '',
      phone: '',
      money: '',
      city: null,
      description: '',
      web: '',
      facebook: '',
      instagram: '',
      skype: '',
      whatsapp: '',
      profileDatas: null,
      imgs: [],
      pictures: [
          {
            src: 'http://localhost:8081/uploads/1566218042323-start.PNG',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ]

    }
  },
  methods: {

  },
  beforeMount() {
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
        this.profileDatas = this.$route.params.profileDatas
        //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou
  },
  mounted() {
    console.log('ProfilDetail mounted');
    this.id = this.$route.params.id
    this.email = this.$route.params.email
    console.log(this.$route.params.id);
    console.log(this.$route.params.email);
    // console.log(this.$route.params.profileDatas);
    // console.log(this.profileDatas2);
    axios.get('http://localhost:8081/profilesedit/' + this.id)
      .then((response) => {
        this.profileDatas = response.data[0];
        console.log(response.data[0]);
        console.log(response.data[0].name);
        this.name = response.data[0].name;
        this.job = response.data[0].job;
        this.money = response.data[0].money;
        this.phone = response.data[0].phone;
        this.city = response.data[0].city;
        this.description = response.data[0].description;
        this.web = response.data[0].web;
        this.facebook = response.data[0].facebook;
        this.instagram = response.data[0].instagram;
        this.skype = response.data[0].skype;
        this.whatsapp = response.data[0].whatsapp;
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:8081/img/' + this.email)
      .then((response) => {
        this.imgs = response.data[0];
        console.log(response.data[0]);

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
