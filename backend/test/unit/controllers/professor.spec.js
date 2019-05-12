import sinon from 'sinon'

describe('Management professor', () => {
  describe('when adding professor to graduation', () => {
    it('should save professor into on database', () => {
      const request = {
        body: {
          name: 'eduardo siqueira',
          email: 'eduardo@email.com',
          password: '12345'
        }
      }
      const response = {
        send: sinon.spy()
      }

      Professor.create = sinon.stub()
      Professor.create.withArgs(request.body).resolves('success')

      const professorController = new ProfessorController(Professor)
      return professorController.createProfessor(request, response)
        .then(() => {
          sinon.assert.withCalled(reponse.send, 'success')
        })
    })
  })
})