import sinon from 'sinon'
import StudentController from '../../../src/controllers/student'

describe('Management student', () => {
  const defaultStudent = {
    ra: 'a12345',
    name: 'Student',
    email: 'student@mail',
    password: '12345',
    graduation: 'engenharia',
    gruop_one: 0,
    group_two: 0,
    group_three: 0,
    total: 0
  }
  const defaultRequest = {
    params: {}
  }
  describe('adding a student: create ()', () => {
    it('should adding the student into database', () => {
      const request = Object.assign({}, { body: defaultStudent }, defaultRequest)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      class fakeStudent {
        save () {}
      }

      sinon.stub(fakeStudent.prototype, 'save').withArgs().resolves()
      response.status.withArgs(201).returns(response)

      const studentController = new StudentController(fakeStudent)

      return studentController.create(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send)
        })
    })
    context('when an error occurs', () => {
      it('should return code 400', () => {
        const request = Object.assign({}, { body: defaultStudent }, defaultRequest)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeStudent {
          save () {}
        }
        sinon.stub(fakeStudent.prototype, 'save').withArgs().rejects({ message: 'Error' })
        response.status.withArgs(400).returns(response)

        const studentController = new StudentController(fakeStudent)

        return studentController.create(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
})