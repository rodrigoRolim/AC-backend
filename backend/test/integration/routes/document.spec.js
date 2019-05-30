import Document from '../../../src/models/document'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'mz/fs'

describe('Router: document', () => {
  const newPathfile = path.join(__dirname, '..', '..', '..', 'uploads/test.pdf')
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
    fs.closeSync(fs.openSync(newPathfile, 'w'))
    let document = new Document(defaultDocument)
    document._id = "5ce98fb42552b2f933f5e47a"
    Document.deleteMany({})
    return document.save()
  })
  // /home/rodrigo/projects/atividades complementares/backend/uploads
  afterEach(() => Document.deleteMany({}))

  describe('POST /document/add', () => {
    it('should return new saved document', done => {
      const newDocument = Object.assign({}, {_id: defaultId}, defaultDocument)
      request
        .post('/document/add')
        .set('authorization', token)
        .set('Accept', 'application/pdf')
        .attach('file', newPathfile)
        .field('document', JSON.stringify(newDocument))
        .end((err, res) => {
          expect(res.status).to.eql(201)
          done(err)
        })  
    })
  })
  describe('GET /document/all', () => {
    it('should return all documents object', done => {
      const defaultDocumentResponse = Object.assign({}, 
        {_id: "5ce98fb42552b2f933f5e47a", __v: 0}, defaultDocument)
      request
        .get('/document/all')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.eql([defaultDocumentResponse])
          done(err)
        })
    })
  })
  describe('DELETE /document/:file', () => {
    it('should return all documents object', done => {
      const defaultDocumentResponse = Object.assign({}, 
        {_id: "5ce98fb42552b2f933f5e47a", __v: 0}, defaultDocument)
      const pathFile = 'uploads/test.pdf'
      request
        .del(`/document/${pathFile}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.eql(204)
          done(err)
        })
    })
  })
  describe('GET /document/:file', () => {
    it('should return pdf file', done => {
      const pathFile = path.join(__dirname, '..', '..', 'unit/uploads/test.pdf')
      request
        .get(`/document/${path}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.eql()
        })
    })
  })
})