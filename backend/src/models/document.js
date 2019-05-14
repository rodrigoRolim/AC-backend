// nome, grupo, item, pontos, id_aluno, nome do curso, avaliacao, path to document
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  score: Number,
  path: String,
  evaluation: Boolean,
  course_name: String,
  group: String,
  item: String,
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
})

const Document = mongoose.model('Document', schema)

export default Document
