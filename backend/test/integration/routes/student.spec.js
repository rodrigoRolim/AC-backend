import Student from "../../../src/models/student"
import Document from "../../../src/models/document"
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
    graduation: 'engenharia de software',
    type_user: 'aluno',
    situation: 'debting',
    department: '5cf01570ec365a1bcccc7b58',
    password: '12345'
  }
  const defaultNewStudent = {
    ra: 'a12346',
    name: 'name student again',
    email: 'nameagain@mail',
    graduation: 'engenharia de software',
    type_user: 'aluno',
    department: '5cf01570ec365a1bcccc7b58',
    password: '12345',
    situation: 'debting',
  }
  const expectedSaveStudent = {
    _id: customId,
    ra: 'a12346',
    name: 'name student again',
    email: 'nameagain@mail',
    department: '5cf01570ec365a1bcccc7b58',
    type_user: 'aluno',
    graduation: 'engenharia de software',
    situation: 'debting'
  }
  // salvá-lo também para o teste dá certo
  const defaultDocument = {
    name: 'document name',
    score: 10,
    path: 'test2.pdf',
    evaluation: 'none',
    sent: true,
    group: '5d0d17e9bd5e3c152988a4f3',
    item: '5d0d17e9bd5e3c152988a4f3',
    student: defaultId
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
  after(() => process.exit(0))
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
  describe('POST /student/launch/all', () => {
    context('when launching approved students', () =>{
      it('should return 200 as status code', done => {
        const ras = ['a12345']
        request
          .post('/student/launch/all')
          .set('authorization', token)
          .send(ras)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
  describe('GET /student/all/department/:id', () => {
    context('when reading all students of especified department', () => {
      it('should return all students from especified department', done => {
        const studentResp = {
          ra: 'a12345',
          name: 'name student',
          email: 'name@mail',
          graduation: 'engenharia de software',
          type_user: 'aluno',
          situation: 'debting',
          department: '5cf01570ec365a1bcccc7b58'
        }
        let document = new Document(defaultDocument)
        document.save()

        const idDepartment = '5cf01570ec365a1bcccc7b58'
        const defautlStudentResponse = Object.assign({}, { _id: '56cb91bdc3464f14678934ca', __v: 0 },
          studentResp)
        request
          .get(`/student/all/department/${idDepartment}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.eql([defautlStudentResponse])
            done(err)
          })
      })
    })
  })
  describe('GET /student/situation/:id', () => {
    context('when getting situation of student', () => {
      it('should return situation of student', done => {
        
        const idStudent = '56cb91bdc3464f14678934ca'

        request
          .get(`/student/situation/${idStudent}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body.situation).to.eql(defaultStudent.situation)
            done(err)
          })
      })
    })
  })
  describe('GET /student/:id', () => {
    context('when getting student by id', () => {
      it('should return one student', done => {
        const studentResp = {
          ra: 'a12345',
          name: 'name student',
          email: 'name@mail',
          graduation: 'engenharia de software',
          type_user: 'aluno',
          situation: 'debting',
          department: '5cf01570ec365a1bcccc7b58'
        }
        const defautlStudentResponse = Object.assign({}, { _id: '56cb91bdc3464f14678934ca' },
        studentResp)
        const idStudent = '56cb91bdc3464f14678934ca'

        request
          .get(`/student/${idStudent}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.eql([defautlStudentResponse])
            done(err)
          })
      })
    })
  })
  describe('PUT /student/update/situation/:id', () => {
    context('when updating situation of student from debting for approved', () => {
      it('should return 200 as status code', done => {
        request
          .put(`/student/update/situation/${defaultId }`)
          .set('authorization', token)
          .send({ situation: 'approved'})
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
  describe('PUT /student/update/:id', () => {
    context('when updating situation of student from debting for approved', () => {
      it('should return 200 as status code', done => {
        request
          .put(`/student/update/${defaultId }`)
          .set('authorization', token)
          .send(defaultNewStudent)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
  describe('DELETE /student/delete/:id', () => {
    context('when deleting student', () => {
      it('should deleting student and return 204 as status code', done => {
        request
          .delete(`/student/delete/${defaultId }`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.status).to.eql(204)
            done(err)
          })
      })
    })
  })
})