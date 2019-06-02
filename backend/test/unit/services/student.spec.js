import StudentService from '../../../src/services/student'
import sinon from 'sinon'

describe('StudentService: turnStudentToSender ()', () => {
  context('when update documents to all sents', () => {
    it('should turn student a sender and return true', () => {
      const fakeidstudent = 'fake-id-student'
      const request = {
        params: {
          id: fakeidstudent
        }
      }
      class fakeStudent {
        static findOneAndUpdate () {}
      }
      
      const studenServiceStub = sinon.stub(fakeStudent, 'findOneAndUpdate')
      studenServiceStub.withArgs({ _id: fakeidstudent }, { returnNewDocument: true }).returns([1])

      const studentService = new StudentService(fakeStudent)
      expect(studentService.turnSender(request)).to.be.true 
    })
  })
  context('when an error occurs', () => {
    it('should return false', () => {
      const fakeidstudent = 'fake-id-student'
      const request = {
        params: {
          id: fakeidstudent
        }
      }
      class fakeStudent {
        static findOneAndUpdate () {}
      }
      
      const studenServiceStub = sinon.stub(fakeStudent, 'findOneAndUpdate')
      studenServiceStub.withArgs({ _id: fakeidstudent }, { returnNewDocument: true }).returns([])

      const studentService = new StudentService(fakeStudent)
      expect(studentService.turnSender(request)).to.be.false 
    })
  })
})