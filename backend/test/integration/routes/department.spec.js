import Department from "../../../src/models/department";
import jwt from 'jsonwebtoken'

describe('Routes: Degrees', () => {
  let request
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultId = '5cd60a0312c3e687ea34667f'
  const defaultDepartment = {
    _id: '5cd60a0312c3e687ea34667f',
    __v: 0,
    name: 'DACOMP',
  }
  const expectedGraduation = {
    _id: '5cd60a0312c3e687ea34667f',
    __v: 0,
    name: 'DACOMP',
  }
  const listDepartment = {
    _id: '56cb91bdc3464f14678934ca',
    __v: 0,
    name: 'DACOMP',
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    let department =  new Department(listDepartment)
    Department.deleteMany({})
    return department.save()
  })

  afterEach(() => Department.deleteMany({}))
  
  describe('POST /admin/department', () => {
    it('should return added last department', done => {
      request
      .post('/department/admin')
      .set('authorization', token)
      .send(defaultDepartment)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        done(err)
      })
    })
  })
  describe('GET /admin/department', () => {
    it('should return list of department', done => {
      request
      .get('/department/admin')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql([listDepartment])
        done(err)
      })
    })
  })
  describe('DELETE /admin/department', () => {
    it('should return message of removed with success', done => {
      request
      .del(`/department/admin/${listDepartment._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.eql({ message: 'removed with success' })
        done(err)
      })
    })
  })
  describe('PUT /admin/department', () => {
    it('should return department updated recently', done => {
      request
      .put(`/department/admin/${listDepartment._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        done(err)
      })
    })
  })
})