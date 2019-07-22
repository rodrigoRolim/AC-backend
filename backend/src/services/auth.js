class Auth {
  constructor(compare, jwt) {
    this.compare = compare
    this.jwt = jwt
  }
  authorization(password, student) {
    return this.compare(password, student.password)
      .then((resp) => {
        if (resp) {
          return this.jwt({ id: student.id }, process.env.SECRET, {
            expiresIn: 86400
          })
        }
        throw new Error('No authorization')
      })
  }
}

export default Auth