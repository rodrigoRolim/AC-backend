import sinon from 'sinon'
import Group from '../../../src/models/group'
import GroupItemsController from '../../../src/controllers/groupitem'

describe('controller: groups and items', () => {
  const defaultItem = {
    __v: 0,
    _id: '5cdb31b01872e0c67bb54ed9',
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
    description: 'group description',
    item: []
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
  describe('addItem() group', () => {
    it('should return status 201', () => {
      const request = {
        body: defaultItem,
        params: {
          id: defaultGroup.id
        }
      }
      const { params: { id } } = request
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
      Group.findByIdAndUpdate = sinon.stub()
      Group.findByIdAndUpdate.withArgs(id, { $push: { items: defaultItem }}).resolves(defaultGroupWithItems)

      const groupItemsController = new GroupItemsController(Group)
      return groupItemsController.addItem(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultGroupWithItems)
        })
    })
    context('when an error occurs', () => {
      it('should return 400', () => {
        const request = {
          body: defaultItem,
          params: {
            id: defaultGroup.id
          }
        }
        const { params: { id } } = request
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }
        response.status.withArgs(400).returns(response)
        Group.findByIdAndUpdate = sinon.stub()
        Group.findByIdAndUpdate.withArgs(id, { $push: { items: defaultItem }}).rejects({message: 'Error'})
  
        const groupItemsController = new GroupItemsController(Group)
        return groupItemsController.addItem(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('getAll() groups', () => {
    it('should return list of groups', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      };
      Group.find = sinon.stub();

      Group.find.withArgs({}).resolves([defaultGroup]);

      const groupItemsController = new GroupItemsController(Group)

      return groupItemsController.getAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultGroup]);
        });
    })
    context('when an error occurs', () => {
      it('should return status 400', () => {
        const request = {}
        const response = {
          send: sinon.spy()
        }

        Group.find = sinon.stub()
        Group.find.withArgs({}).rejects({message: 'Error'})

        const groupItemsController = new GroupItemsController(Group)

        return groupItemsController.getAll(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error')
          })
      })
    })
  })
  describe('delete() group', () => {
    it('should respond with 204 when the group has been deleted', () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        sendStatus: sinon.spy()
      };

      class fakeGroup {
        static remove() {}
      }

      const removeStub = sinon.stub(fakeGroup, 'remove');

      removeStub.withArgs({ _id: fakeId }).resolves([1]);

      const groupItemsController = new GroupItemsController(fakeGroup);

      return groupItemsController.remove(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 204);
        })
    })
  })
})

