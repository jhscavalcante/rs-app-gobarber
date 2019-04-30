module.exports = (req, res, next) => {
  // verifica se tem sessão e se na sessão tem a informação de user
  if (req.session && req.session.user) {
    // grava as informações do user para serem compartilhadas em todas as views
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
