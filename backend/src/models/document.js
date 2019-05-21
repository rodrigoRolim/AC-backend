// nome, grupo, item, pontos, id_aluno, nome do curso, avaliacao, path to document
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  score: Number,
  path: String,
  evaluation: Boolean,
  sent: Boolean,
  graduation: { type: mongoose.Schema.Types.ObjectId, ref: 'Graduation' },
  groupItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
})

const Document = mongoose.model('Document', schema)

export default Document
