import Course from "../../../src/models/course";

describe('Routes: Courses', () => {
  let request
  const defaultCourse = {
    name: 'engenharia de software',
    professor: '5cd5b4d3939ac63f4957dce7'
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    const course = new Course(defaultCourse)
    course._id = '5cd5b4c5509ac6e53a27ff11'
    Course.deleteMany({})
    return course.save()
  })
  afterEach(() => {
    Course.deleteMany({})
  })
  describe('POST /admin/home', () => {
    it('should return added last course', done => {
      request
      .post('/courses/admin/home')
      .send(defaultCourse)
      .end((err, res) => {
        expect(res.body).to.be.equal(defaultCourse)
      })
    })
  })
})