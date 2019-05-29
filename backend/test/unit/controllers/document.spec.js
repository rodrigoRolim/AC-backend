import sinon from 'sinon'
import DocumentController from '../../../src/controllers/document'
import Document from '../../../src/models/document'

describe('Controller: Document', () => {
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
  const defaultRequest = {
    params: {}
  }
  describe('posting document from student', () => {
    it('should posting a document and return code 201', () => {
      const file = {
        path: 'path/to',
      }
      const request = Object.assign({}, 
        { body: { document: JSON.stringify(defaultDocument)}, file: file }, defaultRequest)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      class fakeDocument {
        save () {}
      }

      sinon.stub(fakeDocument.prototype, 'save').withArgs().resolves()
      response.status.withArgs(201).returns(response)

      const documentController = new DocumentController(fakeDocument)

      return documentController.create(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send)
        })
    })
    context('when an error occurs', () => {
      it('should return code 422', () => {
        const file = {
          path: 'path/to',
        }
        const request = Object.assign({}, 
          { body: { document: JSON.stringify(defaultDocument)}, file: file }, defaultRequest)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeDocument {
          save () {}
        }

        sinon.stub(fakeDocument.prototype, 'save').withArgs().rejects({ message: 'Error' })
        response.status.withArgs(422).returns(response)

        const documentController = new DocumentController(fakeDocument)

        return documentController.create(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('when deleting document', () => {
    it('should return status code 201', () => {
      const fakeId = 'id-fake'
      const request = { params: { id: fakeId } }
      const response = {
        sendStatus: sinon.spy(),
      }
      class fakeDocument {
        static remove () {}
      }
      const removeStub = sinon.stub(fakeDocument, 'remove')
      removeStub.withArgs({ _id: fakeId }).resolves([1])
      const documentController = new DocumentController(fakeDocument)
      return documentController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 204)
        })
    })
    context('when an error occurs', () => {
      it('should return status code 400', () => {
        const fakeId = 'id-fake'
        const request = { params: { id: fakeId } }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeDocument {
          static remove () {}
        }

        const removeStub = sinon.stub(fakeDocument, 'remove')
        removeStub.withArgs({ _id: fakeId }).rejects({ message: 'Error' })
        response.status.withArgs(400).returns(response)

        const documentController = new DocumentController(fakeDocument)
        return documentController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('when getting all documents', () => {
    it('should return all documents', () => {
      const response = {
        send: sinon.spy()
      }
      Document.find = sinon.stub()
      Document.find.withArgs({}).resolves([defaultDocument])
      const documentController = new DocumentController(Document)
      return documentController.readAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultDocument])
        })
    })
    context('when an error occurs', () => {
      it('should return code 400', () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        response.status.withArgs(400).returns(response)
        Document.find = sinon.stub()
        Document.find.withArgs({}).rejects({ message: 'Error' })
        const documentController = new DocumentController(Document)
        return documentController.readAll(defaultRequest, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('getting document by file path', () => {
    it('should return file with status code 201', () => {
      const fileLocation = 'uploads/5d84f64f162636bd7ad51112c6c9a059'
      const request = { params: { id:{ fileLocation } } }
      const response = {
        sendFile: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
  /*     Document.find = sinon.stub()
      Document.find.withArgs({path: fileLocation }).resolves(fileLocation) */
      const documentController = new DocumentController(Document)
      const respFile = documentController.getFile(request, response)
      expect(respFile).to.eql(fileLocation)
      
    })
  })
})