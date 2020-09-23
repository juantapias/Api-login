const router = require('express').Router()
const bcrypt = require('bcryptjs')
const moment = require('moment')
const jwt = require('jwt-simple')
const { check, validationResult } = require('express-validator')
const { User } = require('../../config/db')
const middleware = require('../middleware')
const { checkToken } = require('../middleware')

router.get('/', middleware.checkToken, async (req, res) => {
  const user = await User.findAll()
  res.json(user);
})

router.post('/signup', [
  check('firstname', 'El Nombre es obligatorio').not().isEmpty(),
  check('lastname', 'El Apellido es obligatorio').not().isEmpty(),
  check('email', 'El Email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ], async (req, res) => {

    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
      return res.status(422).json({error: errors.array()})
    }

    const user = await User.findOne({ where: { email: req.body.email } })

    if ( user ) {
      res.status(422).json({error: 'Email ya existe'})
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
      const user = await User.create(req.body)
      res.json(user)
    }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if ( user ) {
    const passwordValidate = bcrypt.compareSync(req.body.password, user.password)
    if ( passwordValidate ) {
      res.json({ success: createToken(user) })
    } else {
      res.status(422).json({ error: 'Error en usuario y/o contraseña' })
    }
  } else {
    res.status(422).json({ error: 'Error en usuario y/o contraseña' })
  }
})

router.put('/update/:userId', async (req, res) => {
  const password = req.body.password
  if ( password ) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }
  await User.update(req.body, { where: { id: req.params.userId } })
  res.json({ success: 'Se ha actualizado los datos '})
})

router.get('/loguser', middleware.checkToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.userId } })
  res.json(user);
})

createToken = (user) => {
  const payload = {
    userId: user.id,
    role: user.role,
    createdAt: moment().unix(),
    expiredAt: moment().add(30, 'minutes').unix()
  }

  return jwt.encode(payload, 'apirest')
}

module.exports = router