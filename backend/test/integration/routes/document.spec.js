import Document from '../../../src/models/document'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import formData from 'form-data'
describe('Router: document', () => {
  let request
  const defaultId = '5cd60a0312c3e687ea34667f'
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultDocument = {
    name: 'document name',
    score: 10,
    path: '/path/to/document',
    evaluation: 'none',
    sent: false,
    group: 'name group',
    item: 'name item',
    student: '5ce30224b1bcd6cda1addc58'
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    let document = new Document(defaultDocument)
    document._id = "5ce98fb42552b2f933f5e47a"
    Document.deleteMany({})
    return document.save()
  })

  afterEach(() => Document.deleteMany({}))

  describe('POST /document/add', () => {
    it('should return new saved document', done => {
      const newDocument = Object.assign({}, {_id: defaultId}, defaultDocument)
      const reque = { body: { document: newDocument }}
      const expectedSaveDocument = {
        _id: defaultId,
        __v: 0,
        name: 'document name',
        score: 10,
        path: '/path/to/document',
        evaluation: 'none',
        sent: false,
        group: 'name group',
        item: 'name item',
        student: '5ce30224b1bcd6cda1addc58'
      }
  
      request
        .post('/document/add')
        .set('authorization', token)
        .set('Accept', 'application/pdf')
        .attach('file', '/home/rodrigo/projects/atividades complementares/backend/uploads/aula4.pdf')
        .field('document', JSON.stringify(newDocument))
        .end((err, res) => {
          //expect(res.body).to.eql(expectedSaveDocument)
          expect(res.status).to.eql(201)
          done(err)
        })  
    })
  })
})