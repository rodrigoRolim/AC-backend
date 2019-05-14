import UsersController from '../../../src/controllers/admin'
import sinon from 'sinon'
import Admin from '../../../src/models/admin'
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
      Admin.findOne = sinon.stub()
      Admin.findOne.withArgs(userDefault).resolves(userResolves)

      const userController = new UsersController(Admin, jwt)
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
      Admin.findOne = sinon.stub()
      Admin.findOne.withArgs({ username: request.body.username }).rejects({message: 'Error'})

      const userController = new UsersController(Admin)
     
      return userController.post(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error')
        })
    })
  })
})