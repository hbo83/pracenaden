<template>
<v-row>
  <v-col>
    <h3>Vaše Galerie</h3>
  </v-col>
  <v-col>

    <!-- <upload-btn title="Nahrát fotku" @file-update="uploadGaleryPhoto">
      <template slot="icon">
        <v-icon>add</v-icon>
      </template>
    </upload-btn> -->
  </v-col>
</v-row>
<hr />
<!-- <v-row>
  <v-col v-for="(image, index) in imgs2" v-bind:index="index" class="col-4">

    <v-img style="cursor: pointer" :src="imgs2[index]" aspect-ratio="1" lazy-src="https://picsum.photos/id/11/10/6"></v-img>
    <v-card>
      <v-btn width="50%" color="error" @click="delImg(imgs[index])">del</v-btn>
    </v-card>
  </v-col>
</v-row> -->
</template>

<script>
import axios from 'axios'
import UploadButton from 'vuetify-upload-button';

export default {
  name: 'OfferEditGalery',
  components: {
    'upload-btn': UploadButton,
  },
  data() {
    return {
      userLoged: null,
      profilIndex: null,
      email: '',
      index: null
    }
  },
  methods: {

  },
  computed: {

  },
  // mounted() {
  //   this.email = this.$store.state.userLoged
  //   axios.get('http://localhost:8081/img/' + this.email) //naplni imgs[] objektama fotek
  //     .then((response) => {
  //       this.imgs = response.data;
  //       // console.log(response.data);
  //       for (var i in response.data) {
  //         this.imgs2.push("http://localhost:8081/uploads/" + response.data[i].productImage)
  //
  //       }
  //       console.log(this.imgs2)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
</script>

<style scoped>

</style>
