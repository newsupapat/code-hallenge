var express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { c, cpp, node, python, java } = require('compile-run')

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
  res.send('Hello')
})
app.post('/compilecode', (req, res) => {
  const sourcecode = `print("Hell0 W0rld!")`
  console.log(req.body.code)
  let resultPromise = c.runSource(req.body.code)
  resultPromise
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
})
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`)
})
