<template>
<v-app>
  <Header />
  <v-container>
    <v-row>
      <v-col class="col-4">
        <div class="profilDetail">
          <Avatar></Avatar>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>{{ name }}</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Obor:</b></span><span style="margin-left: 50px;"><b>Truhlářství</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Město:</b></span><span style="margin-left: 50px;"><b>Cheb</b></span></p>
          <p style="display: block; text-align: left; margin-bottom: 10px"><span style="margin-left: 50px"><b>Požadovaná odměna:</b></span><span style="margin-left: 50px;"><b>165.-Kč / hod.</b></span></p>
          <div style="margin-left: 200px;">
            <p style="text-align: left;">Zabývám se renovací starého nábytku, výrobou nového nábytku a likvidací dřevěného materiálu</p>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="profilDetailMoreHeader">
          <p><span>Kategorie:</span><span>Dřevní průmysl, Truhlářství, Likvidace odpadu, Renovace</span></p>
          <p><span>Telefon:</span><span>777 187 327</span></p>
          <p><span>Email:</span><span>jarmil@jarmil.cz</span></p>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-1">
        <div class="profilDetailBack">
          <v-btn height="190px" width="100%" small color="error" to="/">
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="profilDetailMore">
          <p><span>Kategorie:</span><span>Dřevní průmysl, Truhlářství, Likvidace odpadu, Renovace</span></p>
          <p><span>Telefon:</span><span>777 187 327</span></p>
          <p><span>Email:</span><span>jarmil@jarmil.cz</span></p>
        </div>
      </v-col>
    </v-row>

    <v-row>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/id/11/500/300" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="400" max-height="200"></v-img>
        </v-col>
    </v-row>
  </v-container>



  </div>
</v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Avatar from '@/components/Avatar.vue'
export default {
  name: 'ProfilDetail',
  data() {
    return {
      msg: 'PraceNaDen',
      name: 'Martin'

    }
  },
  methods: {

  },
  mounted() {
    console.log('ProfilDetail mounted')
  },
  components: {
    Header,
    Avatar
  }
}
</script>

<style scoped>
.profilDetail {
  /* width: 600px; */
  height: 192px;
  background-color: pink;
  border-radius: 5px;
  padding: 20px;
  margin: 5px 0 0 5px;
  /* float: left; */
  cursor: pointer;
  /* zena ruzovy ramecek , muz modry treba */
}

.profilDetailMoreHeader {
  /* width: 67%; */
  height: 192px;
  border: 1px solid black;
  /* float: left; */
  margin: 5px 0 0 5px;
  border-radius: 5px;
}

.profilDetailBack {
  /* width: 5%; */
  height: 192px;
  border: 1px solid black;
  /* float: left; */
  /* margin: 5px 0 0 5px; */
  border-radius: 5px;
}

.profilDetailMore {
  /* width: 91%; */
  height: 192px;
  border: 1px solid black;
  /* float: left; */
  /* margin: 5px 0 0 5px; */
  border-radius: 5px;
}

/* .profilDetailGalery {
  width: 100%;
  height: auto;
  border: 1px solid black;
  float: left;
  margin: 5px 0 0 5px;
  border-radius: 5px;
} */

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
