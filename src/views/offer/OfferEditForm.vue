<template>
  <div>
  <Header color="pink" />
  <NavBar path="offeredit" />
  <OfferForm />
  <OfferUploadPhoto />
  <OfferGalery />
</div>
</template>
<script>
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
import OfferForm from '@/components/offer/OfferForm.vue'
import OfferUploadPhoto from '@/components/offer/OfferUploadPhoto.vue'
import OfferGalery from '@/components/offer/OfferGalery.vue'
export default {
  name: 'OfferEditForm',
  components: {
    Header,
    NavBar,
    OfferForm,
    OfferUploadPhoto,
    OfferGalery
  },
}
</script>
