
class UsersController {
  constructor (User, jwt) {
    this.User = User
    this.jwt = jwt
  }
  post(req, res) {
    
   
    const username = req.username
    const password = req.password
  
    return this.User.find({username: username})
      .then(user => {
        
        if(password == user.password) {
          
          const id = user._id
          console.log(this.jwt)
          let token = this.jwt.sign({ id }, 'batman', {
            expiresIn: 300
          })
          console.log('veio aqui')
          res.send({ token: token, auth: true })
        }
        res.send({ auth: false })
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default UsersController