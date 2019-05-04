class UsersController {

  post(req, res) {
    return res.send([{
      token: 'asdf10',
      msg: true
    }])
  }
}

export default UsersController