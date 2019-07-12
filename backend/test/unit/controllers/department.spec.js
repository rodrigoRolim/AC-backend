import sinon from 'sinon'
import Department from '../../../src/models/department'
import DepartmentController from '../../../src/controllers/department'

describe('Management department', () => {
  const department = {
    body: {
      name: 'DACOMP',
    }
  }
  const listDepartment = [
    {
      name: 'DACOMP'
    }
  ]
  describe('when adding department', () => {
    it('should save a department into the database', () => {
      const request = {
        body: {
          name: 'DACOMP'
        }
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      class fakeDepartment {
        save () {}
      }
      response.status.withArgs(201).returns(response)
      sinon.stub(fakeDepartment.prototype, 'save').withArgs().resolves()
      
      const departmentController = new DepartmentController(fakeDepartment)
      return departmentController.create(request, response).then(() => {
        sinon.assert.calledWith(response.send)
      })
    })
  })
  describe('when reading all the departments', () => {
    it('should return all the departments', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }
      Department.find = sinon.stub()
      Department.find.withArgs({}).resolves(listDepartment)

      const departmentController = new DepartmentController(Department)
      return departmentController.readAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, listDepartment)
      })
    })
  })
  describe('when deleting a department', () => {
    it('should return an confirmation that it was deleted', () => {
      const request = {
        params: {
          id: '5cd76713d7d9ed1ce4e7a270'
        }
      }
      const response = {
        send: sinon.spy()
      }
      const { params : { id } } = request
      Department.deleteOne = sinon.stub()
      Department.deleteOne.withArgs({ _id: id}).resolves('removed with success')

      const departmentController = new DepartmentController(Department)
      return departmentController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, {message: 'removed with success'})
        })
    })
  }),
  describe('when editing a department', () => {
    it('should return updated object', () => {
      const request = {
        body: {
          name: 'DACOMP'
        },
        params: {
          id: '5cd76713d7d9ed1ce4e7a270'
        }
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      
      response.status.withArgs(201).returns(response)
      const { params : { id } } = request
      Department.update = sinon.stub()
      Department.update.withArgs({ _id: id}, request.body).resolves({ ok: 1 })
  
      const departmentController = new DepartmentController(Department)
      return departmentController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { ok: 1 })
        })
    })
  })
})