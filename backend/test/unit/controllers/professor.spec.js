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
  describe('when ask for all professor', () => {
    it('should return list of professors', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }
      Professor.find = sinon.stub()
      Professor.find.withArgs({}).resolves([defaultProfessor])

      const professorController = new ProfessorController(Professor)
      return professorController.readAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultProfessor])
      })
    })
    context('when an error occurs', () => {
      it('should return 422', () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        Professor.find = sinon.stub()
        Professor.find.withArgs({}).rejects({ message: 'Error'})
        
        response.status.withArgs(422).returns(response)
        
        const professorController = new ProfessorController(Professor)
        
        return professorController.readAll(defaultRequest, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 422)
          })
      })
    })
  })
  describe('update professor', () => {
    it('should respond with 200 when the professor has been updated', () => {
      const fakeId = 'a-fake-id'
      const updatedProfessor = {
        _id: fakeId,
        name: 'Updated professor',
        email: 'uptade@email',
        graduation: 'engenharia',
        password: '123456'
      }
      const request = {
        params: {
          id: fakeId
        },
        body: updatedProfessor
      }
      const response = {
        sendStatus: sinon.spy()
      }

      class fakeProfessor {
        static findOneAndUpdate() {}
      }
      const findOneAndUpdateStub = sinon.stub(fakeProfessor, 'findOneAndUpdate')
      findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedProfessor).resolves(updatedProfessor)
      
      const professorController = new ProfessorController(fakeProfessor);

      return professorController.updateProfessor(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 200);
        });
    })
    context('when an error occurs', () => {
      it('should return 422', () => {
        const fakeId = 'a-fake-id';
        const updatedProfessor = {
          _id: fakeId,
          name: 'Updated professor',
          email: 'uptade@email',
          graduation: 'engenharia',
          password: '123456'
        }
        const request = {
          params: {
            id: fakeId
          },
          body: updatedProfessor
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        };

        class fakeProfessor {
          static findOneAndUpdate() {}
        }

        const findOneAndUpdateStub = sinon.stub(fakeProfessor, 'findOneAndUpdate')
        findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedProfessor).rejects({ message: 'Error' })
        response.status.withArgs(422).returns(response);

        const professorController = new ProfessorController(fakeProfessor)

        return professorController.updateProfessor(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    })
  })
})