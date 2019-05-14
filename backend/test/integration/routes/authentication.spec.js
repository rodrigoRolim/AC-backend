import Admin from '../../../src/models/admin'

describe('Routes: Authentication', () => {
  let request

  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
    
  const defaultAdmin = {
    username: 'admin',
    password: 'admin',
    admin: true
  }
  
  beforeEach(() => {
    const user = new Admin(defaultAdmin)
    console.log(user)
    user._id = '56cb91bdc3464f14678934ca'
    Admin.deleteMany({})
      .then(() => user.save());
    // return user.save();
  })

  afterEach(() => Admin.deleteMany({}))
  
  describe('POST /admin/login', () => {
    it('should return token for session admin user', done => {
      request
      .post('/admin/login')
      .send(defaultAdmin)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body.auth).to.true
        expect(res.body.admin).to.true
        done(err)
      })
    })
  })
})