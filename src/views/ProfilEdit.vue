<template>
<v-app>
  <Header></Header>
  <v-container style="width: 90%">
    <v-row>
      <v-col>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="name" :counter="100" label="Celé jméno" required></v-text-field>

          <v-text-field v-model="job" label="Obor" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="money" label="Požadovaná odměna" required></v-text-field>
            </v-col>
            <v-col>
              <v-select v-model="currency" :items="selectedCurrencyItems" :rules="[v => !!v || 'Item is required']" label="Za" required></v-select>
            </v-col>
          </v-row>
          <v-text-field v-model="phone" label="Telefon" required></v-text-field>
          <v-select v-model="city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>

          <v-row align="center">
            <v-col cols="12" sm="12">
              <v-select v-model="selectedJobItems" :items="currency" :counter="3" attach chips label="Kategorie" multiple></v-select>
            </v-col>
          </v-row>

          <v-checkbox v-model="checked" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

          <v-row>
            <v-col cols="6" md="6">
              <v-textarea solo name="input-7-4" label="Něco mně" v-model="aboutMe"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
              <v-textarea solo name="input-7-4" label="Nabízím" v-model="offerMe"></v-textarea>
            </v-col>
          </v-row>

          <v-btn color="success" class="mr-4" @click="saveProfil">
            Uložit
          </v-btn>

        </v-form>
      </v-col>
      <v-col>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="web" :counter="100" label="Webové stránky" required></v-text-field>

          <v-text-field v-model="facebook" label="Facebook" required></v-text-field>

          <v-text-field v-model="instagram" label="Instagram" required></v-text-field>

          <v-text-field v-model="skype" label="Skype" required></v-text-field>

          <v-text-field v-model="whatsapp" label="WhatsApp" required></v-text-field>

          <v-checkbox v-model="checked2" :rules="[v => !!v || 'You must agree to continue!']" label="zivnostnik ano ne?" required></v-checkbox>

        </v-form>
        <v-form ref="form" lazy-validation>
          <!-- <v-text-field v-model="docName" :counter="30" label="Název dokumentu" required></v-text-field> -->
          <upload-btn round @file-update="update"><template slot="icon">
              <v-icon>add</v-icon>
            </template></upload-btn>

        </v-form>
      </v-col>
    </v-row>

    <v-row justify="center" max-width="1826px" style="margin-left: 198px">
      <v-col v-for="(image, index) in imgs2" v-bind:index="index" class="col-4">

        <v-img style="cursor: pointer" @click="delImg(imgs[index])" :src="imgs2[index]" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="300" max-height="175"></v-img>
      </v-col>
    </v-row>
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
    phone: '',
    name: '',
    job: '',
    money: '',
    currency: '',
    selectedCurrencyItems: [".- / hod", ".- / den"],
    aboutMe: '',
    offerMe: '',
    city: null,
    id: localStorage.getItem("userLoged_id"),
    web: '',
    facebook: '',
    instagram: '',
    skype: '',
    whatsapp: '',
    items: cities,
    itemsJob: categories,
    selectedJobItems: [],
    checked: false,
    checked2: false,
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
  methods: {
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
    update() {
      this.selectedFile = event.target.files[0]
      // console.log(this.docName); //data
      // var docName = this.docName;
      const fd = new FormData();
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
        checked: this.checked,
        checked2: this.checked2,
        currency: this.currency

      }).then(this.$router.push({
        name: 'home'
      })).then(alert("Profil uložen"))
    }
  },
  mounted() {
    console.log("ProfilEdit mounted");
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
          this.checked = response.data[0].checked;
          this.checked2 = response.data[0].checked2;
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
</style>
