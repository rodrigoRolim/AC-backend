import sinon from 'sinon'
import DocumentController from '../../../src/controllers/document'
import Document from '../../../src/models/document'
import path from 'path'
import fs from 'mz/fs'

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
      const pathname =  path.join(__dirname, '..', '..', '..', 'uploads', 'fake-path')
      const fakePath = 'fake-path'

      const request = { params: { file: fakePath } }
      const response = {
        sendStatus: sinon.spy(),
      }

      class fakeDocument {
        static remove () {}
      }

      fs.unlink = sinon.stub()
      fs.unlink.withArgs(pathname).resolves()
      const removeStub = sinon.stub(fakeDocument, 'remove')
      removeStub.withArgs({ path: path.join('uploads', fakePath) }).resolves([1])
      const documentController = new DocumentController(fakeDocument, path, fs)
      return documentController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 204)
        })
    })
    context('when an error occurs', () => {
      it('should return status code 400', () => {
        const fakePath = 'fake-path'
        const request = { params: { file: fakePath } }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeDocument {
          static remove () {}
        }
        response.status.withArgs(400).returns(response)
        const removeStub = sinon.stub(fakeDocument, 'remove')
        removeStub.withArgs({ path: path.join('uploads', fakePath) }).rejects({ message: 'Error' })

        const documentController = new DocumentController(fakeDocument, path, fs)
        return documentController.delete(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
    context('when not found file', () => {
      it('should return status code 404', () => {
        const pathname =  path.join(__dirname, '..', '..', '..', 'uploads', 'fake-path')
        const fakePath = 'fake-path'
        const request = { params: { file: fakePath } }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeDocument {
          static remove () {}
        }
        fs.unlink = sinon.stub()
        fs.unlink.withArgs(pathname).rejects({ message: 'Error' })
        const removeStub = sinon.stub(fakeDocument, 'remove')
        removeStub.withArgs({ path: path.join('uploads', fakePath) }).resolves([1])
        response.status.withArgs(404).returns(response)

        const documentController = new DocumentController(fakeDocument, path, fs)
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
      const fileLocation = '5d84f64f162636bd7ad51112c6c9a059'
      const request = { params: { file: fileLocation  } }
      const fileLocationResult = path.join(__dirname, '..','..', '..', 'uploads', request.params.file)
      console.log(fileLocationResult)
      const response = {
        sendFile: sinon.stub()
      }

      fs.access = sinon.stub()
      fs.access.withArgs(fileLocationResult, fs.F_OK).resolves()
    
      const documentController = new DocumentController(Document, path, fs)
      return documentController.getFile(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendFile)
        })
       
    })
    context('when an error occurs', () => {
      it('should return status code 400', () => {
        const fileLocation = '5d84f64f162636bd7ad51112c6c9a059'
        const request = { params: { file: fileLocation  } }
        const fileLocationResult = path.join(__dirname, '..','..', '..', 'uploads', request.params.file)
  
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
  
        response.status.withArgs(400).returns(response)
        fs.access = sinon.stub()
        fs.access.withArgs(fileLocationResult, fs.F_OK).rejects({ message: 'Error' })
      
        const documentController = new DocumentController(Document, path, fs)
        return documentController.getFile(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('get document by id', () => {
    it('should return document', () => {
      const fakeid = 'fake-id'
      const request = {
        params: {
          id: fakeid
        }
      }
      const response = {
        send: sinon.spy()
      }

      Document.find = sinon.stub()
      Document.find.withArgs({ _id: fakeid }).resolves([defaultDocument])

      const documentController = new DocumentController(Document)
      return documentController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultDocument])
        })

    })
    context('when an error occurs', () => {
      it('should return status code 400', () => {
        const fakeid = 'fake-id'
        const request = {
          params: {
            id: fakeid
          }
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        
        response.status.withArgs(400).returns(response)
        Document.find = sinon.stub()
        Document.find.withArgs({ _id: fakeid }).rejects({ message: 'Error' })
  
        const documentController = new DocumentController(Document)
        return documentController.getById(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('update() updating document', () => {
    it('should respond with status code 200 when the document has been updated', () => {
      const fakeid = 'fake-id'
      const updatedDocument = {
        _id: fakeid,
        name: 'document name updated',
        score: 10,
        path: '/path/to/document/updated',
        evaluation: 'none',
        sent: false,
        group: 'name group updated',
        item: 'name item updated',
        student: '5ce30224b1bcd6cda1addc58'
      }
      const request = {
        params: {
          id: fakeid
        },
        body: updatedDocument
      }
      const response = {
        sendStatus: sinon.spy()
      }

      class fakeDocument {
        static findOneAndUpdate () {}
      }

      const findOneAndUpdateStub = sinon.stub(fakeDocument, 'findOneAndUpdate')
      findOneAndUpdateStub.withArgs({ _id: fakeid }, updatedDocument).resolves(updatedDocument)

      const documentController = new DocumentController(fakeDocument)

      return documentController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 200)
        })
    })
    context('when an error occurs', () => {
      it('should return 422', () => {
        const fakeid = 'fake-id'
        const updatedDocument = {
          _id: fakeid,
          name: 'document name updated',
          score: 10,
          path: '/path/to/document/updated',
          evaluation: 'none',
          sent: false,
          group: 'name group updated',
          item: 'name item updated',
          student: '5ce30224b1bcd6cda1addc58'
        }
        const request = {
          params: {
            id: fakeid
          },
          body: updatedDocument
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
  
        class fakeDocument {
          static findOneAndUpdate () {}
        }
  
        const findOneAndUpdate = sinon.stub(fakeDocument, 'findOneAndUpdate')
        findOneAndUpdate.withArgs({ _id: fakeid }).rejects({ message: 'Error' })
        response.status.withArgs(422).returns(response)

        const documentController = new DocumentController(fakeDocument)
        return documentController.update(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('updateSent () update the sent of many documents', () => {
    it('should return 200 as status code', () => {
      const fakestudentid = 'fake-student-id'
      const request = {
        params: {
          id: fakestudentid 
        }
      }
      const response = {
        sendStatus: sinon.spy()
      }
      class fakeDocument {
        static updateMany () {}
      }
      
      const updateManyStub = sinon.stub(fakeDocument, 'updateMany')
      updateManyStub.withArgs({ student: fakestudentid, sent: false  }, { sent: true }).resolves()

      const documentController = new DocumentController(fakeDocument)
      return documentController.sent(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 200)
        })
    })
    context('when an error occurs', () => {
      it('should return 400 as status code', () => {
        const fakestudentid = 'fake-student-id'
        const request = {
          params: {
            id: fakestudentid 
          }
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeDocument {
          static updateMany () {}
        }
        
        response.status.withArgs(400).returns(response)
        const updateManyStub = sinon.stub(fakeDocument, 'updateMany')
        updateManyStub.withArgs({ student: fakestudentid, sent: false  }, { sent: true }).rejects({ message: 'Error' })
  
        const documentController = new DocumentController(fakeDocument)
        return documentController.sent(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
})