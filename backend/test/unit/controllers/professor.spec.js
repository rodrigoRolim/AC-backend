import sinon from 'sinon'
import Professor from  '../../../src/models/professor'
import ProfessorController from '../../../src/controllers/professor'

describe('Management professor', () => {
  const defaultProfessor = {
    name: 'eduardo siqueira',
    email: 'eduardo@email.com',
    password: '12345',
    graduation: '5cd85d1b942d44d0ae60f2fb'
  }
  const defaultRequest = {
    params: {}
  };
  describe('when adding professor to graduation', () => {
    it('should save professor into on database', () => {
      const request = Object.assign({}, { body: defaultProfessor })
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      class fakeProfessor {
        save () {}
      }
      
      response.status.withArgs(201).returns(response)
      sinon.stub(fakeProfessor.prototype, 'save').withArgs().resolves()

      const professorController = new ProfessorController(fakeProfessor)
      return professorController.createProfessor(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send)
        })
    })
    context('when an error occurs', () => {
      it('should return 422', () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }

        class fakeProfessor {
          save () {}
        }

        response.status.withArgs(422).returns(response)
        sinon.stub(fakeProfessor.prototype, 'save').withArgs().rejects({ message: 'Error'})

        const professorController = new ProfessorController(fakeProfessor)
        
        return professorController.createProfessor(defaultRequest, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 422)
          })
      })
    })
  })
})