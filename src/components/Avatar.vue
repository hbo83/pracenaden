<template>
<div class="avatar">
<!-- <v-icon large>arrow_back</v-icon> -->
<div style="margin-bottom: 12px;">
<v-img
          :src="msg"
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
      msg: 'http://localhost:8081/uploads/' + this.email + '/profilPhoto.jpg'
      // msg: this.profilPhoto

    }
  },
    props: {
      email: {
        type: String,
        required: false
      }
    },
  methods: {
    onError () {
      this.msg = 'http://localhost:8081/uploads/no-photo.png'
    }
  },
  computed: {
    // a computed getter
    
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
  /* border: 1px solid blue; */
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
