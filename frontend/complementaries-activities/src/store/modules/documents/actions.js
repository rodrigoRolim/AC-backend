export default {
  setDocument: (context, value) => {
    context.commit('SET_DOCUMENTS', value)
  },
  updateDocument: (context, value) => {
    context.commit('UPDATE_DOCUMENT', value)
  }
}