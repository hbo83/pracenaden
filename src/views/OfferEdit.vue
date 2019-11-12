<template>
<v-app>
  <Header color="pink"></Header>
  <NavBar />
  <OffersList />
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
            <!-- <v-textarea solo name="input-7-4" label="Něco mně" v-model="aboutMe" :rules="aboutMeRules" v-on:keyup.enter="newLineOnEnter"></v-textarea> -->
            <VueTrix v-model="aboutOffer" />
            <!-- <div class="trix-content">{{aboutMe}}</div> -->
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>

          <v-col cols="6" sm="6">
            <!-- <v-checkbox v-model="hideProfil" label="Skrýt poptávku?"></v-checkbox> -->
            <v-switch v-model="hideProfil" class="ma-4" :label="`Vystavený inzerát: ${offerVisible}`"></v-switch>
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
    <v-row>
      <v-col>
        <h3>Vaše Galerie</h3>
      </v-col>
      <v-col>

        <upload-btn title="Nahrát fotku" @file-update="uploadGaleryPhoto">
          <template slot="icon">
            <v-icon>add</v-icon>
          </template>
        </upload-btn>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col v-for="(image, index) in imgs2" v-bind:index="index" class="col-4">

        <v-img style="cursor: pointer" :src="imgs2[index]" aspect-ratio="1" lazy-src="https://picsum.photos/id/11/10/6" :class="{ goldBorder: setGoldBorder(imgs[index]) }"></v-img>
        <v-card>
          <v-btn width="50%" color="success" @click="setAsProfilPhoto(imgs[index])">Profil</v-btn>
          <v-btn width="50%" color="error" @click="delImg(imgs[index])">del</v-btn>
        </v-card>
      </v-col>
    </v-row>


  </v-container>

</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import UploadButton from 'vuetify-upload-button';
import VueTrix from 'vue-trix'
import OffersList from '@/components/offer/OffersList.vue'
export default {
  name: 'OfferEdit',
  data: () => ({

    aboutOffer: '',
    // userLoged: null,
    imgs: [], //pole objektů
    imgs2: [], //pole paths obrazků
    valid: false,
    osvc: false,
    phone: '',
    phoneVisible: true,
    phoneRules: [
      v => !!v || 'Telefon je povinný',
      v => (v && v.length <= 9) || 'Číslo musí být kratší než 10 znaků',
    ],
    name: '',
    nameRules: [
      v => !!v || 'Jméno je povinné',
      v => (v && v.length <= 20) || 'Jméno musí být kratší než 20 znaků',
    ],
    job: '',
    jobRules: [
      v => !!v || 'Obor je povinný',
      v => (v && v.length <= 20) || 'Obor musí být kratší než 20 znaků',
    ],
    price: '',
    priceRules: [
      v => !!v || 'Požadovaná odměna je povinná',
      v => (v && v.length <= 10) || 'Odměna musí být více než 9',
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
    aboutMe: '',
    aboutMeRules: [
      v => !!v || 'O mě je povinná',
      v => (v && v.length >= 10) || 'O mě musí mít víc jak 10 znaků',
    ],
    title: '',
    titleRules: [
      v => !!v || 'O mě je povinná',
      v => (v && v.length >= 10) || 'O mě musí mít víc jak 10 znaků',
    ],

    city: null,
    items: cities,
    id: '',
    hideProfil: false,
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
      if (this.hideProfil === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },

  },
  methods: { //hma, ale pak musim nejak nastavit, ze se ostatni profilPhoto na serveru nejak odznaci ... nejdriv poslu na vsechny ostatni false a na ten jeden true

    setGoldBorder(img) { //vrati true, pokud bude obrazek profilovej, funkce pouzita v cyklu, kde nastavuje jestli na divu bude trida se zlatym borderem
      if (img.profilPhoto === true) {
        return true
      }
    },
    setAsProfilPhoto(id) { //nastavi jako profilovou

      axios.put('http://localhost:8081/imgFalse/' + this.email, {//nastavi vsechny fotky na profilPhoto: false

        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      //tadyto jeste poupravit do callbacku
      axios.put('http://localhost:8081/img/' + id._id, {//nastavi aktualni fotku na profilPhoto: true
          profilPhoto: true
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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

        console.log("mazu")
        axios.delete('http://localhost:8081/img/' + id._id)
          .then((response) => {
            console.log(id);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("Obrázek byl smazán")
      }
      //dodelat reaktivni vymazani smazaneho obrazku
      // this.$router.push({
      //   name: 'ProfilEdit'
      // })
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
    saveProfil(e) {//updatuje profil
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
    // console.log("ProfilEdit mounted");
    // this.userGlobal = localStorage.getItem("userLoged");
    this.id = this.$store.state.userLogedId
    this.email = this.$store.state.userLoged
    console.log(this.id);

    axios.get('http://localhost:8081/img/' + this.email) //naplni imgs[] objektama fotek
      .then((response) => {
        this.imgs = response.data;
        console.log(response.data);
        for (var i in response.data) {
          this.imgs2.push("http://localhost:8081/uploads/" + response.data[i].productImage)

        }
        console.log(this.imgs2)
      })
      .catch((error) => {
        console.log(error);
      });


    if (this.id !== null) {

      axios.get('http://localhost:8081/offers/' + this.email)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          console.log(response.data[0]);

          this.name = response.data[0].name;
          this.price = response.data[0].price;
          this.city = response.data[0].city;
          this.aboutOffer = response.data[0].aboutOffer;
          this.category = response.data[0].category;
          this.selectedJobItems = response.data[0].category;
          this.currency = response.data[0].currency;
          console.log(response.data[0].currency);
          console.log(this.currency);
          this.hideOffer = response.data[0].hideOffer;
          this.title = response.data[0].title;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("nobody logged")
    }

  },
  components: {
    Header,
    NavBar,
    'upload-btn': UploadButton,
    VueTrix,
    OffersList

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

.trix-button-group--history-tools, .trix-button-group--file-tools {/*schova attachement, undo a redo*/
  display: none!important;
}

</style>
