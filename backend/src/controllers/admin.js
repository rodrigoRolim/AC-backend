
class AdminController {
  constructor (User, jwt) {
    this.User = User
    this.jwt = jwt
  }
  post(req, res) {

    return this.User.findOne({ username: req.body.username })
      .then(user => {
        if (req.body.password == user.password) {
          const _id = user._id
          let token = this.jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 86400
          })
          res.status(201).send({ token: token, auth: true, user: user })
        } else {
          res.status(201).send({ auth: false })
        }
       
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default AdminController
