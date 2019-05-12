import UsersController from '../../../src/controllers/users'
import sinon from 'sinon'
import User from '../../../src/models/users'
import jwt from 'jsonwebtoken'

describe('Controllers: Users', () => {
  const userResolves = {
    _id: '12345',
    username: 'admin',
    password: 'admin',
    admin: true
  }
  const userDefault = {
    username: 'admin'
  }
  describe('post() users', () => {
    it('should call send with a token for admin user', () => {
      const request = {
        body: {
          username: 'admin',
          password: 'admin'
        }
      }
      const response = {
        send: sinon.spy(),
   
      }
      
      const _id = '12345'
      jwt.sign = sinon.stub()
      jwt.sign.withArgs({ _id }, process.env.SECRET , {
        expiresIn: 86400
      }).returns('hash')
      User.findOne = sinon.stub()
      User.findOne.withArgs(userDefault).resolves(userResolves)

      const userController = new UsersController(User, jwt)
      return userController.post(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { token: 'hash', auth: true, admin: true })
        })
    })
    it('should return auth false when the login is invalid', () => {

    })
    it('should return 400 when an error occurs', () => {
      const request = {
        body: {
          username: 'admin2',
          password: 'admin'
        }
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }

      response.status.withArgs(400).returns(response)
      User.findOne = sinon.stub()
      User.findOne.withArgs({ username: request.body.username }).rejects({message: 'Error'})

      const userController = new UsersController(User)
     
      return userController.post(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error')
        })
    })
  })
})