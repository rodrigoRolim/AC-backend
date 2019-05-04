describe('Routes: Authentication', () => {
  const defaultToken = {
    token: 'asdf10',
    msg: true
  }
  describe('POST /admin/login', () => {
    it('should return token for session admin user', done => {
      request
      .post('/users/admin/login')
      .end((err, res) => {
        expect(res.body[0]).to.eql(defaultToken)
        done(err)
      })
    })
  })
})