import sinon from 'sinon'
import Graduation from '../../../src/models/graduation'
import GraduationController from '../../../src/controllers/graduation'

describe('Controller: graduation', () => {
  const graduation = {
    body: {
      name: 'engenharia de software',
      professor: '56cb91bdc3464f14678934ca'
    }
  }
  const listGraduation = [
    {
      name: 'engenharia de software',
      professor: '56cb91bdc3464f14678934ca'
    }
  ]
  describe('when adding graduation', () => {
    it('should save a graduation into the database', () => {
      const request = {
        body: {
          name: 'engenharia de software',
          professor: '56cb91bdc3464f14678934ca'
        }
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }
      response.status.withArgs(201).returns(response)
      Graduation.create = sinon.stub()
      Graduation.create.withArgs(graduation.body).resolves('success')

      const graduationController = new GraduationController(Graduation)
      return graduationController.create(request, response).then(() => {
        sinon.assert.calledWith(response.send, 'success')
      })
    })
  })
  describe('when reading all the graduations', () => {
    it('should return all the graduations', () => {
      const request = {}
      const response = {
        send: sinon.spy()
      }
      Graduation.find = sinon.stub()
      Graduation.find.withArgs({}).resolves(listGraduation)

      const graduationController = new GraduationController(Graduation)
      return graduationController.readAll(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, listGraduation)
      })
    })
  })
  describe('when deleting a graduation', () => {
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
      Graduation.deleteOne = sinon.stub()
      Graduation.deleteOne.withArgs({ _id: id}).resolves('removed with success')

      const graduationController = new GraduationController(Graduation)
      return graduationController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, {message: 'removed with success'})
        })
    })
  }),
  describe('when editing a graduation', () => {
    it('should return updated object', () => {
      const request = {
        body: {
          name: 'engenharia da computação'
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
      Graduation.update = sinon.stub()
      Graduation.update.withArgs({ _id: id}, request.body).resolves({ ok: 1 })
  
      const graduationController = new GraduationController(Graduation)
      return graduationController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { ok: 1 })
        })
    })
  })
})
