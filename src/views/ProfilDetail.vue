<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4">
        <Profil v-bind:profileDatas="profileDatas" />
        <!-- <Profil /> -->
        <!-- <div class="profilDetail">
          <Avatar></Avatar>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>{{ name }}</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Obor:</b></span><span style="margin-left: 50px;"><b>Truhlářství</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Město:</b></span><span style="margin-left: 50px;"><b>Cheb</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Požadovaná odměna:</b></span><span style="margin-left: 50px;"><b>165.-Kč / hod.</b></span></p>
          <div style="margin-left: 200px;">
            <p style="text-align: left;">Zabývám se renovací starého nábytku, výrobou nového nábytku a likvidací dřevěného materiálu</p>
          </div>
        </div> -->
      </v-col>
      <v-col>
        <div class="profilDetailMoreHeader">
          <p><span><b>Kategorie: </b></span><span>
              <v-btn color="success">Renovace</v-btn>
            </span></p>
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
        <div class="profilDetailMore">
          <p><span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas libero. Aenean placerat. Donec iaculis gravida nulla. Mauris dictum facilisis augue. Nullam sit amet magna in magna gravida vehicula. Maecenas fermentum, sem in
              pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Integer tempor. Donec iaculis gravida nulla. Fusce wisi. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed
              libero. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nunc dapibus tortor vel mi dapibus sollicitudin. Mauris dictum facilisis augue. In enim a arcu imperdiet malesuada.</span></p>

        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-carousel>
    <v-carousel-item
      v-for="(item,i) in pictures"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
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

      // name: '',
      // job: '',
      id: '',
      email: '',
      phone: '',
      // money: '',
      // city: null,
      description: '',
      web: '',
      facebook: '',
      instagram: '',
      skype: '',
      whatsapp: '',
      profileDatas: null,
      profileDatas2: null,
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
    console.log(this.$route.params.id);
    console.log(this.$route.params.profileDatas);
    console.log(this.profileDatas2);
    axios.get('http://localhost:8081/profilesedit/' + this.id)
      .then((response) => {
        this.profileDatas = response.data[0];
        console.log(response.data[0]);
        console.log(response.data[0].name);
        // this.name = response.data[0].name;
        // this.job = response.data[0].job;
        // this.money = response.data[0].money;
        this.phone = response.data[0].phone;
        // this.city = response.data[0].city;
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


  },
  components: {
    Header,
    Avatar,
    Profil
  }
}
</script>

<style scoped>
.profilDetail {
  /* width: 600px; */
  height: 192px;
  background-color: pink;
  border-radius: 5px;
  padding: 20px;
  margin: 5px 0 0 5px;
  /* float: left; */
  cursor: pointer;
  /* zena ruzovy ramecek , muz modry treba */
}

.profilDetailMoreHeader {
  /* width: 67%; */
  height: 192px;
  /* border: 1px solid black; */
  /* float: left; */
  margin: 5px 0 0 5px;
  border-radius: 5px;
}

.profilDetailBack {
  /* width: 5%; */
  height: 192px;
  /* border: 1px solid black; */
  /* float: left; */
  /* margin: 5px 0 0 5px; */
  border-radius: 5px;
}

.profilDetailMore {
  /* width: 91%; */
  height: 192px;
  /* border: 1px solid black; */
  /* float: left; */
  /* margin: 5px 0 0 5px; */
  border-radius: 5px;
}

.more {
  width: 49%;
  height: 150px;
  /* border: 1px solid black; */
  float: left;
  /* background-color: rgba(144,228,241,0.2); */
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

/* .profilDetailGalery {
  width: 100%;
  height: auto;
  border: 1px solid black;
  float: left;
  margin: 5px 0 0 5px;
  border-radius: 5px;
} */
p {
  text-align: left;
  font-size: 28px;
  margin: 0px;
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
