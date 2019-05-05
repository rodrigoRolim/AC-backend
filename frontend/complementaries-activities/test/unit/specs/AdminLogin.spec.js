import Vue from 'vue'
import { mount } from 'avoriaz'
import AdminLogin from '@/components/AdminLogin'

describe('Admin.vue', () => {
  it('should authenticantion admin user', done => {
    const expectedResponse = [{
      token: 'token-01',
      msg: 'success'
    }]
    const adminLogin = mount(AdminLogin)
    adminLogin.vm.login = function () {
     return expectedResponse
    }
    adminLogin.vm.login()
    expect(adminLogin.vm.login()).to.equal(expectedResponse)
    done()
  })
  it('should acess account of admin', () => {
    
  })
})
