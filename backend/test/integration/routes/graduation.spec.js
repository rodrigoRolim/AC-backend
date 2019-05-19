import Graduation from "../../../src/models/graduation";
import jwt from 'jsonwebtoken'

describe('Routes: Degrees', () => {
  let request
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultDegree = {
    body: {
      _id: '5cd5b8b352e7a721c141a2e9',
      __v: 0,
      name: 'engenharia de software',
      professor: '5cd5b4d3939ac63f4957dce7'
    }
  }
  const listDegree = {
    _id: '5cd60a0312c3e687ea34667f',
    __v: 0,
    name: 'engenharia de software',
    professor: '5cd5b4d3939ac63f4957dce7'
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    let degree =  new Graduation(listDegree)
    Graduation.deleteMany({})
    return degree.save()
  })

  afterEach(() => Graduation.deleteMany({}))
  
  describe('POST /admin/home', () => {
    it('should return added last degree', done => {
      request
      .post('/degrees/admin')
      .set('authorization', token)
      .send(defaultDegree)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body).to.be.eql({ auth: false, message: 'No token provided.' })
        done(err)
      })
    })
  })
  describe('GET /admin/home', () => {
    it('should return list of degrees', done => {
      request
      .get('/degrees/admin')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql({ auth: false, message: 'No token provided.' })
        done(err)
      })
    })
  })
  describe('DELETE /admin/home', () => {
    it('should return message of removed with success', done => {
      request
      .del(`/degrees/admin/${listDegree._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql({ auth: false, message: 'No token provided.' })
        done(err)
      })
    })
  })
  describe('PUT /admin/home', () => {
    it('should return degree updated recently', done => {
      request
      .put(`/degrees/admin/${listDegree._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql({ auth: false, message: 'No token provided.' })
        done(err)
      })
    })
  })
})