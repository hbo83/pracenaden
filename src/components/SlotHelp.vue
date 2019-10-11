<template>
<div>
  <h1> i am from slot</h1>
  <slot name="nadpis"></slot>
</div>
</template>

<script>
export default {
  name: 'SlotHelp',
  data() {
    return {
      msg2: "hello slot"

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

h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
