<template>
<!-- <v-app> -->
  <!-- <div class="login"> -->
    <!-- <v-content> -->
      <v-container class="py-0">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12" xs="12" lg="12">
            <v-card>
              <v-toolbar color="#90e4f1" dark flat>
                <v-toolbar-title><v-btn color="error" @click="closeDialog">zavřít</v-btn></v-toolbar-title>{{dialogState}}
                <!-- <v-toolbar-title>Přihlásit se</v-toolbar-title> -->
                <v-spacer></v-spacer>


              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" label="" name="login" prepend-icon="person" type="text"></v-text-field>

                  <v-text-field v-model="password" id="password" label="" name="password" prepend-icon="lock" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <a href="http://10.0.0.22:8080/signin">Registrovat</a>

                <v-btn style="margin-left: 8%" color="primary" @click="logIn">Přihlásit</v-btn>
                <!-- <v-btn color="succes" @click="signIn">Signin</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    <!-- </v-content> -->
  <!-- </div> -->
<!-- </v-app> -->
</template>

<script>
// @ is an alias to /src
import Header from '@/components/global/Header.vue'
import axios from 'axios';
import VueAxios from 'vue-axios'

export default {
  name: 'Login',
  data() {
    return {
      password: '',
      nameRules: [
        v => !!v || 'Jméno je vyžadováno',
        v => v.length <= 30 || 'Jméno musí mít méně než 30 znaků'
      ],
      email: '',
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail je zadán nesprávně'
      ]
    }
  },
  methods: {
    closeDialog() {//zavře prihlasovaci dialog
      this.$store.commit('set_loginDialogState', false)
    },
    logIn() {
      // let currentObj = this;
      var request = {
        params: {
          login: [this.email, this.password]
        }
      }

      // this.$store.commit('setLoged', true)//po loginu se ve storu nastavi ze je user zalogovan

      axios.get('http://10.0.0.22:8081/users/', request).then((response) => {
          console.log(response.data);
          alert("Nyní jste přihlášen jako" + " " + response.data[0].email);

          this.$store.commit('setUserLoged', response.data[0])//ulozi do storu objekt zalogovaneho usera
          // this.$store.commit('setLogedId', response.data[0]._id)//ulozi do storu _id zalogovaneho usera, ale to preci muzu hodit do jednoho objektu
          this.$store.commit('set_loginDialogState', false)//je dialog open ci ne? je ve storu ptze tlacitko je v jine komponente
        })
        .catch((error) => {
          // console.log(error);
          alert("Heslo nebo email nesouhlasí")
          this.$router.push({
            name: 'Login',
            params: {}
          })
        })

    },
    // storeCommit: function(user) {
    //   this.$store.commit('setUserLoged', user)
    // }
  },
  computed: {
    dialogState() {
      return this.$store.state.dialogState
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
