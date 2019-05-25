// nome, grupo, item, pontos, id_aluno, nome do curso, avaliacao, path to document
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  score: Number,
  path: String,
  evaluation: Boolean,
  sent: Boolean,
  groupItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
})

const Document = mongoose.model('Document', schema)

export default Document
