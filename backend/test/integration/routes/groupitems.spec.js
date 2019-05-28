import Group from '../../../src/models/group'
import jwt from 'jsonwebtoken'

describe('Management groups', () => {

  let request
  const defaultId = '56cb91bdc3464f14678934ca'
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  const defaultItem = {
    __v: 0,
    _id: '5cdb31b01872e0c67bb54ed9',
    order: 1,
    description: 'item description'
  }
  const defaultGroupWithItem = {
    name: 'Default group',
    description: 'group description',
    items: []
  }
  const defaultGroupWithItemCreate = {
    __v: 0,
    _id: '56cb91bdc3464f14678934ca',
    name: 'Default group',
    description: 'group description',
    items: []
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  beforeEach(() => {
    const group = new Group(defaultGroupWithItem)
    group._id = '56cb91bdc3464f14678934ca'
    return Group.deleteMany({})
      .then(() => group.save())
  })

  afterEach(() => Group.deleteMany({}))
  describe('POST /group/add', () => {
    context('when add a new group', () => {
      it('should added new item and return 201 and new group', done => {
        request
        .post('/group/add')
        .set('authorization', token)
        .send(defaultGroupWithItem)
        .end((err, res) => {
          expect(res.status).to.eql(201)
          done(err)
        })
      })
    })
  })
  describe('PUT /group/update/:id', () => {
    context('when updating a group', () => {
      it('should return 200 when the group has been update', done => {
        request
          .put(`/group/update/${defaultId}`)
          .set('authorization', token)
          .send(defaultGroupWithItem)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
  describe('PUT  group/add/item/:id', () => {
    context('when add a item in group', () => {
      it('should added new item in group and return 201', done => {
        request
        .put(`/group/add/item/${defaultId}`)
        .set('authorization', token)
        .send(defaultItem)
        .end((err, res) => {
          expect(res.status).to.eql(201)
          done(err)
        })
      })
    })
  })
  describe('GET /group/all', () => {
    context('when get all groups', () => {
      it('should return all groups', done => {
        request
        .get('/group/all')
        .set(`authorization`, token)
        .end((err, res) => {
          expect(res.body).to.eql([defaultGroupWithItemCreate])
          done(err)
        })
      })
    })
  })
  describe('DELETE /group/delete/:id', () => {
    context('when deleting a group', () => {
      it('should delete a group and return 204 as status code', done => {

        request
          .delete(`/group/delete/${defaultId}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.status).to.eql(204)
            done(err)
          })
      })
    })
  })
  describe('PUT  group/update/item/:id', () => {
    context('when uptade a item from a group', () => {
      it('should upadating item in group and return 200', done => {
        request
        .put(`/group/update/item/${defaultId}`)
        .set('authorization', token)
        .send(defaultItem)
        .end((err, res) => {
          expect(res.status).to.eql(200)
          done(err)
        })
      })
    })
  })
  describe('PUT grou/delete/item/:id', () => {
    context('when remove a item from a group', () => {
      it('should removing a item in group and return 204', done => {
        request
          .put(`/group/delete/item/${defaultId}`)
          .set('authorization', token)
          .send(defaultItem)
          .end((err, res) => {
            expect(res.status).to.eql(204)
            done(err)
          })
      })
    })
  })
})