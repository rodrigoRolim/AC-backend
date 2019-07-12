export default {
  professorStore (context, value) {
    context.commit('ADD_PROFESSOR', value)
  }
}
// como usar: troque isto this.$store.commit('LOGIN', this.admin) por isto this.$store.dispatch('adicionarTarefa', this.tarefa)
