export default {
  set: (context, value) => {
    context.commit('SET', value)
  },
  delete: (context, value) => {
    context.commit('DELETE', value)
  },
  update: (context, value) => {
    context.commit('UPDATE', value)
  }
}
