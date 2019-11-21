<template>
<v-col class="col-12 profil">
  <v-card style="">
    <v-row class="" justify="center">
      <v-col cols="4" class="myColor">
        <v-icon class="" large>face</v-icon>
        <span>E-mail:</span>
      </v-col>
      <v-col cols="4" class="myColor">
        <span> {{ getEmail }}</span>
      </v-col>
    </v-row>

    <v-row class="" justify="center" v-if="getPhoneVisible">
      <v-col cols="4" class="myColor" style="text-align: left">
        <v-icon class="" large>phone</v-icon>
        <span>Telefon:</span>
      </v-col>
      <v-col cols="4" class="myColor">
        <span>{{ getPhone }}</span>
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

  </v-card>
</v-col>
</template>

<script>

import axios from 'axios'

export default {
  name: 'OfferColumn',
  data() {
    return {

      imgIndex: null,
      profilIndex: null, //index aktuálního profilu
      thisProfil: {},//naplní objekt aktuálním profilem z metody get v mounted
      email: '',
      phone: '',
      phoneVisible: true,
      city: '',
      category: '',
      pricePlusCurrency: ''

    }
  },
computed: {

  // PROFIL
  getEmail() { //vraci email z objektu
    return this.thisProfil.email
  },
  getPhone() {//vraci phone z objektu
    return this.thisProfil.phone
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


  // VISIBILITA
  getPhoneVisible() {
    return this.thisProfil.phoneVisible
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
  axios.get('http://localhost:8081/profiles/' + this.$store.state.allProfiles[this.profilIndex].email)//vrátí aktuální profil
    .then((response) => {
      // console.log(response.data)
      this.thisProfil = response.data[0]
    })
    .catch((error) => {
      console.log(error);
    });

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

.item + .item:before {/*oddeli category z pole od sebe jako string*/
  content: ", ";
}
</style>
