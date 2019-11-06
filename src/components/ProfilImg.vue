<template>
<div class="profilImg">
        <img :src="getProfilePath" alt="profilPhoto" style="height: 150px;width: 150px; border-radius: 100px; margin: auto">
</div>
</template>

<script>
export default {
  name: 'ProfilImg',
  data() {
    return {
      profilIndex: null
    }
  },
    props: {
      index: {
        type: Number,
        required: true
      }
    },
  methods: {
    //kdyz neexistuje zdroj obrazku, zobrazi se defaultni img
    onError () {
      this.msg = 'http://localhost:8081/uploads/no-photo.png'
    }
  },
  computed: {
    getProfilePath() {
      return 'http://localhost:8081/uploads/' + this.$store.state.allProfiles[this.index].email + '/profilPhoto.jpg'
    }
  },
  beforeMount() {
      this.profilIndex = this.$store.state.currentProfilIndex
  },
  mounted() {

  }
}
</script>

<style scoped>
.profilImg {
  max-width: 200px;
  max-height: 166px;
  overflow: hidden;
}
</style>
