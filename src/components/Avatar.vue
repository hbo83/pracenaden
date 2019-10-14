<template>
<div class="avatar">
<div style="margin-bottom: 12px;">
<v-img
          :src="getProfilePath"
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
      },
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
