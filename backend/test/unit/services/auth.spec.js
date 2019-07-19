import sinon from 'sinon'
import Auth from '../../../src/services/auth'

describe('Middleware: auth. It is responsible for authorization token generate', () => {
  describe('function: authorization()', () => {
    
    const compare = sinon.stub()
    const password = 'real-password'
    let _id = 'fake-id'
    const student = Object.assign({}, { id: _id, password: 'encoded-password' })
    const jwt = sinon.stub()
    
    context('when trying access an account of user it is work!', () => {
      it('should return valid token', () => {
        const tokenEncrypted = 'tokenEncrypted'
        compare.withArgs(password, student.password).resolves(true)
        jwt.withArgs({ _id }, process.env.SECRET , {
          expiresIn: 86400
        }).returns(tokenEncrypted)
        let auth = new Auth(compare, jwt)
        auth.authorization = sinon.stub()
        auth.authorization.withArgs(password, student).returns(tokenEncrypted)
        
        expect(auth.authorization(password, student)).to.eq(tokenEncrypted)
       
      })
    })
    context('when an error occurs', () => {
      it('should throw error', () => {
        const message = 'No authorization'
        compare.withArgs(password, student.password).resolves(false)
        let auth = new Auth(compare, jwt)
        auth.authorization = sinon.stub()
        auth.authorization.withArgs(password, student).throws('No authorization')
        //console.log(auth.authorization(password, student))
        expect(() => auth.authorization(password, student)).to.throw()
      })
    })
  })
})