<template>
  <div>
    <v-card>
  <v-form ref="form" :lazy-validation="false" v-model="valid">
    <v-row justify="space-around">
      <v-col cols="12" class="py-0">
        <v-row>
          <v-col>
            <v-text-field class="px-10" v-model="formContent.firstName" label="Jméno" :rules="rules" required></v-text-field>
            <v-text-field class="px-10" v-model="formContent.lastName" label="Příjmení" :rules="rules" required></v-text-field>
            <v-text-field class="px-10" v-model="formContent.job" label="Obor" :rules="rules" required></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-11">
          <v-col cols="12" class="py-0">
            <v-row>
              <v-col>
                <v-text-field class="pl-10" v-model="formContent.money" label="Požadovaná odměna" :rules="rules" required></v-text-field>
              </v-col>
              <v-col>
                <v-select class="pr-10" v-model="formContent.currency" :items="selectedCurrencyItems" :rules="rules" label="Jednotka" required></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">

            <v-select class="px-10" v-model="formContent.city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>
            <v-select class="px-10" v-model="formContent.category" :items="itemsJob" :rules="rules" :counter="3" attach chips label="Kategorie" multiple required></v-select>

          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="6" class="my-0 py-0">
            <v-text-field class="pl-10" v-model="formContent.web" label="Webové stránky" required></v-text-field>
            <v-text-field class="pl-10" v-model="formContent.phone" label="Telefoní číslo" required></v-text-field>
          </v-col>
          <v-col cols="6" class="my-0 py-0" sm="6">
            <v-switch v-model="formContent.webVisible" class="ma-4" :label="`Zobrazit WWW: ${stateToCzech(formContent.webVisible)}`"></v-switch>
            <v-switch v-model="formContent.phoneVisible" class="ma-4" :label="`Zobrazit telefon: ${stateToCzech(formContent.phoneVisible)}`"></v-switch>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col cols="6" class="my-0 py-0" sm="6">
            <v-switch v-model="formContent.osvc" class="ma-4 px-10" :label="`OSVČ: ${stateToCzech(formContent.osvc)}`"></v-switch>
          </v-col>
          <v-col cols="6" class="my-0 py-0" sm="6">
            <v-switch v-model="formContent.hideProfil" class="ma-4" :label="`Skrýt profil: ${stateToCzech(formContent.hideProfil)}`"></v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="11">Popis
        <VueTrix v-model="formContent.aboutMe" />
      </v-col>
    </v-row>
  </v-form>
</v-card>
  <v-row justify="center">
    <v-col cols="3">
      <v-btn color="success" :disabled="!valid" @click="saveProfil" x-large>Uložit</v-btn>
    </v-col>
  </v-row>
</div>
</template>

<script>
import axios from 'axios'
import VueTrix from 'vue-trix'
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
export default {
  name: 'ProfilEditForm',
  components: {
    VueTrix,
  },
  data() {
    return {
      formContent: {
        _id: '',// zde nepouzivam, jen doplni objekt aby sedel s DB
        __v:'',// zde nepouzivam, jen doplni objekt aby sedel s DB
        modified:'',// zde nepouzivam, jen doplni objekt aby sedel s DB
        email: this.$store.state.userLoged,
        firstName: '',
        lastName: '',
        job: '',
        price: '',
        category: [],
        aboutMe: '',
        phone: '',
        phoneVisible: true,
        city: '',
        web: '',
        webVisible: true,
        osvc: true,
        currency: '',
        hideProfil: false,
        checkboxAgree: true
      },
      valid: false,
      // osvc: false,
      rules: [
        v => !!v || 'Položka je povinná',
        v => (v && v.length <= 20) || 'Jméno musí být kratší než 20 znaků',
      ],

      selectedCurrencyItems: [".- / hod", ".- / den", ".- / práci"],

      selectedJobItems: null,
      itemsJob: categories,

      items: cities,
    }
  },
  methods: {
    stateToCzech: function(status) { //vraci ano nebo ne na zaklade true/false u viditelnosti
      if (status === true) {
        return "Ano"
      } else {
        return "Ne"
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    saveProfil() { //updatuje profil
      axios.put('http://10.0.0.22:8081/profiles/' + this.$store.state.userLoged._id, this.formContent).then(alert("Profil uložen"))
    },
    loadProfil() { //naplní form
      axios.get('http://10.0.0.22:8081/profiles/' + this.$store.state.userLoged._id)
      .then((response) => {
        this.formContent = response.data[0]
        console.log(response.data)
      })
      .catch((error) => {//zde muze nastat chyba, kdyz neni jeste vyplnen profil noveho usera, na tom vyzkouset error
        console.log(error);
        // alert("prosim vyplnte profil")
      });
    }
  },
  mounted() {
    this.loadProfil()//osetrit i zde mozna
  }
}

</script>

<style scoped>
.trix-button-group--history-tools,
.trix-button-group--file-tools {
  /*schova attachement, undo a redo*/
  display: none !important;
}
/* @media only screen and (max-width: 2600px) {
  .label {
    font-size: 5px;
  }
} */
</style>
