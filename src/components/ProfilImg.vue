<template>
<div class="avatar"><!--tu komponentu prejmenovat na profilIMG-->
<div style="margin-bottom: 12px; border-radius: 100px; overflow: hidden">
<v-img
          :src="getProfilePath"
          class="my-0"
          contain
          height="113"
          :aspect-ratio="1/1"
          alt="no picture"
          @error="onError"
        ></v-img>
</div>
</div>
</template>

<script>
export default {
  name: 'ProfilImg',
  data() {
    return {

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
  mounted() {
    console.log('http://localhost:8081/uploads/' + this.$store.state.allProfiles[0].email + '/profilPhoto.jpg')
  }
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 175px;
  /* float: left; */
  border-radius: 3px;
  margin-right: 20px;
  border-radius: 100px;
}
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
