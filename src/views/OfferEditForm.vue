<template>
  <div>
  <Header color="pink" />
  <NavBar path="offeredit" />
  <OfferForm />
</div>
</template>
<script>
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'

import OfferForm from '@/components/offer/OfferForm.vue'
export default {
  name: 'OfferEditForm',
  components: {
    Header,
    NavBar,
    OfferForm

  },
}
</script>
