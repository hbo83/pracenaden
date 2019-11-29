<template>
<div>
  <!-- <v-card style="min-height: 560px;"> -->
    <v-row class="" justify="center">
      <v-col cols="5" class="myColor">
        <v-icon normal>face</v-icon>
        <span>E-mail:</span>{{get_currentProfilData}}
      </v-col>
      <v-col cols="6" class="myColor">
        <span> {{ getEmail }}</span>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="getPhoneVisible">
      <v-col cols="5" class="myColor" style="text-align: left">
        <v-icon normal>phone</v-icon>
        <span>Telefon:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>{{ getPhone }}</span>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="5" class="myColor" style="text-align: left">
        <v-icon normal>build</v-icon>
        <span>Profese:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span><a target="_blank" rel="noopener noreferrer" :href="job">{{ getJob }}</a></span>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="5" class="myColor">
        <v-icon normal>location_city</v-icon>
        <span>Místo:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span><a target="_blank" rel="noopener noreferrer" :href="city">{{ getCity }}</a></span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5" class="myColor">
        <v-icon normal>money</v-icon>
        <span>Odměna:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>{{ getPricePlusCurrency }}</span>
      </v-col>
    </v-row>

    <v-row justify="center" class="" v-if="getWebVisible">
      <v-col cols="5" class="myColor">
        <v-icon normal>web</v-icon>
        <span>Web:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span><a target="_blank" rel="noopener noreferrer" :href="web">{{ getWeb}}</a>
        </span>
      </v-col>
    </v-row>
    <v-row justify="center" class="" v-if="getFacebookVisible">
      <v-col cols="5" class="myColor">
        <v-icon large>thumb_up</v-icon>
        <span>Facebook:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>
          <a target="_blank" rel="noopener noreferrer" :href="facebook">{{ getFacebook }}</a>
        </span>
      </v-col>
    </v-row>
    <v-row justify="center" class="" v-if="getInstagramVisible">
      <v-col cols="5" class="pmyColor">
        <v-icon large>portrait</v-icon>
        <span>Instagram:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>
          <a target="_blank" rel="noopener noreferrer" :href="instagram">{{ getInstagram }}</a>
        </span>
      </v-col>
    </v-row>
    <v-row justify="center" class="" v-if="getSkypeVisible">
      <v-col cols="5" class="myColor">
        <v-icon large>call</v-icon>
        <span>Skype:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>
          {{ getSkype }}
        </span>
      </v-col>
    </v-row>
    <v-row justify="center" class="" v-if="getWhatsappVisible">
      <v-col cols="5" class="myColor">
        <v-icon large>add_alert</v-icon>
        <span>Whatsapp:</span>
      </v-col>
      <v-col cols="6" class="myColor">
        <span>
          {{ getWhatsapp }}
        </span>
      </v-col>
    </v-row>
    <!-- </p> -->
  <!-- </v-card> -->
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ProfilColumn',
  data() {
    return {

      // imgIndex: null,
      profilIndex: null, //index aktuálního profilu
      thisProfil: {},//naplní objekt aktuálním profilem z metody get v mounted
      email: '',
      //sicee tyhle atributy nepotrebuju, ptze je taham ze storage, ale inspektor rve ze je chce
      web: '',
      webVisible: true,
      phone: '',
      phoneVisible: true,
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
      category: '',
      pricePlusCurrency: ''

    }
  },
computed: {
  get_currentProfilData() {
    axios.get('http://localhost:8081/profiles/' + this.$store.state.currentProfilEmail)
      .then((response) => {
        this.thisProfil = response.data[0]
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // PROFIL
  getEmail() { //vraci email z objektu
    return this.thisProfil.email
  },
  getPhone() {//vraci phone z objektu
    return this.thisProfil.phone
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
  // KONTAKTY
  getWeb() {
    return this.thisProfil.web
  },
  getFacebook() {
    return this.thisProfil.facebook
  },
  getInstagram() {
    return this.thisProfil.instagram
  },
  getSkype() {
    return this.thisProfil.skype
  },
  getWhatsapp() {
    return this.thisProfil.whatsapp
  },


  // VISIBILITA
  getWebVisible() {
    return this.thisProfil.webVisible
  },
  getPhoneVisible() {
    return this.thisProfil.phoneVisible
  },
  getFacebookVisible() {
    return this.thisProfil.facebookVisible
  },
  getInstagramVisible() {
    return this.thisProfil.instagramVisible
  },
  getSkypeVisible() {
    return this.thisProfil.skypeVisible
  },
  getWhatsappVisible() {
    return this.thisProfil.whatsappVisible
  },

},
beforeMount() {
  // console.log('nyní beforemount')
  //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
  //lepsi nedelat zbytecny dotazy na DB kdyz uz ty data nekde jsou

  this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

},
mounted() {
  //ne vsechno musi byt ve store, nechal bych kazdou komponentu at si posila svoje requesty
  // axios.get('http://localhost:8081/profiles/' + this.$store.state.allProfiles[this.profilIndex].email)//vrátí aktuální profil
  //   .then((response) => {
  //     // console.log(response.data)
  //     this.thisProfil = response.data[0]
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

}
}
</script>

<style scoped>
img {
  position: relative;
  top: 17px;
  margin-right: 20px;
}

.profil span,
.stars span,
.category span {
  margin-left: 10px;
}
span {
  font-size: 14px;
}
.item + .item:before {/*oddeli category z pole od sebe jako string*/
  content: ", ";
}
</style>
