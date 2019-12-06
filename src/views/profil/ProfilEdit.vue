<template>
<div>
  <Header color="#90e4f1"></Header>
  <NavBar path="" />
  <v-container style="width: 80%">
    <h3>Editace</h3>
    <v-form ref="form" :lazy-validation="false" v-model="valid">
      <v-row justify="space-around">

        <v-col cols="4" class="py-0">
          <v-row style="border-right: 1px solid pink; border-left: 1px solid pink;">
            <v-col>
              <v-text-field v-model="formContent.firstName" label="Jméno" :rules="rules" required></v-text-field>
              <v-text-field v-model="formContent.lastName" label="Příjmení" :rules="rules" required></v-text-field>
              <v-text-field v-model="formContent.job" label="Obor" :rules="rules" required></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-11" style="border-right: 1px solid pink; border-left: 1px solid pink;">
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col>
                  <v-text-field v-model="formContent.money" label="Požadovaná odměna" :rules="rules" required></v-text-field>
                </v-col>
                <v-col>
                  <v-select v-model="formContent.currency" :items="selectedCurrencyItems" :rules="rules" label="Jednotka" required></v-select>
                </v-col>
              </v-row>
            </v-col>
              <v-col cols="12" class="py-0">

                <v-select v-model="formContent.city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>
                <v-select v-model="formContent.category" :items="itemsJob" :rules="rules" :counter="3" attach chips label="Kategorie" multiple required></v-select>

              </v-col>
          </v-row>

          <!-- <v-row>
            <v-col cols="6" md="6">
              <h4>O mě</h4>
            </v-col>
          </v-row> -->
          <!-- <v-row> -->
          <!-- <v-col cols="12" md="12"> -->
          <!-- <v-textarea solo name="input-7-4" label="Něco mně" v-model="aboutMe" :rules="aboutMeRules" v-on:keyup.enter="newLineOnEnter"></v-textarea> -->
          <!-- <div class="trix-content">{{aboutMe}}</div> -->
          <!-- <VueTrix v-model="formContent.aboutMe" /> -->
          <!-- </v-col> -->
          <!-- </v-row> -->
        </v-col>

        <v-col cols="6" style="border-left: 1px solid pink;">
          <v-row>
            <v-col cols="6" class="my-0 py-0" style="border-left: 1px solid pink">
              <v-text-field v-model="formContent.web" label="Webové stránky" required></v-text-field>
              <v-text-field v-model="formContent.phone" label="Telefoní číslo" required></v-text-field>
              <v-text-field v-model="formContent.facebook" label="Facebook" required></v-text-field>
              <v-text-field v-model="formContent.instagram" label="Instagram" required></v-text-field>
              <v-text-field v-model="formContent.skype" label="Skype" required></v-text-field>
              <v-text-field v-model="formContent.whatsapp" label="WhatsApp" required></v-text-field>
            </v-col>
            <v-col cols="6" class="my-0 py-0" sm="6" style="border-left: 1px solid pink; border-right: 1px solid pink;">
              <v-switch v-model="formContent.webVisible" class="ma-4" :label="`Zobrazit WWW: ${stateToCzech(formContent.webVisible)}`"></v-switch>
              <v-switch v-model="formContent.phoneVisible" class="ma-4" :label="`Zobrazit telefon: ${stateToCzech(formContent.phoneVisible)}`"></v-switch>
              <v-switch v-model="formContent.facebookVisible" class="ma-4" :label="`Zobrazit Facebook: ${stateToCzech(formContent.facebookVisible)}`"></v-switch>
              <v-switch v-model="formContent.instagramVisible" class="ma-4" :label="`Zobrazit Instagram: ${stateToCzech(formContent.instagramVisible)}`"></v-switch>
              <v-switch v-model="formContent.skypeVisible" class="ma-4" :label="`Zobrazit Skype: ${stateToCzech(formContent.skypeVisible)}`"></v-switch>
              <v-switch v-model="formContent.whatsappVisible" class="ma-4" :label="`Zobrazit Whatsapp: ${stateToCzech(formContent.whatsappVisible)}`"></v-switch>
            </v-col>
          </v-row>

          <v-row class="mt-0">
            <v-col cols="6" class="my-0 py-0" sm="6">
              <!-- <p>Zadejte Ano pokud máte živnostenské oprávnění. Budou Vás oslovovat také firmy.</p>
              <p>Pokud jste aktuálně vytíženi, můžete profil skrýt.</p> -->
              <v-switch v-model="formContent.osvc" class="ma-4" :label="`OSVČ: ${stateToCzech(formContent.osvc)}`"></v-switch>
            </v-col>
            <v-col cols="6" class="my-0 py-0" sm="6">
              <!-- <v-checkbox v-model="hideProfil" label="Skrýt profil?"></v-checkbox> -->
              <v-switch v-model="formContent.hideProfil" class="ma-4" :label="`Skrýt profil: ${stateToCzech(formContent.hideProfil)}`"></v-switch>
            </v-col>

          </v-row>
          <!-- <v-row justify="center" align="center">
          </v-row> -->

        </v-col>
      </v-row>
      <!-- <h4>O mě</h4> -->
      <v-row justify="center" style="border-top: 1px solid pink; border-bottom: 1px solid pink;">
        <v-col cols="8">Popis
      <VueTrix v-model="formContent.aboutMe" />
    </v-col>
  </v-row>
    </v-form>
    <br /><br />
    <v-row>


    </v-row>
    <hr />
    <v-row>
      <v-col v-for="(image, index) in imgs" v-bind:index="index" class="col-1" style="min-width: 153px">

        <v-img style="cursor: pointer" :src="imgs[index].pathToResizedImg" aspect-ratio="1" :lazy-src="imgs[index].pathToResizedImg" :class="{ goldBorder: setGoldBorder(imgs[index]) }"></v-img>
        <v-card>
          <v-btn width="50%" color="success" @click="setAsProfilPhoto(imgs[index])">Profil</v-btn>
          <v-btn width="50%" color="error" @click="delImg(imgs[index])">del</v-btn>
        </v-card>
      </v-col>
      <v-col cols="2">

        <upload-btn class="uplBtn" noTitleUpdate block title="Nahrát fotku" @file-update="uploadGaleryPhoto">
          <template slot="icon">
            <v-icon>add</v-icon>
          </template>
        </upload-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1">
        <v-btn color="success" :disabled="!valid" @click="saveProfil" x-large>Uložit</v-btn>
      </v-col>
    </v-row>

  </v-container>

