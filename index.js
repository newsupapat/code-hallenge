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
  // const sourcecode = `print("Hell0 W0rld!")`
  const { code, lang } = req.body
  switch (lang) {
    case 'c':
      let resultPromise = c.runSource(code)
      break
    case 'cpp':
      let resultPromise = cpp.runSource(code)
      break
    case 'node':
      let resultPromise = node.runSource(code)
      break
    case 'python':
      let resultPromise = python.runSource(code)
      break
    default:
      res.send('error')
      break
  }
  resultPromise
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`)
})
