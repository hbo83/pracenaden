<template>
<div class="header">
  <h1>{{ msg }}</h1>
  <v-icon @click="redirProfilDetail" style="color: white; float: right; margin-right: 68px;cursor: pointer; margin-top: -30px" size="28px">edit</v-icon>
  <p style="text-align: right; color: white;"><b>{{ userLoged }}</b><span>
      <v-icon @click="redirLogin" to="/login" style="color: white; float: right; margin-right: 20px;cursor: pointer; margin-left: 10px; margin-top: -30px" size="28px">{{logedYesNo()}}</v-icon>
    </span></p>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      msg: 'Pracenaden.cz',
      userLoged: '',
      loged: true
    }
  },
  methods: {
    logedYesNo() {

      let x = localStorage.getItem("userLoged");
      if (x) {
        return "exit_to_app"
        console.log(x)
      } else if (x === null) {
        return "account_box"
        console.log(x)
      }
    },
    redirLogin() {
      let x = localStorage.getItem("userLoged");
      if (x) {
        var txt;
        if (confirm("Opravdu se chcete odhlásit?")) {
          txt = "Nyní jste odhlášeni!";
          localStorage.removeItem("userLoged");
          window.location.href = "http://localhost:8080/";
          this.loged === false;
          alert(txt);
        }

      } else {
        window.location.href = "http://localhost:8080/login";
        this.loged === true;

      }
    },
    redirProfilDetail() {

          window.location.href = "http://localhost:8080/profiledit";

    }
  },
  mounted() {
    console.log('Header mounted')
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 40px;
  background-color: #90e4f1;
  /* margin-top: 20px; */
}

h1 {
  /* dat asi jinej nazev nez praci naden */
  text-align: left;
  color: white;
}

a {
  color: #42b983;
}
</style>
