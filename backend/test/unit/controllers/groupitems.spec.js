import sinon from 'sinon'
import Group from '../../../src/models/group'
import GroupItemsController from '../../../src/controllers/groupitem'

describe('controller: groups and items', () => {
  const defaultItem = {
    order: 1,
    description: 'item description'
  }
  const defaultGroupWithItems = [{
    __v: 0,
    _id: "56cb91bdc3464f14678934ca",
    name: 'Default group',
    description: 'group description',
    items: [defaultItem]
  }];
  const defaultGroup = {
    __v: 0,
    _id: "56cb91bdc3464f14678934ca",
    name: 'Default group',
    description: 'group description'
  }
  const defaultRequest = {
    params: {}
  }
  describe('create() group', () => {
    it('should call send with a new group', () => {
      const requestWithBody = Object.assign({}, { body: defaultGroup }, defaultRequest)
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
      Group.create = sinon.stub()
      Group.create.withArgs(requestWithBody.body).resolves(defaultGroup)

      const groupItemsController = new GroupItemsController(Group)
      return groupItemsController.createGroup(requestWithBody, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultGroup)
        })
    })
    context('when an error occurs', () => {
      it('should return 400', () => {
        const requestWithBody = Object.assign({}, { body: defaultGroup }, defaultRequest)
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        response.status.withArgs(400).returns(response)
        Group.create = sinon.stub()
        Group.create.withArgs(requestWithBody.body).rejects({message: 'Error'})

        const groupItemsController = new GroupItemsController(Group)
        return groupItemsController.createGroup(requestWithBody, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
})

