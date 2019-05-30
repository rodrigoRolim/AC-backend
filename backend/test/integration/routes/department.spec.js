import Department from "../../../src/models/department";
import jwt from 'jsonwebtoken'

describe('Routes: Department', () => {
  let request
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultId = '5cd60a0312c3e687ea34667f'
  const defaultDepartment = {
    name: 'department name',
  }
  const listDepartment = {
    _id: '56cb91bdc3464f14678934ca',
    __v: 0,
    name: 'department name',
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    let department =  new Department(defaultDepartment)
    department._id = '56cb91bdc3464f14678934ca'
    Department.deleteMany({})
    return department.save()
  })

  afterEach(() => Department.deleteMany({}))
  
  describe('POST /admin/department', () => {
    it('should return added last department', done => {
      const newDepartment = Object.assign({}, { _id: defaultId, __v: 0}, { name: 'DAEL' })
      const expectedDepartment = {
        _id: defaultId,
        __v: 0,
        name: 'DAEL',
      }
      request
      .post('/department/add')
      .set('authorization', token)
      .send(newDepartment)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        expect(res.body).to.be.eql(expectedDepartment)
        done(err)
      })
    })
  })
  describe('GET /admin/department', () => {
    it('should return list of department', done => {
      request
      .get('/department/all')
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
      .del(`/department/delete/${listDepartment._id}`)
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
      .put(`/department/update/${listDepartment._id}`)
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.eql(201)
        done(err)
      })
    })
  })
})