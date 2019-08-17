<template>
<v-app>
  <Header></Header>
  <!-- <div class="ProfilEdit" style="width: 600px"> -->
  <v-container style="width: 30%">
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="name" :counter="100" label="Celé jméno" required></v-text-field>

      <v-text-field v-model="job" label="Obor" required></v-text-field>

      <v-text-field v-model="money" label="Požadovaná odměna" required></v-text-field>

      <v-text-field v-model="phone" label="Telefon" required></v-text-field>

      <v-select v-model="city" :items="items" :rules="[v => !!v || 'Item is required']" label="Město" required></v-select>

      <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

      <!-- <v-container fluid> -->
      <v-row>

        <v-col cols="12" md="12">
          <v-textarea solo name="input-7-4" label="Stručný popis" v-model="description"></v-textarea>
        </v-col>


      </v-row>
      <!-- </v-container> -->

      <v-btn color="success" class="mr-4" @click="saveProfil">
        Uložit
      </v-btn>

      <!-- <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Zrušit
    </v-btn> -->

    </v-form>
  </v-container>
  <!-- </div> -->
</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
  name: 'ProfilEdit',
  data: () => ({
    email: '',
    phone: '',
    name: 'as',
    job: '',
    money: '',
    description: '',
    city: null,
    id: localStorage.getItem("userLoged_id"),
    items: [
      'Mariánské Lázně',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: null,
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
    saveProfil(e) {

    axios.put('http://localhost:8081/profiles/' + this.id, {
      id: this.id,
      email: this.email,
      name: this.name,
      job: this.job,
      money: this.money,
      description: this.description,
      phone: this.phone,
      city: this.city
    }).then(this.$router.push({
      name: 'home'
    })).then(alert("Profil uložen"))
  }
},
mounted() {
  console.log("ProfilEdit mounted");
    // this.userGlobal = localStorage.getItem("userLoged");
    console.log(this.id);

    // var request = {
    //   params: {
    //     _id: [this.id]
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   }
    // }

if(this.id !== null) {

  axios.get('http://localhost:8081/profilesedit/' + this.id)
  .then((response) => {
    console.log(response.data[0]);
    console.log(response.data[0].name);
    this.name = response.data[0].name;
    this.job = response.data[0].job;
    this.money = response.data[0].money;
    this.phone = response.data[0].phone;
    this.city = response.data[0].city;
    this.description = response.data[0].description;
  })
  .catch((error) => {
    console.log(error);
  });
} else {
  console.log("nobody logged")
}

},
components: {
  Header

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
