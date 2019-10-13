<template>
<div class="avatar">
<div style="margin-bottom: 12px;">
<v-img
          :src="profilPhoto"
          class="my-3"
          contain
          height="160"
          style="border-radius: 16px;"
          alt="no picture"
          @error="onError"
        ></v-img>
</div>
</div>
</template>

<script>
export default {
  name: 'Avatar',
  data() {
    return {
      profilPhoto: 'http://localhost:8081/uploads/' + this.email + '/profilPhoto.jpg'

    }
  },
    props: {
      email: {
        type: String,
        required: false
      }
    },
  methods: {
    //kdyz neexistuje zdroj obrazku, zobrazi se defaultni img
    onError () {
      this.msg = 'http://localhost:8081/uploads/no-photo.png'
    }
  },
  computed: {

  },
  mounted() {
    // console.log('Avatar mountedv' + this.msg)
  }
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 175px;
  float: left;
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
