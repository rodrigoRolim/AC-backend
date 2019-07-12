export default {
  addDegreeStore: (context, value) => {
    context.commit('ADD_DEGREE', value)
  },
  invertBoolean: (context, value) => {
    context.commit('INVERT', value)
  }
}
