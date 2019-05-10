import sinon from 'sinon'
import Course from '../../../src/models/degree'
import CourseController from '../../../src/controllers/degree'

describe('Management course', () => {
  const course = {
    name: 'engenharia de software',
    professor: '56cb91bdc3464f14678934ca'
  }
  const listDegree = [
    {
      name: 'engenharia de software',
      professor: '56cb91bdc3464f14678934ca'
    }
  ]
  describe('when adding course', () => {
    it('should save a course into the database', () => {
      const request = {
        name: 'engenharia de software',
        professor: '56cb91bdc3464f14678934ca'
      }
      const response = {
        send: sinon.spy()
      }
      Course.create = sinon.stub()
      Course.create.withArgs(course).resolves('success')

      const courseController = new CourseController(Course)
      return courseController.createDegree(request, response).then(() => {
        sinon.assert.calledWith(response.send, 'success')
      })
    })
    it('should return 400 when an error occurs', () => {
      const request = null
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(400).returns(response)
      Course.create = sinon.stub()
      Course.create.withArgs(request).rejects({ message: 'Error' })

      const courseController = new CourseController(Course)
      return courseController.createDegree(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error')
        })
    })
  })
  describe('when reading all the graduations', () => {
    it('should return all the graduations', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }
      Course.find = sinon.stub()
      Course.find.withArgs({}).resolves(listDegree)

      const courseController = new CourseController(Course)
      return courseController.readAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, listDegree)
      })
    })
  })
})
