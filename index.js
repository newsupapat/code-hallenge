var express = require('express')
const app = express()
var bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')

require('./config/passport')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

require('./routes/authRouter')(app)
require('./routes/code')(app)

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['testKey']
  })
)

app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV == 'production') {
  // js and css files
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`)
})
