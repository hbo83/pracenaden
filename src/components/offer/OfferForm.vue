<template>
<v-container style="width: 30%">
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
          <v-select v-model="selectedJobItems" :items="itemsJob" :rules="categoriesRules" :counter="3" attach chips label="Kategorie" multiple required></v-select>
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
    </v-col>
    <v-col>
      <v-row>

        <v-col cols="6" sm="6">

          <v-switch v-model="hideOffer" class="ma-4" :label="`Vystavený inzerát: ${offerVisible}`"></v-switch>
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
import VueTrix from 'vue-trix'
export default {
  name: 'OfferEditForm',
  components: {
    VueTrix
  },
  data: () => ({

    index: null,
    imgs: [], //pole objektů
    imgs2: [], //pole paths obrazků
    valid: false,
    osvc: false,
    hideOffer: false,
    price: '',
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
    selectedJobItems: null,
    itemsJob: categories,
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
      v => !!v || 'O mě je povinná',
      v => (v && v.length >= 10) || 'O mě musí mít víc jak 10 znaků',
    ],


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
  computed: {
    offerVisible: function() {
      if (this.hideOffer === true) {
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

    delImg(id) {
      if (confirm('Určitě chcete smazat soubor?')) {

        axios.delete('http://localhost:8081/img/' + id._id)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("Obrázek byl smazán")
      }
    },

    uploadGaleryPhoto() {
      this.selectedFile = event.target.files[0]
      const fd = new FormData();
      fd.append('profilPhoto', false);
      fd.append('email', this.email);
      fd.append('_id', this.id); //pripoji klic a hodnotu, ktera se pak sparsuje jako req.body.name na serveru
      fd.append('productImage', this.selectedFile, this.selectedFile.name)
      axios.post('http://localhost:8081/img', fd, {
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
          }
        })
        .then(res => {
          console.log(res);
          alert('Soubor byl nahrán')
        })
    },
    onFileSelected(event) {
      console.log(event);

      this.selectedFile = event.target.files[0]
    },
    saveProfil() { //updatuje profil
      this.$store.commit('setThisProfileWebVisible', this.webVisible)
      console.log(this.$store.state.allProfiles[1].webVisible)
      axios.put('http://localhost:8081/offersedit/' + this.email, {

        email: this.email,
        title: this.title,
        // job: this.job,
        money: this.money,
        category: this.selectedJobItems,
        currency: this.currency,
        hideOffer: this.hideOffer,
        aboutOffer: this.aboutOffer

      }).then(alert("Poptávka uložen"))
    }
  },
  mounted() {
    this.id = this.$store.state.userLogedId
    this.email = this.$store.state.userLoged

    if (this.id !== null) {

      axios.get('http://localhost:8081/offers/' + this.email)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          console.log(response.data[this.$route.params.index]);

          this.name = response.data[this.$route.params.index].name;
          this.price = response.data[this.$route.params.index].price;

          this.aboutOffer = response.data[this.$route.params.index].aboutOffer;
          this.category = response.data[this.$route.params.index].category;
          this.selectedJobItems = response.data[this.$route.params.index].category;
          this.currency = response.data[this.$route.params.index].currency;
          // console.log(response.data[0].currency);
          // console.log(this.currency);
          this.hideOffer = response.data[this.$route.params.index].hideOffer;
          this.title = response.data[this.$route.params.index].title;
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
