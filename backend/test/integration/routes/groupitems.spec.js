import Group from '../../../src/models/group'

describe('Management groups', () => {
  let request
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultItem = {
    __v: 0,
    _id: '5cdb31b01872e0c67bb54ed9',
    order: 1,
    description: 'item description'
  }
  const defaultGroup = {
    name: 'Default group',
    description: 'group description',
    item: []
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    const group = new Group(defaultGroup)
    group._id = '56cb91bdc3464f14678934ca'
    return Group.deleteMany({})
      .then(() => group.save())
  })

  afterEach(() => Group.deleteMany({}))

  describe('PUT  group/admin/:id', () => {
    context('when add a item in group', () => {
      it('should added new item in group and return 201', done => {
        request
        .put(`/group/admin/${defaultId}`)
        .send(defaultItem)
        .end((err, res) => {
          expect(res.status).to.eql(201)
          done(err)
        })
      })
    })
  })
})