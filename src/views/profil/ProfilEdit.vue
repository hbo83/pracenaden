<template>
<div>
  <Header color="#90e4f1"></Header>
  <NavBar path="" />
  <v-container style="width: 30%">
    <h3>Zde prosím vyplňte informace o Vás</h3>
    <v-form ref="form" :lazy-validation="false" v-model="valid">
      <v-col>
        <v-text-field v-model="formContent.firstName" label="Jméno" :rules="rules" required></v-text-field>
        <v-text-field v-model="formContent.lastName" label="Příjmení" :rules="rules" required></v-text-field>
        <v-text-field v-model="formContent.job" label="Obor" :rules="rules" required></v-text-field>
        <v-row>
          <v-col>
            <v-text-field v-model="formContent.money" label="Požadovaná odměna" :rules="rules" required></v-text-field>
          </v-col>
          <v-col>
            <v-select v-model="formContent.currency" :items="selectedCurrencyItems" :rules="rules" label="Jednotka" required></v-select>
          </v-col>
        </v-row>
        <v-select v-model="formContent.city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>
        <v-row align="center">
          <v-col cols="12" sm="12">
            <v-select v-model="formContent.category" :items="itemsJob" :rules="rules" :counter="3" attach chips label="Kategorie" multiple required></v-select>
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
            <VueTrix v-model="formContent.aboutMe" />
            <!-- <div class="trix-content">{{aboutMe}}</div> -->
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.web" label="Webové stránky" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="formContent.webVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.webVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.phone" label="Telefoní číslo" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="formContent.phoneVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.phoneVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.facebook" label="Facebook" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="formContent.facebookVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.facebookVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.instagram" label="Instagram" required></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-switch v-model="formContent.instagramVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.instagramVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.skype" label="Skype" required></v-text-field>
          </v-col>
          <v-col>
            <v-switch v-model="formContent.skypeVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.skypeVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-text-field v-model="formContent.whatsapp" label="WhatsApp" required></v-text-field>
          </v-col>
          <v-col>
            <v-switch v-model="formContent.whatsappVisible" class="ma-4" :label="`Zobrazit: ${stateToCzech(formContent.whatsappVisible)}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6">
            <v-switch v-model="formContent.osvc" class="ma-4" :label="`OSVČ: ${stateToCzech(formContent.osvc)}`"></v-switch>
          </v-col>
          <v-col cols="6" sm="6">
            <!-- <v-checkbox v-model="hideProfil" label="Skrýt profil?"></v-checkbox> -->
            <v-switch v-model="formContent.hideProfil" class="ma-4" :label="`Skrýt profil: ${stateToCzech(formContent.hideProfil)}`"></v-switch>
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
      <v-col v-for="(image, index) in imgs" v-bind:index="index" class="col-4">

        <v-img style="cursor: pointer" :src="imgs[index]" aspect-ratio="1" lazy-src="https://picsum.photos/id/11/10/6" :class="{ goldBorder: setGoldBorder(imgs[index]) }"></v-img>
        <v-card>
          <v-btn width="50%" color="success" @click="setAsProfilPhoto(imgs[index])">Profil</v-btn>
          <v-btn width="50%" color="error" @click="delImg(imgs[index])">del</v-btn>
        </v-card>
      </v-col>
    </v-row>


  </v-container>

</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import UploadButton from 'vuetify-upload-button';
import VueTrix from 'vue-trix'
export default {
  name: 'ProfilEdit',
  components: {
    Header,
    NavBar,
    'upload-btn': UploadButton,
    VueTrix

  },
  data: () => ({
    formContent: {
      // id: '',
      email: '',
      firstName: '',
      lastName: '',
      job: '',
      money: '',
      category: [],
      aboutMe: '',
      phone: '',
      phoneVisible: true,
      city: '',
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
      osvc: true,
      currency: '',
      hideProfil: false,
      checkboxAgree: true
    },

    imgs: [], //pole objektů
    // imgs2: [], //pole paths obrazků
    valid: false,
    osvc: false,
    rules: [
      v => !!v || 'Položka je povinná',
      v => (v && v.length <= 20) || 'Jméno musí být kratší než 20 znaků',
    ],

    selectedCurrencyItems: [".- / hod", ".- / den", ".- / práci"],

    selectedJobItems: null,
    itemsJob: categories,

    items: cities,
    id: '',
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


  },
  methods: { //hma, ale pak musim nejak nastavit, ze se ostatni profilPhoto na serveru nejak odznaci ... nejdriv poslu na vsechny ostatni false a na ten jeden true
      stateToCzech: function(status) {//vraci ano nebo ne na zaklade true/false u viditelnosti
        if (status === true) {
          return "Ano"
        } else {
          return "Ne"
        }
      },
    setGoldBorder(img) { //vrati true, pokud bude obrazek profilovej, funkce pouzita v cyklu, kde nastavuje jestli na divu bude trida se zlatym borderem
      if (img.profilPhoto === true) {
        return true
      }
    },
    setAsProfilPhoto(id) { //nastavi jako profilovou

      axios.put('http://localhost:8081/imgFalse/' + this.formContent.email, {//nastavi vsechny fotky na profilPhoto: false

        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      //tadyto jeste poupravit do callbacku
      axios.put('http://localhost:8081/img/' + id.formContent._id, {//nastavi aktualni fotku na profilPhoto: true
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
      console.log(this.formContent.email)
      this.selectedFile = event.target.files[0]
      const fd = new FormData();
      fd.append('profilPhoto', false);
      fd.append('email', this.formContent.email);
      fd.append('_id', this.formContent.id); //pripoji klic a hodnotu, ktera se pak sparsuje jako req.body.name na serveru
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

      axios.put('http://localhost:8081/profiles/' + this.$store.state.userLogedId, this.formContent).then(alert("Profil uložen"))
    }
  },
  mounted() {

    this.formContent.email = this.$store.state.userLoged

    axios.get('http://localhost:8081/img/' + this.formContent.email) //naplni imgs[] objektama fotek
      .then((response) => {

        console.log(response.data);
        this.imgs = response.data.map(function(value, index) {//vrati nove pole obsahujici jen cestu k obrazku
          return "http://localhost:8081/uploads/" + value
        })
        // for (var i in response.data) {
        //   this.imgs2.push("http://localhost:8081/uploads/" + response.data[i].productImage)
        // }
        console.log(this.imgs2)
      })
      .catch((error) => {
        console.log(error);
      });


    if (this.formContent.id !== null) {

      axios.get('http://localhost:8081/profilesedit/' + this.$store.state.userLogedId)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          this.formContent = response.data[0]

        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("nobody logged")
    }

  },

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
<style>

.trix-button-group--history-tools, .trix-button-group--file-tools {/*schova attachement, undo a redo*/
  display: none!important;
}

</style>
