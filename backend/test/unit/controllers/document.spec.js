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
      const request = {params: fakeId}
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(204).returns(response)
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
  })
})