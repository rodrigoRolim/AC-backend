import jwt from 'jsonwebtoken'
class UsersController {
  constructor(User) {
    this.User = User
  }
  post(req, res) {
  
    const username = req.body.username
    const password = req.body.admin
    return this.User.find({username: username})
      .then(user => {
        console.log(user)
        if(password == user.password) {
          const id = user._id
          let token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300
          })
          
          res.status(200).send({ token: token, auth: true })
        }
        res.status(500).send({ msg: 'login inválido', auth: false, user: user})
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default UsersController