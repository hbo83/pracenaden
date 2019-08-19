<template>
<div class="profil" @click="selectProfil">
  <Avatar></Avatar>
  <!-- <p v-for="profileData in profileDatas">{{profileData}}</p> -->
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><v-icon>face</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.name }}</span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><v-icon>build</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.job }}</span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><v-icon>location_city</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.city }}</span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><v-icon>money</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.money }}</span></p>
  <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><v-icon>category</v-icon></span><span style="margin-left: 50px;">{{ profileDatas.category[0] + " | " + profileDatas.category[1] + " |  " + profileDatas.category[2] }}</span></p>
</div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'Profil',
  // zde rikam ze props ktere jsem obdrzel od parent komponenty se nazyvaji profilData, ocekavany typ je pole a jsou required
  props: {
    profileDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      msg: 'PraceNaDen',
      name: 'Martin'

    }
  },
  methods: {
    selectProfil(name) {
      console.log(event.target.parentNode.parentNode.childNodes)
      // console.log(id)
      //po kliknutí na řádek s kontaktem, redirekt na EditContact s předáním parametrů kliknutého kontaktu. V komponentě EditContact jsou předaná data namountována do formuláře.
      this.$router.push({
        name: 'ProfilDetail',
        params: name
      })
    }
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
  height:215px;
  border-bottom: 1px solid grey;
  /* border-radius: 5px; */
  padding: 20px;
  margin: 5px 0 0 5px;
  float: left;
  cursor: pointer;
  background-color: RGBA(144,228,241,0.5);
  /* zena ruzovy ramecek , muz modry treba */
}
.profil:hover {
  background-color: RGBA(144,228,241,1);
}
h1,
h2 {
  font-weight: normal;
}
p {
  text-align: left;
}
p:first-of-type {
  display: none;
}
p:last-child {
  display: none;
}
.v-application p {
  margin: 0px;
}
a {
  color: #42b983;
}
</style>
