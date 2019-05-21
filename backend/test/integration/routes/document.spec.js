import Document from '../../../src/models/document'
import jwt from 'jsonwebtoken'

describe('Router: document', () => {
  let request
  const defaultDocument = {
    name: 'document name',
    score: 10,
    path: '/path/to/document',
    evaluation: false,
    sent: false,
    aproved: false,
    course_name: 'graduation name',
    group: 'name group',
    item: 'name item',
    student: '5ce30224b1bcd6cda1addc58'
  }
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  describe('POST /student/document/add', () => {
    
  })
})