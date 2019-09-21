<template>
<v-app>
  <Header></Header>
  <v-container style="width: 30%">
    <v-form ref="form" :lazy-validation="false" v-model="valid">
    <h3 style="color: #90e4f1">Zde prosím vyplňte informace</h3>
    <v-col>
        <v-text-field v-model="name" label="Celé jméno" :rules="nameRules" required></v-text-field>
        <v-text-field v-model="job" label="Obor" :rules="jobRules" required></v-text-field>
        <v-row>
          <v-col>
            <v-text-field v-model="money" label="Požadovaná odměna" :rules="moneyRules" required></v-text-field>
          </v-col>
          <v-col>
            <v-select v-model="currency" :items="selectedCurrencyItems" :rules="currencyRules" label="Jednotka" required></v-select>
          </v-col>
        </v-row>
        <v-text-field v-model="phone" label="Telefon" :rules="phoneRules" required></v-text-field>
        <v-select v-model="city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>
        <v-row align="center">
          <v-col cols="12" sm="12">
            <v-select v-model="selectedJobItems" :items="itemsJob" :rules="categoriesRules" :counter="3" attach chips label="Kategorie" multiple required></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">
            <h4>O mě</h4>
          </v-col>
          <v-col cols="6" md="6">
            <h4>Nabízím</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">
            <v-textarea solo name="input-7-4" label="Něco mně" v-model="aboutMe" :rules="aboutMeRules"></v-textarea>
          </v-col>
          <v-col cols="6" md="6">
            <v-textarea solo name="input-7-4" label="Nabízím" v-model="offerMe" :rules="offerMeRules"></v-textarea>
          </v-col>
        </v-row>
    </v-col>
    <v-col>
      <v-text-field v-model="web" label="Webové stránky" required></v-text-field>
      <v-text-field v-model="facebook" label="Facebook" required></v-text-field>
      <v-text-field v-model="instagram" label="Instagram" required></v-text-field>
      <v-text-field v-model="skype" label="Skype" required></v-text-field>
      <v-text-field v-model="whatsapp" label="WhatsApp" required></v-text-field>
      <v-row>
        <v-col cols="6" sm="6">
        <v-switch v-model="osvc" class="ma-4" :label="`OSVČ: ${osvcStatus}`"></v-switch>
        </v-col>
        <v-col cols="6" sm="6">
          <v-checkbox v-model="hideProfil" label="Skrýt profil?"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <upload-btn title="Profil photo" @file-update="uploadProfilPhoto"><template slot="icon">
              <v-icon>add</v-icon>
            </template></upload-btn>
        </v-col>
        <v-col>
          <upload-btn title="Galery" @file-update="update">
            <template slot="icon">
              <v-icon>add</v-icon>
            </template>
          </upload-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col>
        <v-btn color="success" class="mr-4" :disabled="!valid" @click="saveProfil">Uložit</v-btn>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col>
        <h1>Vaše Galerie</h1>
      </v-col>
    </v-row>
    <hr />
    <v-row justify="center" max-width="1826px" style="margin-left: 198px">
      <v-col v-for="(image, index) in imgs2" v-bind:index="index" class="col-4">

        <v-img style="cursor: pointer" @click="delImg(imgs[index])" :src="imgs2[index]" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="300" max-height="175"></v-img>
      </v-col>
    </v-row>
  </v-form>
  </v-container>

</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import axios from 'axios'
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import UploadButton from 'vuetify-upload-button';

export default {
  name: 'ProfilEdit',
  data: () => ({
    imgs: [],
    imgs2: [],
    email: localStorage.getItem("userLoged"),
    valid: false,
    osvc: false,
    phone: '',
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
    money: '',
    moneyRules: [
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
    offerMe: '',
    offerMeRules: [
      v => !!v || 'Nabízím je povinná',
      v => (v && v.length >= 10) || 'Nabízím musí mít víc jak 10 znaků',
    ],
    city: null,
    items: cities,
    id: localStorage.getItem("userLoged_id"),
    web: '',
    facebook: '',
    instagram: '',
    skype: '',
    whatsapp: '',
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
    osvcStatus: function() {
      if (this.osvc === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    }
  },
  methods: {
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
    uploadProfilPhoto() {
      this.selectedFile = event.target.files[0]
      const fd = new FormData();
      fd.append('profilPhoto', true);
      fd.append('email', this.email);
      fd.append('_id', this.id); //pripoji klic a hodnotu, ktera se pak sparsuje jako req.body.name na serveru
      // fd.append('productImage', this.selectedFile, this.selectedFile.name)
      fd.append('productImage', this.selectedFile, "profilPhoto.jpg")
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
    update() {
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
    saveProfil(e) {

      axios.put('http://localhost:8081/profiles/' + this.id, {
        id: this.id,
        email: this.email,
        name: this.name,
        job: this.job,
        money: this.money,
        category: this.selectedJobItems,
        aboutMe: this.aboutMe,
        offerMe: this.offerMe,
        phone: this.phone,
        city: this.city,
        web: this.web,
        facebook: this.facebook,
        instagram: this.instagram,
        skype: this.skype,
        whatsapp: this.whatsapp,
        osvc: this.osvc,
        currency: this.currency,
        hideProfil: this.hideProfil,
        checkboxAgree: this.checkboxAgree,
        profilPhotoPath: 'http://localhost:8081/uploads/' + this.email + '/profilPhoto.jpg'

      }).then(this.$router.push({
        name: 'home'
      })).then(alert("Profil uložen"))
    }
  },
  mounted() {
    // console.log("ProfilEdit mounted");
    // this.userGlobal = localStorage.getItem("userLoged");
    console.log(this.id);

    axios.get('http://localhost:8081/img/' + this.email)
      .then((response) => {
        this.imgs = response.data;
        console.log(response.data);
        for (var i in response.data) {
          this.imgs2.push("http://localhost:8081/uploads/" + response.data[i].productImage)
          // return this.imgs2
        }
        console.log(this.imgs2)
      })
      .catch((error) => {
        console.log(error);
      });
    // var request = {
    //   params: {
    //     _id: [this.id]
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   }
    // }

    if (this.id !== null) {

      axios.get('http://localhost:8081/profilesedit/' + this.id)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          console.log(response.data[0]);
          console.log(response.data[0].name);
          this.name = response.data[0].name;
          this.job = response.data[0].job;
          this.money = response.data[0].money;
          this.phone = response.data[0].phone;
          this.city = response.data[0].city;
          this.aboutMe = response.data[0].aboutMe;
          this.offerMe = response.data[0].offerMe;
          this.category = response.data[0].category;
          this.web = response.data[0].web;
          this.facebook = response.data[0].facebook;
          this.instagram = response.data[0].instagram;
          this.skype = response.data[0].skype;
          this.whatsapp = response.data[0].whatsapp;
          this.selectedJobItems = response.data[0].category;
          this.osvc = response.data[0].osvc;
          this.checkboxAgree = response.data[0].checkboxAgree,
          this.currency = response.data[0].currency;
          this.hideProfil = response.data[0].hideProfil;
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
    'upload-btn': UploadButton

  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}

h4 {
  text-align: left;
}
</style>
