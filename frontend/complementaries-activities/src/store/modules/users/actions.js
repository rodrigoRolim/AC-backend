export default {
  loginStore (context, value) {
    context.commit('LOGIN', value)
  }
}
// como usar: troque isto this.$store.commit('LOGIN', this.admin) por isto this.$store.dispatch('adicionarTarefa', this.tarefa)