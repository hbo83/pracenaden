<template>
<v-app>
  <Header></Header>
  <v-container style="width: 30%">
    <h3>Zde prosím vyplňte informace o Vás</h3>
    <v-form ref="form" :lazy-validation="false" v-model="valid">
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
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <!-- <v-textarea solo name="input-7-4" label="Něco mně" v-model="aboutMe" :rules="aboutMeRules" v-on:keyup.enter="newLineOnEnter"></v-textarea> -->
            <VueTrix v-model="aboutMe" />
            <div class="trix-content">{{aboutMe}}</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="web" label="Webové stránky" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="webVisible" class="ma-4" :label="`Zobrazit: ${webStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="phone" label="Telefoní číslo" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="phoneVisible" class="ma-4" :label="`Zobrazit: ${phoneStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="facebook" label="Facebook" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="facebookVisible" class="ma-4" :label="`Zobrazit: ${facebookStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="instagram" label="Instagram" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="instagramVisible" class="ma-4" :label="`Zobrazit: ${instagramStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="skype" label="Skype" required></v-text-field>
          </v-col>
          <v-col>
            <v-switch v-model="skypeVisible" class="ma-4" :label="`Zobrazit: ${skypeStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="whatsapp" label="WhatsApp" required></v-text-field>
          </v-col>
          <v-col>
            <v-switch v-model="whatsappVisible" class="ma-4" :label="`Zobrazit: ${whatsappStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-switch v-model="osvc" class="ma-4" :label="`OSVČ: ${osvcStatus}`"></v-switch>
          </v-col>
          <v-col cols="6" sm="6">
            <v-checkbox v-model="hideProfil" label="Skrýt profil?"></v-checkbox>
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
          <v-btn width="50%" color="success" @click="setAsProfilPhoto(imgs[index])">:-)</v-btn>
          <v-btn width="50%" color="error" @click="delImg(imgs[index])">del</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- <form>
    <VueTrix inputId="editor1" v-model="editorContent"/>
  </form> -->
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
import VueTrix from 'vue-trix'
export default {
  name: 'ProfilEdit',
  data: () => ({
    editorContent: '',
    imgs: [], //pole objektů
    imgs2: [], //pole paths obrazků
    email: localStorage.getItem("userLoged"),
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

    city: null,
    items: cities,
    id: localStorage.getItem("userLoged_id"),
    web: '',
    webVisible: true,
    facebook: '',
    facebookVisible: true,
    instagram: '',
    instagramVisible: true,
    skype: '',
    skypeVisible: true,
    whatsapp: '',
    whatsappVisible: true,
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
    },
    webStatus: function() {
      if (this.webVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    phoneStatus: function() {
      if (this.phoneVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    facebookStatus: function() {
      if (this.facebookVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    instagramStatus: function() {
      if (this.instagramVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    skypeStatus: function() {
      if (this.skypeVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    whatsappStatus: function() {
      if (this.whatsappVisible === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    }
  },
  methods: { //hma, ale pak musim nejak nastavit, ze se ostatni profilPhoto na serveru nejak odznaci ... nejdriv poslu na vsechny ostatni false a na ten jeden true
    newLineOnEnter() {
      this.aboutMe = this.aboutMe + "\n"
      console.log(this.aboutMe)
    },
    setGoldBorder(img) { //vrati true, pokud bude obrazek profolovej, funkce pouzita v cyklu, kde nastavuje jestli na divu bude trida se zlatym borderem
      if (img.profilPhoto === true) {
        return true
      }
    },
    setAsProfilPhoto(id) { //nastavi jako profilovou
      axios.put('http://localhost:8081/imgFalse/' + this.email, {

        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      //tadyto jeste poupravit do callbacku
      axios.put('http://localhost:8081/img/' + id._id, {
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
      axios.put('http://localhost:8081/profiles/' + this.id, {
        id: this.id,
        email: this.email,
        name: this.name,
        job: this.job,
        money: this.money,
        category: this.selectedJobItems,
        aboutMe: this.aboutMe,
        phone: this.phone,
        phoneVisible: this.phoneVisible,
        city: this.city,
        web: this.web,
        webVisible: this.webVisible,
        facebook: this.facebook,
        facebookVisible: this.facebookVisible,
        instagram: this.instagram,
        instagramVisible: this.instagramVisible,
        skype: this.skype,
        skypeVisible: this.skypeVisible,
        whatsapp: this.whatsapp,
        whatsappVisible: this.whatsappVisible,
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
          // this.offerMe = response.data[0].offerMe;
          this.category = response.data[0].category;
          this.web = response.data[0].web;
          this.webVisible = response.data[0].webVisible;
          this.facebook = response.data[0].facebook;
          this.facebookVisible = response.data[0].facebookVisible;
          this.instagram = response.data[0].instagram;
          this.instagramVisible = response.data[0].instagramVisible;
          this.skype = response.data[0].skype;
          this.skypeVisible = response.data[0].skypeVisible;
          this.whatsapp = response.data[0].whatsapp;
          this.whatsappVisible = response.data[0].whatsappVisible;
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
    'upload-btn': UploadButton,
    VueTrix

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
  color: #90e4f1;
  text-align: center;
}

h4 {
  text-align: left;
}
</style>
