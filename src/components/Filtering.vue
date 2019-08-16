<template>
<v-container fluid>
  <v-row>
      <v-col cols="2">
        <v-select
          :items="items"
          label="Obor, Profese"
          outlined
          prepend-icon="build"
        ></v-select>
      </v-col>

      <v-col cols="2">
        <v-select
          :items="items"
          label="Místo"
          outlined
          prepend-icon="map"
        ></v-select>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Filtering',
  data() {
    return {
      msg: 'PraceNaDen',
      e1: 'Florida',
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' },
        ],
        states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],

    }
  },
  methods: {

  },
  mounted() {
    console.log('Filtering mounted')
  }
}
</script>

<style scoped>
.filter {
  width: 100%;
  height: 50px;
  /* background-color: blue; */
  margin: 10px 0;
  border:  1px solid black;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
