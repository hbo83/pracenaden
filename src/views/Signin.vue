<template>
<v-app>
  <div class="signin">
    <Header></Header>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#90e4f1" dark flat>
                <v-toolbar-title>Zaregistrovat se</v-toolbar-title>
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
                <a href="http://localhost:8080/login">Přihlásit</a>
                <v-btn style="margin-left: 68%" color="success" @click="signIn">Registrovat</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import axios from 'axios';
import VueAxios from 'vue-axios'

export default {
  name: 'Signin',
  data() {
    return {
      email: '',
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
    signIn() {
      let currentObj = this;
      axios.post('http://localhost:8081/users', {

        email: this.email,
        password: this.password
      }).then(this.$router.push({
        name: 'ProfilEdit'
      })).then(alert("Nyní jste zaregistrován"))

      this.$store.commit('setLoged', true)
        console.log(this.$store.state.loged)

      
    }
    // logIn() {
    //   let currentObj = this;
    //
    //   var request = {
    //     params: {
    //       login: [this.email, this.password]
    //     }
    //   }
    //
    //   this.$store.commit('setLoged', true)
    //   console.log(this.$store.state.loged)
    //
    //   axios.get('http://localhost:8081/users/', request).then((response) => {
    //       console.log(response.data);
    //       alert("Nyní jste přihlášen jako" + " " + response.data[0].email);
    //       localStorage.setItem("userLoged", response.data[0].email);
    //       localStorage.setItem("userLoged_id", response.data[0]._id);
    //
    //       this.storeCommit(response.data[0].email)
    //
    //     }).then(this.$router.push({
    //       name: 'Signin',
    //       params: {}
    //     }))
    //     .catch((error) => {
    //       console.log(error);
    //       alert("Heslo nebo email nesouhlasí")
    //     })
    //
    // },
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
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
</style>
