
class AdminController {
  constructor (User, jwt) {
    this.User = User
    this.jwt = jwt
  }
  post(req, res) {
    
    const username = req.body.username
    const password = req.body.password

    return this.User.findOne({ username: username })
      .then(user => {
        if (password == user.password) {
          const _id = user._id
          let token = this.jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 86400
          })
          res.status(201).send({ access: { token: token, auth: true, tag: 0 }, user: user })
        } else {
          res.status(201).send({ auth: false })
        }
       
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default AdminController
