import jwt from 'jsonwebtoken'

export default {
  verifyJWT: (req, res, next) => {

    let token = req.headers['authorization']
 
    if (!token) {
      res.status(403).send({ auth: false, message: 'No token provided.' })
      return next()
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(500).send({ auth: false, message: 'failed to authenticate token.' })
        next(err)
      }
      // req['context']['userId'] = decoded.id
      req.userId = decoded.id
      next()
    })
  }
}
