<template>
  <div id="ac-leftbar">
    <ac-list-professor :listProfessor="professors"></ac-list-professor>
  </div>
</template>

<script>
import AcListProfessor from './AcListProfessor'
import AdminService from '@/services/Admin.js'
export default {
  name: 'AcLeftBar',
  components: { AcListProfessor },
  data () {
    return {
      professors: []
    }
  },
  created () {
    AdminService.readAllProfessors()
      .then(professors => {
        this.professors =  professors.data
        this.$store.dispatch('professorStore', this.professors)
      })
      console.log(this.$store.getters.getUser)
  },
  methods: {
    readProfessor (professor) {
      this.professors.push(professor)
    }
  }
}
</script>

<style scoped>
#ac-leftbar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  width: 25%;
  max-height: 81vh;
  overflow-y: auto;
}
</style>
