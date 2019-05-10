import Degree from "../../../src/models/degree";

describe('Routes: Degrees', () => {
  let request
  const returnDegree = {
    _id: '5cd5b8b352e7a721c141a2e9',
    __v: 0,
    name: 'engenharia de software',
    professor: '5cd5b4d3939ac63f4957dce7'
  }
  const defaultDegree = {
    _id: '5cd5b8b352e7a721c141a2e9',
    __v: 0,
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
    Degree.deleteMany({})
  })

  afterEach(() => Degree.deleteMany({}))
  
  describe('POST /admin/home', () => {
    it('should return added last degree', done => {
      request
      .post('/degrees/admin/home')
      .send(defaultDegree)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body).to.be.eql(returnDegree)
        done(err)
      })
    })
  })
})