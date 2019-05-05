import Vue from 'vue'
import { mount } from 'avoriaz'
import AdminLogin from '@/components/AdminLogin'

describe('Admin.vue', () => {
  it('should authenticantion admin user', done => {

    const adminLogin = mount(AdminLogin)
    
    adminLogin.vm.login = function () {
      
      let promise = new Promise((resolve) => {
        resolve({auth: true})
      })
      
      return promise
    }

    adminLogin.vm.login().then(res => {
      
      expecte(res.auth).to.be.true
    
    })
    
    done()
  })
})
