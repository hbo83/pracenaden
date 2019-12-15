<template>
<div>
  <!-- <v-card style="min-height: 560px;"> -->
  <v-row class="" justify="center">
    <v-col cols="5" class="myColor">
      <v-icon normal>face</v-icon>
      <span>E-mail:</span>{{email}}
    </v-col>
    <v-col cols="6" class="myColor">
      <span> {{ Email }}</span>
    </v-col>
  </v-row>

  <v-row justify="center" v-if="PhoneVisible">
    <v-col cols="5" class="myColor" style="text-align: left">
      <v-icon normal>phone</v-icon>
      <span>Telefon:</span>
    </v-col>
    <v-col cols="6" class="myColor">
      <span>{{ Phone }}</span>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col cols="5" class="myColor" style="text-align: left">
      <v-icon normal>build</v-icon>
      <span>Profese:</span>
    </v-col>
    <v-col cols="6" class="myColor">
      <span><a target="_blank" rel="noopener noreferrer" :href="job">{{ Job }}</a></span>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col cols="5" class="myColor">
      <v-icon normal>location_city</v-icon>
      <span>Místo:</span>
    </v-col>
    <v-col cols="6" class="myColor">
      <span><a target="_blank" rel="noopener noreferrer" :href="city">{{ City }}</a></span>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="5" class="myColor">
      <v-icon normal>money</v-icon>
      <span>Odměna:</span>
    </v-col>
    <v-col cols="6" class="myColor">
      <span>{{ PricePlusCurrency }}</span>
    </v-col>
  </v-row>

  <v-row justify="center" class="" v-if="WebVisible">
    <v-col cols="5" class="myColor">
      <v-icon normal>web</v-icon>
      <span>Web:</span>
    </v-col>
    <v-col cols="6" class="myColor">
      <span><a target="_blank" rel="noopener noreferrer" :href="web">{{ getWeb}}</a>
      </span>
    </v-col>
  </v-row>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfilColumn',
  data() {
    return {
      formContent: {
        _id: '', // zde nepouzivam, jen doplni objekt aby sedel s DB
        __v: '', // zde nepouzivam, jen doplni objekt aby sedel s DB
        modified: '', // zde nepouzivam, jen doplni objekt aby sedel s DB
        email: this.$store.state.userLoged,
        firstName: '',
        lastName: '',
        job: '',
        price: '',
        category: [],
        aboutMe: '',
        phone: '',
        city: '',
        web: '',
        osvc: true,
        currency: '',
        hideProfil: false,
        checkboxAgree: true
      },
      // imgIndex: null,
      profilIndex: null, //index aktuálního profilu
    }
  },
  computed: {
    get_currentProfilData() {
      axios.get('http://10.0.0.22:8081/profiles/' + this.$store.state.currentProfilEmail)
        .then((response) => {
          this.formContent = response.data[0]
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // PROFIL
    getEmail() { //vraci email z objektu
      return this.thisProfil.email
    },
    getPhone() { //vraci phone z objektu
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

.item+.item:before {
  /*oddeli category z pole od sebe jako string*/
  content: ", ";
}

.myColor {
  padding: 0;
}
</style>
