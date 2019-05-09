import sinon from 'sinon'
import Course from '../../../src/models/course'
import CourseController from '../../../src/controllers/course'

describe('Management course', () => {
  const entryCourse = {
    name: 'engenharia de software'
  }
  const returnCourse = {
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
      Course.save = sinon.stub()
     // Course.save.withArgs(entryCourse).resolves(returnCourse)

      const courseController = new CourseController(Course)
      courseController.save(request, response)
      expect(response.send.called).to.be.true
      expect(response.send.calledWith(returnCourse)).to.be.true
      
    })
  })
})