<template>
<!-- <v-app> -->
  <div class="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12">
            <v-card class="elevation-12">
              <v-toolbar color="#90e4f1" dark flat>
                <v-toolbar-title>Přihlásit se</v-toolbar-title>
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
    </v-content>
  </div>
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
      // alert: false,
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

    logIn() {
      // this.alert = true
      let currentObj = this;

      var request = {
        params: {
          login: [this.email, this.password]
        }
      }

      this.$store.commit('setLoged', true)
      // this.$store.commit('setUserLoged', this.email)
      console.log(this.$store.state.userLoged)

      axios.get('http://10.0.0.22:8081/users/', request).then((response) => {
          console.log(response.data);
          alert("Nyní jste přihlášen jako" + " " + response.data[0].email);
          // localStorage.setItem("userLoged", response.data[0].email);
          // localStorage.setItem("userLoged_id", response.data[0]._id);

          this.$store.commit('setUserLoged', response.data[0].email)
          this.$store.commit('setLogedId', response.data[0]._id)
          this.$store.commit('set_loginDialogState', false)
        })
        // .then(this.$router.push({
        //   name: 'home',
        //   params: {}
        // })
      // )
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

  components: {
    Header
  }
}
</script>

<style scoped>

</style>
