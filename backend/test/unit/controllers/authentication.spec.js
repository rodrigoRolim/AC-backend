import UsersController from '../../../src/controllers/users'
import sinon from 'sinon'
import User from '../../../src/models/users'

describe('Controllers: Users', () => {
  const defaultToken = {
    token: 'asdf10',
    msg: true
  }
  const userDefault = {
    username: 'admin',
    password: 'admin'
  }
  describe('post() users', () => {
    it('should call send with a token for admin user', () => {
      const request = {
        username: 'admin',
        password: 'admin'
      }
      const response = {
        send: sinon.spy()
      }
      
      User.find = sinon.stub()
      User.find.withArgs(userDefault).resolves(defaultToken)

      const userController = new UsersController(User)
      return userController.post(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultToken)
        })
    })
    it('should return 400 when an error occurs', () => {
      const request = {
        username: 'admin2',
        password: 'admin'
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }

      response.status.withArgs(400).returns(response)
      User.find = sinon.stub()
      User.find.withArgs(request).rejects({message: 'Error'})

      const userController = new UsersController(User)

      return userController.post(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error')
        })
    })
  })
})