module.exports = app => {
  const passport = app.locals.passport.user
  const responses = app.libs.responses.users
  const controller = {}

  controller.signIn = (req, res, next) =>{

    console.log('hereeee')

    res.send(req.user)

//

    /*passport.authenticate('google-signin',{
            failWithError: true
        }, async (err, user, info) => {


      if(err){
        res.status(500).end()
      }
      res.send(req.user? 200 : 401)

      if (err) {
        res.send(err)
      } else {
        let user = req.user
      }
    })(req, res, next)*/
  }

  return controller
}
