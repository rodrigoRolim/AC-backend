
class AdminController {
  constructor (User, jwt) {
    this.User = User
    this.jwt = jwt
  }
  post(req, res) {
    
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    console.log(password)
    return this.User.findOne({ username: username })
      .then(user => {

        if (password == user.password) {
          console.log('oi')
          const _id = user._id
          let token = this.jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 86400
          })
          res.send({ token: token, auth: true, admin: true })
        }
        res.send({ auth: false })
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default AdminController