</div>
</template>

<script>
// @ is an alias to /src
// this.forceUpdate();
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
    profilImgIndex: 0,
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
    // methodUpdate() {
    //   console.log("forcuju")
    //   this.$forceUpdate();
    // },
    getImgs() {
      this.formContent.email = this.$store.state.userLoged

      axios.get('http://localhost:8081/img/' + this.formContent.email) //naplni imgs[] objektama fotek
        .then((response) => {
          this.imgs = response.data
          // this.imgs = response.data.map(function(value, index) {//vrati nove pole obsahujici jen cestu k obrazku
          //   return value.pathToResizedImg
          // })

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
    stateToCzech: function(status) { //vraci ano nebo ne na zaklade true/false u viditelnosti
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
    setAsProfilPhoto(img) { //nastavi jako profilovou

      axios.put('http://localhost:8081/imgFalse/' + this.formContent.email, { //nastavi vsechny fotky na profilPhoto: false

        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      //tadyto jeste poupravit do callbacku nebo spis at to udela server
      axios.put('http://localhost:8081/img/' + img._id, { //nastavi aktualni fotku na profilPhoto: true
          profilPhoto: true
        })
        .then((response) => {
          console.log(response);
          this.getImgs()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },

    delImg(img) {
      if (confirm('Určitě chcete smazat soubor?')) {
        console.log(img)
        axios.delete('http://localhost:8081/img/' + img._id)
          .then((response) => {
            console.log(img);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("Obrázek byl smazán")
      }

      this.imgs = this.imgs.filter(item => item !== img) //zmensi pole o ten prvek ktery jsem samaz, tim padem se prekresli komponenta
    },

    uploadGaleryPhoto() {
      console.log(this.formContent.email)
      this.selectedFile = event.target.files[0]
      const fd = new FormData();
      fd.append('profilPhoto', false);
      fd.append('email', this.formContent.email); //pripoji klic a hodnotu, ktera se pak sparsuje jako req.body.name na serveru
      // fd.append('_id', this.formContent.id);
      fd.append('productImage', this.selectedFile, this.selectedFile.name)
      axios.post('http://localhost:8081/img', fd, {
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
          }
        })
        .then(res => {
          console.log(res);
          alert('Soubor byl nahrán')
          // this.methodUpdate()
          this.imgs.push({
            pathToResizedImg: "http://localhost:8081/uploads/hbo83@seznam.cz/profil/resized/" + this.selectedFile.name
          }) //prida novy objekt do pole a tim prekresli komponentu
        })
    },

    saveProfil(e) { //updatuje profil

      axios.put('http://localhost:8081/profiles/' + this.$store.state.userLogedId, this.formContent).then(alert("Profil uložen"))
    }
  },
  mounted() {
    this.getImgs()
  },

}
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
.uplBtn label div {
  height: 166px;
}
.goldBorder {
  border: 5px solid gold
}

h3 {
  color: #90e4f1;
  text-align: left;
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
