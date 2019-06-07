// nome, grupo, item, pontos, id_aluno, nome do curso, avaliacao, path to document
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  path: { 
    type: String,
    required: true
  },
  evaluation: {
    type: String,
    enum: ['aproved', 'reproved', 'none'],
    default: 'none'
  },
  feedback: {
    type: String 
  },
  sent: { 
    type: Boolean,
    required: true,
    default: false
  },
  group: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Group',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Group.item',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Student',
    required: true
  }
})

const Document = mongoose.model('Document', schema)

export default Document
