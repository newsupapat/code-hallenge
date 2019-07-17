var express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { node, python, java } = require('compile-run')
const { runC, runCpp } = require('./compile_c_cpp')

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
  res.send('Hello')
})
app.post('/compilecode', (req, res) => {
  // const sourcecode = `print("Hell0 W0rld!")`
  const { code, lang } = req.body
  let resultPromise
  switch (lang) {
    case 'c':
      runC(code, '', function (stdout, stderr, err) {
        if (!err) {
          console.log(stdout)
          console.log(stderr)
          res.send(stderr + stdout)
        } else {
          console.log(err)
          res.send(err)
        }
      })
      break
    case 'cpp':
      runCpp(code, '', function (stdout, stderr, err) {
        if (!err) {
          console.log(stdout)
          console.log(stderr)
          res.send(stderr + stdout)
        } else {
          console.log(err)
          res.send(err)
        }
      })
      break
    case 'node':
      resultPromise = node.runSource(code)
      break
    case 'python':
      resultPromise = python.runSource(code)
      break
    default:
      res.send('error')
      break
  }
  if (resultPromise) {
    resultPromise
      .then(result => {
        console.log(result)
        res.send(result)
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }
})
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`)
})
