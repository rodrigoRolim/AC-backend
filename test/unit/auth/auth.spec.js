import verify from './../../../src/auth'
import jwt from 'jsonwebtoken'
import sinon from 'sinon'

describe("verifyJWT", () => {
  const id = '5cd60a0312c3e687ea34667f'
  const jwtToken = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 86400
  })
  it('should verify a jwt token and call the next middleware', done => {
    
    const reqFake = {
      headers: {
        'authorization': jwtToken
      },
      user: { }
    }
    reqFake.user.id = id
    const resFake = {}
    verify.verifyJWT(reqFake, resFake, done, jwt)
  })
  it('should call the next middleware passing an error when the token validantion fails', done => {
    const reqFake = {
      headers: {
        'authorization': 'invalid token!'
      }
    }
    const resFake = {
      send: sinon.spy(),
      status: sinon.stub()
    }

    resFake.status.withArgs(500).returns(resFake)
    verify.verifyJWT(reqFake, resFake, err => {
      expect(err.message).to.eq('jwt malformed')
      done()
    })
  })
  it('should call next middleware if there is no token', done => {
    const reqFake = {
      headers: {}
    };
    const resFake = {
      send: sinon.spy(),
      status: sinon.stub()
    };
    resFake.status.withArgs(403).returns(resFake);
    verify.verifyJWT(reqFake, resFake, done);
  })
})