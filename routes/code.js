// Router Default for Path /api
const router = require('express').Router()
// For Running Compiler
const { runC } = require('../compile_c_cpp')
const { c, cpp, node, python, java } = require('compile-run')
// Import Model Of Each Problem
const Problem = require('../model/problem')

router.post('/problem', async (req, res) => {
  const { codes, inputs, outputs, theme, description } = req.body
  const problem = new Problem({
    codes: codes,
    inputs: inputs,
    outputs: outputs,
    theme: theme,
    description: description
  })
  try {
    const SavedProblem = await problem.save()
    res.send(SavedProblem)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/problem', async (req, res) => {
  const problemAll = await Problem.find({})
  res.send(problemAll)
})
router.post('/compilecode', (req, res) => {
  // const sourcecode = `print("Hell0 W0rld!")`
  const { code, lang, input } = req.body
  let resultPromise
  switch (lang) {
    case 'c' && process.env.NODE_ENV === 'production':
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
    case 'C':
      console.log('Enter C')
      resultPromise = c.runSource(code, { stdin: input })
      break
    case 'cpp':
      resultPromise = cpp.runSource(code)
      break
    case 'Javascript':
      console.log('Enter Js')
      resultPromise = node.runSource(code)
      break
    case 'python':
      resultPromise = python.runSource(code)
      break
    default:
      res.status(404).send('error')
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
module.exports = router
