<template>
  <div>
    <ac-navbar></ac-navbar>
    <ac-leftbar></ac-leftbar>
    <ac-main></ac-main>
    <ac-rightbar></ac-rightbar>
    <ac-footer></ac-footer>
  </div>
</template>

<script>
import AcNavbar from '../AcNavbar'
import AcLeftbar from '../AcLeftbar'
import AcRightbar from '../AcRightbar'
import AcMain from '../AcMain'
import AcFooter from '../AcFooter'

export default {
  name: 'AdminHome',
  components: { AcNavbar, AcLeftbar, AcRightbar, AcMain, AcFooter }
}
</script>

<style scoped>
</style>
