class Auth {
  constructor(compare, jwt) {
    this.compare = compare
    this.jwt = jwt
  }
  authorization(password, user) {
    return this.compare(password, user.password)
      .then((resp) => {
        if (resp) {

          return this.jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400
          })
        }
        throw new Error('No authorization')
      })
  }
}

export default Auth