export default {
  SET_DOCUMENTS: (state, value) => {
    state.documents = value
  },
  UPDATE_DOCUMENT: (state, value) => {
    const position = state.documents.indexOf(value.document)
    state.documents[position].evaluation = value.evaluation
  }
}