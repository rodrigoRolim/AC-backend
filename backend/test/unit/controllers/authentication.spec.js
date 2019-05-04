import UsersController from '../../../src/controllers/users'
import sinon from 'sinon'

describe('Controllers: Users', () => {
  const defaultToken = {
    token: 'asdf10',
    msg: true
  }
  describe('post() users', () => {
    it('should return id session for admin user', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }
      
      const usersController = new UsersController()
      usersController.post(request, response)

      expect(response.send.called).to.be.true
      expect(reponse.send.calledWith(defaultToken)).to.be.true
    })
  })
})