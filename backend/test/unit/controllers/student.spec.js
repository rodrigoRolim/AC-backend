import sinon from 'sinon'
import StudentController from '../../../src/controllers/student'
import Student from  '../../../src/models/student'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

describe('Management student', () => {
  const defaultStudent = {
    _id: '12345',
    ra: 'a12345',
    name: 'Student',
    email: 'student@mail',
    password: '12345',
    graduation: 'engenharia',
    department: 'id-department',
    user_type: 'aluno',
    situation: 'student situation'
  }
  const defaultRequest = {
    params: {}
  }
  describe('adding a student: create ()', () => {
    it('should adding the student into database', () => {
      const request = Object.assign({}, { body: defaultStudent }, defaultRequest)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      class fakeStudent {
        save () {}
      }

      sinon.stub(fakeStudent.prototype, 'save').withArgs().resolves()
      response.status.withArgs(201).returns(response)

      const studentController = new StudentController(fakeStudent)

      return studentController.create(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send)
        })
    })
    context('when an error occurs', () => {
      it('should return code 400', () => {
        const request = Object.assign({}, { body: defaultStudent }, defaultRequest)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeStudent {
          save () {}
        }
        sinon.stub(fakeStudent.prototype, 'save').withArgs().rejects({ message: 'Error' })
        response.status.withArgs(400).returns(response)

        const studentController = new StudentController(fakeStudent)

        return studentController.create(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('login student', () => {
    it('should return token of authorization', () => {
      const expectedResponse = {
        token: 'hashToken',
        auth: true,
        user: defaultStudent 
      }
      const request = {
        body: {
          ra: 'a123456',
          password: '12345'
        }
      }
      bcrypt.compare = sinon.stub()
      bcrypt.compare.withArgs(request.body.password, '12345').resolves(true)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
      const _id = '12345'
      jwt.sign = sinon.stub()
      jwt.sign.withArgs({ _id }, process.env.SECRET , {
        expiresIn: 86400
      }).returns('hashToken')

      Student.findOne = sinon.stub()
      Student.findOne.withArgs({ ra: request.body.ra }).resolves(defaultStudent)

      const studentController = new StudentController(Student, jwt, bcrypt.compare)
      return studentController.login(request, response) 
        .then(() => {
          sinon.assert.calledWith(response.send, expectedResponse)
        })
    })
    context('when an error occurs', () => {
      it('should return code 400', () => {
        const request = {
          body: {
            ra: 'a123456',
            password: '12345'
          }
        }
        bcrypt.compare = sinon.stub()
        bcrypt.compare.withArgs(request.body.password, '12345').resolves(true)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        response.status.withArgs(400).returns(response)
        const _id = '12345'
        jwt.sign = sinon.stub()
        jwt.sign.withArgs({ _id }, process.env.SECRET , {
          expiresIn: 86400
        }).returns('hashToken')
  
        Student.findOne = sinon.stub()
        Student.findOne.withArgs({ ra: request.body.ra }).rejects({ message: 'Error' })
  
        const studentController = new StudentController(Student, jwt, bcrypt.compare)
        return studentController.login(request, response) 
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('readAllStudents(): read all students of the specified department', () => {
    it('should return all student of the speciefied department', () => {
      const fakeidDepartment = 'fake-id-department'
      const request = {
        params: {
          id: fakeidDepartment
        }
      }
      const response = {
        send: sinon.spy()
      }
      class fakeStudent {
        static aggregate () {}
      }

      const fakeStudentAggregateStub = sinon.stub(fakeStudent, 'aggregate')
      fakeStudentAggregateStub.withArgs([
        {
            "$match": {
                "department": request.params.id
                }
            },
            { 
                "$lookup": {
                    "localField": '_id', 
                    "from": 'documents', 
                    "foreignField": 'student', 
                    "as": "documents"
                }
            }, 
            {
                "$match": { 
                    "documents.sent": true 
                }
            }, 
            {
                "$project": {
                    "documents": 0
                }
            }
        ]).resolves([defaultStudent])

      const studentController = new StudentController(fakeStudent)
      
      return studentController.getStudentsOfDepartment(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultStudent])
        })
    })
    context('when an error occurs', () => {
      it('should return 400 as status code', () => {
        const fakeidDepartment = 'fake-id-department'
        const request = {
          params: {
            id: fakeidDepartment
          }
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeStudent {
          static aggregate () {}
        }
        
        response.status.withArgs(400).returns(response)

        const fakeStudentAggregateStub = sinon.stub(fakeStudent, 'aggregate')
        fakeStudentAggregateStub.withArgs([
          {
              "$match": {
                  "department": request.params.id
                  }
              },
              { 
                  "$lookup": {
                      "localField": '_id', 
                      "from": 'documents', 
                      "foreignField": 'student', 
                      "as": "documents"
                  }
              }, 
              {
                  "$match": { 
                      "documents.sent": true 
                  }
              }, 
              {
                  "$project": {
                      "documents": 0
                  }
              }
          ]).rejects({ message: 'Error' })
  
        const studentController = new StudentController(fakeStudent)
        
        return studentController.getStudentsOfDepartment(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('setSituation(): setting situation of student', () => {
    it('should return 200 as status code', () => {
      const fakeidstudent = 'fake-id-student'
      const newsituation = 'new situation'

      const request = Object.assign({}, { params: { id: fakeidstudent } }, { body: newsituation })
      const response = {
        sendStatus: sinon.spy()
      }
      
      class fakeStudent {
        static findOneAndUpdate () {}
      }
      const fakeStudentUpdateStub = sinon.stub(fakeStudent, 'findOneAndUpdate')
      fakeStudentUpdateStub.withArgs({ _id: fakeidstudent }, { $set:{ situation: request.body } }).resolves()
      const studentController = new StudentController(fakeStudent)

      return studentController.setSituation(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 200)
        })
    })
    context('when an error occurs', () => {
      it('should return 422 as status code', () => {
        const fakeidstudent = 'fake-id-student'
        const newsituation = 'new situation'
  
        const request = Object.assign({}, { params: { id: fakeidstudent } }, { body: newsituation })
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        
        response.status.withArgs(422).returns(response)

        class fakeStudent {
          static findOneAndUpdate () {}
        }
        const fakeStudentUpdateStub = sinon.stub(fakeStudent, 'findOneAndUpdate')
        fakeStudentUpdateStub.withArgs({ _id: fakeidstudent }, { $set:{ situation: request.body } }).rejects({ message: 'Error' })
        const studentController = new StudentController(fakeStudent)
  
        return studentController.setSituation(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('getSituation() getting situaition of student', () => {
    it('should return studend situation', () => {
      const fakeidstudent = 'fake-id-student'
      const situation = 'situation'

      const request = { params: { id: fakeidstudent } }
      const response = {
        send: sinon.spy()
      }
      
      class fakeStudent {
        static findOne () {}
      }
      const fakeStudentFindOneStub = sinon.stub(fakeStudent, 'findOne')
      fakeStudentFindOneStub.withArgs({ _id: fakeidstudent }).resolves(situation)
      const studentController = new StudentController(fakeStudent)

      return studentController.setSituation(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'situation')
        })
    })
    context('when an error occurs', () => {
      it('should return studend situation', () => {
        const fakeidstudent = 'fake-id-student'
        const situation = 'situation'
  
        const request = { params: { id: fakeidstudent } }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        
        class fakeStudent {
          static findOne () {}
        }
        response.status.withArgs(400).returns(response)
        const fakeStudentFindOneStub = sinon.stub(fakeStudent, 'findOne')
        fakeStudentFindOneStub.withArgs({ _id: fakeidstudent }).rejects({ message: 'Error' })
        const studentController = new StudentController(fakeStudent)
  
        return studentController.setSituation(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('launchAll (): launch students', () => {
    it('should update situation of studante to launched', () => {
      const ras = ['ra1', 'ra2', 'etc']
      const request = { body: ras }
      const response = {
        sendStatus: sinon.spy()
      }
      class fakeStudent {
        static update () {}
      }
      const updateStub = sinon.stub(fakeStudent, 'update')
      updateStub.withArgs({ ra: { $in: ras } }, { $set: { situation: 'launched' } }, { multi: true }).resolves()

      const studentController = new StudentController(fakeStudent)

      return studentController.launchAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 200)
        })
    })
    context('when an error occurs', () => {
      it('should return 422 as status code', () => {
        const ras = ['ra1', 'ra2', 'etc']
        const request = { body: { ras } }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        class fakeStudent {
          static update () {}
        }

        response.status.withArgs(422).returns(response)
        const updateStub = sinon.stub(fakeStudent, 'update')
        updateStub.withArgs({ ra: { $in: ras } }, { $set: { situation: 'launched' } }, { multi: true }).rejects({ message: 'Erro' })

        const studentController = new StudentController(fakeStudent)

        return studentController.launchAll(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
})