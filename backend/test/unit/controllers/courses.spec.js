

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
      Course.save.withArgs(entryCourse).resolves(returnCourse)

      const courseController = new CourseController(Course)

      return courseController.save(request, response)
        .then(() => {
          sinon.assert.calledWith(reponse.send, returnCourse)
        })
    })
  })
})