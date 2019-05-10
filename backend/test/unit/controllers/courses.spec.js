import sinon from 'sinon'
import Course from '../../../src/models/course'
import CourseController from '../../../src/controllers/course'

describe('Management course', () => {
  const course = {
    name: 'engenharia de software'
  }
  describe('when adding course', () => {
    it('should save a course into the database', () => {
      const request = {
        name: 'engenharia de software'
      }
      const response = {
        send: sinon.spy()
      }
      Course.create = sinon.stub()
      Course.create.withArgs(course).resolves(course)

      const courseController = new CourseController(Course)
      return courseController.save(request, response).then(() => {
        sinon.assert.calledWith(response.send, course)
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
      return courseController.save(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error')
        })
    })
  })
  
})
