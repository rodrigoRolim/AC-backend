import sinon from 'sinon'
import StudentController from '../../../src/controllers/student'
import Student from  '../../../src/models/student'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

describe('Management student', () => {
  const defaultStudent = {
    _id: '12345',
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
  describe('login student', () => {
    it('should return token of authorization', () => {
      const expectedResponse = {
        access: { token: 'hashToken', auth: true, tag: 2 },
        user: defaultStudent 
      }
      const request = {
        body: {
          ra: 'a123456',
          password: '12345'
        }
      }
      bcrypt.compare = sinon.stub()
      bcrypt.compare.withArgs(request.body.password, '12345').resolves(true)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
      const _id = '12345'
      jwt.sign = sinon.stub()
      jwt.sign.withArgs({ _id }, process.env.SECRET , {
        expiresIn: 86400
      }).returns('hashToken')

      Student.findOne = sinon.stub()
      Student.findOne.withArgs({ ra: request.body.ra }).resolves(defaultStudent)

      const studentController = new StudentController(Student, jwt, bcrypt.compare)
      return studentController.login(request, response) 
        .then(() => {
          sinon.assert.calledWith(response.send, expectedResponse)
        })
    })
    context('when an error occurs', () => {
      it('should return code 400', () => {
        const request = {
          body: {
            ra: 'a123456',
            password: '12345'
          }
        }
        bcrypt.compare = sinon.stub()
        bcrypt.compare.withArgs(request.body.password, '12345').resolves(true)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        response.status.withArgs(400).returns(response)
        const _id = '12345'
        jwt.sign = sinon.stub()
        jwt.sign.withArgs({ _id }, process.env.SECRET , {
          expiresIn: 86400
        }).returns('hashToken')
  
        Student.findOne = sinon.stub()
        Student.findOne.withArgs({ ra: request.body.ra }).rejects({ message: 'Error' })
  
        const studentController = new StudentController(Student, jwt, bcrypt.compare)
        return studentController.login(request, response) 
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
})