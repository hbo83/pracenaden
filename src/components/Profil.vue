<template>
<div class="profil" @click="selectProfil">
  <Avatar></Avatar>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>{{ name }}</b></span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Obor:</b></span><span style="margin-left: 50px;"><b>Truhlářství</b></span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Město:</b></span><span style="margin-left: 50px;"><b>Cheb</b></span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Požadovaná odměna:</b></span><span style="margin-left: 50px;"><b>165.-Kč / hod.</b></span></p>
  <div style="margin-left: 200px;">
    <p style="text-align: left;">Zabývám se renovací starého nábytku, výrobou nového nábytku a likvidací dřevěného materiálu</p>
  </div>
</div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'Profil',
  data() {
    return {
      msg: 'PraceNaDen',
      name: 'Martin'

    }
  },
  methods: {
    selectProfil() {
      console.log(event.target.parentNode.parentNode.childNodes)
      // console.log(id)
      //po kliknutí na řádek s kontaktem, redirekt na EditContact s předáním parametrů kliknutého kontaktu. V komponentě EditContact jsou předaná data namountována do formuláře.
      this.$router.push({
        name: 'ProfilDetail',
        params: "po"
      })}
  },
  mounted() {
    console.log('Profil mounted')
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.profil {
  width: 600px;
  height:192px;
  border-bottom: 1px solid pink;
  /* border-radius: 5px; */
  padding: 20px;
  margin: 5px 0 0 5px;
  float: left;
  cursor: pointer;
  /* zena ruzovy ramecek , muz modry treba */
}
.profil:hover {
  background-color: #f2f2f2;
}
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
