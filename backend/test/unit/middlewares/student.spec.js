import sinon from 'sinon'
import StudentMiddle from '../../../src/middleware/student'

describe('isSent() of document middleware', () => {
  const student = {
    _id: '12345',
    ra: 'a12345',
    name: 'Student',
    email: 'student@mail',
    password: '12345',
    graduation: 'engenharia',
    department: 'id-department',
    user_type: 'aluno',
    situation: 'approved'
  }
  context('when the approved student try send document to professor', () => {
    it('should return 403 status code and message', done => {
      const reqFake = {
        params: {
          id: 'fake-id-student'
        }
      }
      const resFake = {}
      StudentMiddle.approved(reqFake, resFake, done)
    })
  })
})