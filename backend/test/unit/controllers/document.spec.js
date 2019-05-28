import sinon from 'sinon'
import DocumentController from '../../../src/controllers/document'

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
})