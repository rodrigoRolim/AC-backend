export default {
  LOGIN: (state, value) => {
    state.user = value
  }
}
// como usar: this.$store.commit('LOGIN', this.admin)