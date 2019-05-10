import jwt from 'jsonwebtoken'

class UsersController {
  constructor (User) {
    this.User = User
  }
  post(req, res) {
    
   
    const username = req.username
    const password = req.password
  
    return this.User.find({username: username})
      .then(user => {
        
        if(password == user.password) {
          
          const id = user._id
         
          let token = jwt.sign({ id }, 'batman', {
            expiresIn: 300
          })
        
          res.send({ auth: true })
        }
        res.send({ auth: false })
      })
      .catch(err => res.status(400).send(err.message))
  }
}

export default UsersController