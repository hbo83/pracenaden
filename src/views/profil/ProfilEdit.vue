<template>
<div class="profilEdit">
  <Header color="#90e4f1"></Header>
  <NavBar path="" color="#90e4f1" nav="editace"/>
  <v-container style="width: 100%">
    <v-row justify="center">
      <v-col cols="2">
        <ProfilEditPhoto />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg='4' md='4' xs='12' sm='12'>
        <ProfilEditForm />
      </v-col>
    </v-row>
Galerie
    <hr />
    <!-- <v-row> -->
      <ProfilEditGalery />
    <!-- </v-row> -->
  </v-container>
</div>
</template>

<script>
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
import ProfilEditPhoto from '@/components/profil_edit/ProfilEditPhoto.vue'
import ProfilEditGalery from '@/components/profil_edit/ProfilEditGalery.vue'
import ProfilEditForm from '@/components/profil_edit/ProfilEditForm.vue'
export default {
  name: 'ProfilEdit',
  components: {
    Header,
    NavBar,
    ProfilEditPhoto,
    ProfilEditGalery,
    ProfilEditForm

  },
  data: () => ({

    profilImgIndex: 0,
    valid: false,
    id: '',
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
  computed: {


  },
  methods: {


  },
  mounted() {

  },

}
</script>

<style scoped>
.profilEdit {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}

/* .uplBtn label div {
  height: 166px;
} */


h3 {
  color: #90e4f1;
  text-align: left;
}

h4 {
  text-align: left;
}
</style>
<style>

</style>
