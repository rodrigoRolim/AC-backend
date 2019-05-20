import Student from "../../../src/models/student"
import jwt from 'jsonwebtoken'

describe('Route: Student', () => {
  let request
  const defaultId = '56cb91bdc3464f14678934ca'
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const customId = '5ce1b5aaf14a857fd993a364'
  const defaultStudent = {
    ra: 'a12345',
    name: 'name student',
    email: 'name@mail',
    graduation: 'graduation description',
    password: '12345'
  }
  const defaultNewStudent = {
    ra: 'a12346',
    name: 'name student again',
    email: 'nameagain@mail',
    graduation: 'graduation description again',
    password: '12345'
  }
  const expectedSaveStudent = {
    _id: customId,
    ra: 'a12346',
    name: 'name student again',
    email: 'nameagain@mail',
    graduation: 'graduation description again',
    group_one: 0, 
    group_two: 0, 
    group_three: 0, 
    total: 0
  }
 
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    const student = new Student(defaultStudent)
    student._id = '56cb91bdc3464f14678934ca'
    return Student.remove({})
      .then(() => student.save())
  })

  afterEach(() => Student.remove({}))

  describe('POST /student/add', () => {
    
    context('when posting a new student', () => {
      it('should return a new student with status code 201', done => {
    
        const newStudent = Object.assign({}, 
          { __v: 0, _id: customId }, defaultNewStudent)

        request
        .post('/student/add')
        .send(newStudent)
        .end((err, res) => {
          expect(res.statusCode).to.eql(201)
          expect(res.body).to.eql(expectedSaveStudent)
          done(err)
        })
      })
    })
  })
  describe('POST /student/login', () => {
    context('when trying to login student', () =>{
      it('should return token of authorization', done => {
        const requestStudent = {
          ra: 'a12345',
          password: '12345'
        }
        request
        .post('/student/login')
        .send(requestStudent)
        .end((err, res) => {
          expect(res.body.auth).to.true
          done(err)
        })
      })
    })
  })
})