<template>
<v-container style="width: 34%">
  <h3>Zde prosím vyplňte informace o poptávce</h3>
  <v-form ref="form" :lazy-validation="false" v-model="valid">
    <v-col>

      <v-text-field v-model="title" label="Nadpis" :rules="titleRules" required></v-text-field>
      <v-row>
        <v-col>
          <v-text-field v-model="price" label="Nabízená odměna" :rules="priceRules" required></v-text-field>
        </v-col>
        <v-col>
          <v-select v-model="currency" :items="selectedCurrencyItems" :rules="currencyRules" label="Jednotka" required></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" sm="12">
          <v-select v-model="city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="12">
          <v-select v-model="selectedCategoryItems" :items="itemsCategory" :rules="categoriesRules" :counter="3" attach chips label="Kategorie" multiple required></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="6">
          <h4>Bližžší informace:</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <VueTrix v-model="aboutOffer" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="6">
          <h4>Vystavit dne:</h4>
        </v-col>
        <v-col cols="6" md="6">
          <h4>Ukončit dne:</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="6">
          <v-date-picker v-model="exposeDate"></v-date-picker>
        </v-col>
        <v-col cols="6" md="6">
          <v-date-picker v-model="hideDate"></v-date-picker>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row>

        <v-col cols="6" sm="6">

          <v-switch v-model="showOffer" class="ma-4" :label="`Vystavený inzerát: ${offerVisible}`"></v-switch>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-btn color="success" :disabled="!valid" @click="saveProfil">Uložit</v-btn>
        </v-col>
      </v-row>

    </v-col>
  </v-form>
  <br /><br />
</v-container>
</template>

<script>
import axios from 'axios'
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import VueTrix from 'vue-trix'
import SaveOffer from '@/MyObjects/SaveOffer.js'
import SaveNewOffer from '@/MyObjects/SaveNewOffer.js'
import LoadOffer from '@/MyObjects/LoadOffer.js'
export default {
  name: 'OfferEditForm',
  components: {
    VueTrix
  },
  data: () => ({
    exposeDate: null,//datum vystavení nabídky
    hideDate: null,//datum automatického skrytí nabídky
    index: null,
    imgs: [], //pole objektů
    imgs2: [], //pole paths obrazků
    valid: false,
    osvc: false,
    showOffer: true,
    price: null,
    priceRules: [
      v => !!v || 'Požadovaná odměna je povinná',
      v => (v && v.length <= 10) || 'Požadovaná odměna je povinná',
    ],
    currency: ".- / hod",
    selectedCurrencyItems: [".- / hod", ".- / den", ".- / práci"],
    currencyRules: [
      v => !!v || 'Jednotka je povinná',
      // v => (v && v.length <= 10) || 'Odměna musí být více než 9',
    ],
    selectedCategoryItems: [], //v poli musi byt hodnota z výčt itemsCategory, jinak se nenačte
    itemsCategory: categories,
    categoriesRules: [
      v => !!v || 'Kategorie je povinná',
      // v => (v && v.length <= 10) || 'Odměna musí být více než 9',
    ],
    aboutOffer: '',
    aboutOfferRules: [
      v => !!v || 'O mě je povinná',
      v => (v && v.length >= 10) || 'O mě musí mít víc jak 10 znaků',
    ],
    title: '',
    titleRules: [
      v => !!v || 'Titulek je povinný',
      v => (v && v.length >= 10) || 'O mě musí mít víc jak 10 znaků',
    ],

    city: null,
    items: cities,
    id: '',
    email: '',
    dictionary: {
      attributes: {
        email: 'E-mail Address',
        // custom attributes
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters',
          // custom messages
        },
        select: {
          required: 'Select field is required',
        },
      },
    },
  }),
  props: {
    newOffer: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    offerVisible: function() {
      if (this.showOffer === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },

  },
  methods: { //hma, ale pak musim nejak nastavit, ze se ostatni profilPhoto na serveru nejak odznaci ... nejdriv poslu na vsechny ostatni false a na ten jeden true

    getImgSrc: function(i) { //vrati cestu k obrazku
      return "http://localhost:8081/uploads/" + this.ownUserImages[i].productImage
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },



    saveProfil() { //updatuje profil

      var offer = {
        email: this.email,
        title: this.title,
        price: this.price,
        city: this.city,
        selectedCategoryItems: this.selectedCategoryItems,
        currency: this.currency,
        showOffer: this.showOffer,
        aboutOffer: this.aboutOffer,
        exposeDate: this.exposeDate,
        hideDate: this.hideDate
      }

      if(this.newOffer) {
        const saveNewOffer = new SaveNewOffer('http://localhost:8081/newOffer/' + this.email)
        saveNewOffer.saveOffer(offer)
      } else {
        const saveThis = new SaveOffer('http://localhost:8081/offersedit/' + this.email)
        saveThis.saveOffer(offer)
      }

    }
  },
  mounted() {
    this.id = this.$store.state.userLogedId
    this.email = this.$store.state.userLoged

    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+ date.getDate();
    var afterMonth = date.getFullYear() + '-' + date.getMonth() +'-'+ date.getDate();
    this.exposeDate = today
    this.hideDate = afterMonth

    console.log(this.email)

    if (!this.newOffer) { //tohle musim poresit, kdyz neni zalogovanej tak nemuze zakladat offer
      // const loadThis = new LoadOffer('http://localhost:8081/offers/' + this.email)

      // loadThis.loadOffer()
      // console.log(loadThis.dat)
      axios.get('http://localhost:8081/offers/' + this.email)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          this.city = response.data[this.$route.params.index].city;
          this.price = response.data[this.$route.params.index].price;
          this.aboutOffer = response.data[this.$route.params.index].aboutOffer;
          this.title = response.data[this.$route.params.index].title;
          this.selectedCategoryItems = response.data[this.$route.params.index].category;
          this.currency = response.data[this.$route.params.index].currency;
          this.showOffer = response.data[this.$route.params.index].showOffer;
          this.exposeDate = response.data[this.$route.params.index].exposeDate;
          this.hideDate = response.data[this.$route.params.index].hideDate;

        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("nobody logged")
    }



  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}

.goldBorder {
  border: 5px solid gold
}

h3 {
  color: pink;
  text-align: center;
}

h4 {
  text-align: left;
}
</style>
<style>
.trix-button-group--history-tools,
.trix-button-group--file-tools {
  /*schova attachement, undo a redo*/
  display: none !important;
}
</style>

</script>
