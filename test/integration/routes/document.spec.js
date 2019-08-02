import Document from '../../../src/models/document'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'mz/fs'

// colocar context em todos os testes

describe('Router: document', () => {

  const newPathfile = path.join(__dirname, '..', '..', '..', 'uploads/test.pdf')
  let request
  const defaultId = '5cd60a0312c3e687ea34667f'
  let token
  const defaultDocument = {
    name: 'document name',
    score: 10,
    path: 'test.pdf',
    evaluation: 'none',
    sent: false,
    group: '5d0d17e9bd5e3c152988a4f3',
    item: '5d0d17f8f936dbf6d76dbaac',
    student: '5ce30224b1bcd6cda1addc58'
  }
  const defaultDocumentSent = {
    name: 'document name',
    score: 10,
    path: 'test2.pdf',
    evaluation: 'none',
    sent: true,
    group: '5d0d17e9bd5e3c152988a4f3',
    item: '5d0d17e9bd5e3c152988a4f3',
    student: '5ce30224b1bcd6cda1addc58'
  }
  before(() => {
    console.log(process.env.SECRET)
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
      .then(() => {
        token = jwt.sign({ defaultId }, process.env.SECRET, {
          expiresIn: 86400
        })
      })
  })
  beforeEach(() => {
    fs.closeSync(fs.openSync(newPathfile, 'w'))
    let document = new Document(defaultDocument)
    document._id = "5ce98fb42552b2f933f5e47a"
    Document.deleteMany({})
    return document.save()
  })
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
  describe('GET /document/all/:id', () => {
    context('when getting all documents', () => {
      it('should return all documents object', done => {
        const customStudentId = '5ce30224b1bcd6cda1addc58'
        const defaultDocumentResponse = Object.assign({}, 
          {_id: "5ce98fb42552b2f933f5e47a", __v: 0}, defaultDocument)
        request
          .get(`/document/all/${customStudentId}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body[0]).to.eql(defaultDocumentResponse)
            done(err)
          })
      })
    })
  })
  describe('DELETE /document/:file', () => {
    it('should return delete document', done => {
      const pathFile = 'test.pdf'
      request
        .del(`/document/uploads/${pathFile}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.eql(204)
          done(err)
        })
    })
  })
  describe('GET /document/uploads/:file', () => {
    it('should return pdf file', done => {
      const pathFile = 'test.pdf'
      request
        .get(`/document/uploads/${pathFile}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.eql(200)
          done(err)
        })
    })
  })
  describe('GET /document/:id', () => {
    it('should return document', done => {
      const customId = "5ce98fb42552b2f933f5e47a"
      const documentResponse = Object.assign({}, 
                              { _id: "5ce98fb42552b2f933f5e47a", __v: 0}, 
                              defaultDocument)
      request
        .get(`/document/${customId}`)
        .set('authorization', token)
        .end((err, res) => {
          console.log()
          expect(res.body[0]).to.eql(documentResponse)
          done(err)
        })
    })
  })
  describe('PUT /document/update/:id', () => {
    context('when updating document', () => {
      it('should update the document and return 200 as status code', done => {
        const customId = "5ce98fb42552b2f933f5e47a"
        const updatedDocument = {
          name: 'document name updated',
          score: 10,
          path: 'test.pdf',
          evaluation: 'none',
          sent: false,
          group: '5d0d201e5cc23890cb8bfc01',
          item: '5d0d20288d9e8ec084341f51',
          student: '5ce30224b1bcd6cda1addc58'
        }
        request
          .put(`/document/update/${customId}`)
          .set('authorization', token)
          .send(updatedDocument)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
  describe('PUT /document/sent/:id', () => {
    context('when updating sent attribute of document', () => {
      it('should update sent of document and return 200 as status code', done => {
        
        const studentId = '5ce30224b1bcd6cda1addc58'
        request
          .put(`/document/sent/${studentId}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.status).to.eql(400)
            done(err)
          })
      })
    })
  })
  describe('GET /document/all/sents/:id', () => {
    context('when reading all documents sent of student', () => {
      it('should return all documents sent of student', done => {
        const studentId = '5ce30224b1bcd6cda1addc58'
        let document = new Document(defaultDocumentSent)
        const documentSentResponse = Object.assign({}, { _id: "5cf6d369b73efa380e617663", __v: 0 }, 
                                      defaultDocumentSent)
        document._id = "5cf6d369b73efa380e617663"
        document.save()
        request
          .get(`/document/all/sents/${studentId}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.eql([documentSentResponse])
            done(err)
          })
      })
    })
  })
})
