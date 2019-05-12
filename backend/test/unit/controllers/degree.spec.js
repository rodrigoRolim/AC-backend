import sinon from 'sinon'
import Course from '../../../src/models/degree'
import CourseController from '../../../src/controllers/degree'

describe('Management course', () => {
  const course = {
    body: {
      name: 'engenharia de software',
      professor: '56cb91bdc3464f14678934ca'
    }
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
        body: {
          name: 'engenharia de software',
          professor: '56cb91bdc3464f14678934ca'
        }
      }
      const response = {
        send: sinon.spy()
      }
      Course.create = sinon.stub()
      Course.create.withArgs(course.body).resolves('success')

      const courseController = new CourseController(Course)
      return courseController.createDegree(request, response).then(() => {
        sinon.assert.calledWith(response.send, 'success')
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
  describe('when deleting a graduation', () => {
    it('should return an confirmation that it was deleted', () => {
      const request = {
        body: {
          _id: '5cd76713d7d9ed1ce4e7a270'
        }
      }
      const response = {
        send: sinon.spy()
      }
      Course.deleteOne = sinon.stub()
      Course.deleteOne.withArgs({ _id: request.body._id }).resolves('removed with success')

      const courseController = new CourseController(Course)
      return courseController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(reponse.send, 'removed with success')
        })
    })
  })
})
