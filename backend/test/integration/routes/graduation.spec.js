import Graduation from "../../../src/models/graduation";
import jwt from 'jsonwebtoken'

describe('Routes: Graduation', () => {
  let request
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultId = '5cd60a0312c3e687ea34667f'
  const defaultGraduation = {
    _id: '5cd60a0312c3e687ea34667f',
    __v: 0,
    name: 'engenharia de software',
    department: '5cd5b4d3939ac63f4957dce7'
  }
  const listGraduations = {
    _id: '56cb91bdc3464f14678934ca',
    __v: 0,
    name: 'engenharia da computação',
    department: '5cd5b4d3939ac63f4957dce7'
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    let graduation =  new Graduation(listGraduations)
    Graduation.deleteMany({})
    return graduation.save()
  })

  afterEach(() => Graduation.deleteMany({}))
  
  describe('POST /admin/home', () => {
    it('should return added last graduation', done => {
      request
      .post('/graduation/admin')
      .set('authorization', token)
      .send(defaultGraduation)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        done(err)
      })
    })
  })
  describe('GET /admin/home', () => {
    it('should return list of graduations', done => {
      request
      .get('/graduation/admin')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql([listGraduations])
        done(err)
      })
    })
  })
  describe('DELETE /admin/home', () => {
    it('should return message of removed with success', done => {
      request
      .del(`/graduation/admin/${listGraduations._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql({ message: 'removed with success' })
        done(err)
      })
    })
  })
  describe('PUT /admin/home', () => {
    it('should return graduation updated recently', done => {
      request
      .put(`/graduation/admin/${listGraduations._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        done(err)
      })
    })
  })
})