class UsersController {
  constructor(User) {
    this.User = User
  }
  post(req, res) {

    const username = req.username
    const password = req.password
    
    return this.User.find({username: username, password: password})
      .then(token => res.send(token))
      .catch(err => res.status(400).send(err.message))
  }
}

export default UsersController