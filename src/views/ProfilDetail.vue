<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4">
        <Profil v-bind:profileDatas="profileDatas"/>
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
          <p><span><b>Kategorie: </b></span><span><v-btn color="success">Renovace</v-btn></span></p>
          <div class="more">
          <p><span><img src="https://img.icons8.com/color/48/000000/web.png"></span><span><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/habi83">www.jarmil.cz</a></span></p>
          <p><span><img src="https://img.icons8.com/color/48/000000/facebook-new.png"></span><span><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/habi83">https://www.facebook.com/habi83</a></span></p>
          <p><span><img src="https://img.icons8.com/color/48/000000/instagram-new.png"></span><span><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/habi83">https://www.instagram.com/habi83</a></span></p>
        </div>

          <div class="socials">
            <p><span><img src="https://img.icons8.com/color/48/000000/skype--v2.png"></span><span>habi83</span></p>
            <p><span><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></span><span>habi83</span></p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-1">
        <div class="profilDetailBack">
          <v-btn height="190px" width="100%" small color="error" to="/">
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="profilDetailMore">
          <p><span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas libero. Aenean placerat. Donec iaculis gravida nulla. Mauris dictum facilisis augue. Nullam sit amet magna in magna gravida vehicula. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Integer tempor. Donec iaculis gravida nulla. Fusce wisi. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nunc dapibus tortor vel mi dapibus sollicitudin. Mauris dictum facilisis augue. In enim a arcu imperdiet malesuada.</span></p>

        </div>
      </v-col>
    </v-row>

    <v-row>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
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
      msg: 'PraceNaDen',
      name: 'Martin',
      id: localStorage.getItem("userLoged_id"),
      email: '',
      phone: '',
      job: '',
      money: '',
      description: '',
      city: null,
      profileDatas: null

    }
  },
  methods: {

  },
  mounted() {
    console.log('ProfilDetail mounted');
    // this.name = this.$route.params.profileDatas
    // console.log(this.$route.params);
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
  background-color: rgba(144,228,241,0.2);
  font-size: 19px;
}
.more p {
  font-size: 19px;
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
