const jwt = require('jwt-simple')
const moment = require('moment')

const checkToken = (req, res, next) => {

  if ( !req.headers['user-token'] ) {
    res.json({ error: 'No se ha creado ningun token' })
  }

  const userToken = req.headers['user-token']
  let payload = {}

  try {
    payload = jwt.decode(userToken, 'apirest')
  } catch (error) {
    return res.json({ error: 'El token es incorrecto' })
  }

  if ( payload.expiredAt < moment().unix() ) {
    return res.json({ error: 'El token ha expirado' })
  }

  req.userId = payload.userId

  next()
}

module.exports = {
  checkToken: checkToken
}