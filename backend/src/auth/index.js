import jwt from 'jsonwebtoken'

export default {
  verifyJWT: (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'failed to authenticate token.' })
      req.userId = decoded.id
      next()
    })
  }
}
