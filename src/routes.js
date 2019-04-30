const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')

// Conf. global para que todas as views saibam das mensagens
routes.use((req, res, next) => {
  // console.log(JSON.stringify(res.locals))
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  // console.log(JSON.stringify(res.locals))
  // console.log('saiu')
  return next()
})

// configuração global para as imagens
routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// todas as rotas que iniciam com /app terão a aplicabilidade do authMiddleware
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
