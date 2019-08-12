// For Running Compiler
const { runC } = require('../../compile_c_cpp')
const { c, cpp, node, python, java } = require('compile-run')
// Import Model Of Each Problem
const Problem = require('../../model/problem')

const ctrl = {}

ctrl.createProblem = async (req, res) => {
  const { codes, inputs, outputs, theme, description } = req.body
  const codeC = `#include <stdio.h>
  int main()
  {
      int number;
      // printf() dislpays the formatted output 
      printf("Enter an integer: ");  
      
      // scanf() reads the formatted input and stores them
      scanf("%d", &number);  
      
      // printf() displays the formatted output
      printf("You entered: %d", number);
      return 0;
  }`
  const codeJS = `console.log('new')`
  const problem2 = {
    codes: { C: { code: codeC }, Javascript: { code: codeJS } },
    inputs: ['1', '2', '3', '4'],
    outputs: ['1', '2', '6', '24']
  }
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
}
ctrl.getProblem = async (req, res) => {
  const problemAll = await Problem.find({})
  res.send(problemAll)
}
ctrl.compilecode = (req, res) => {
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
}
ctrl.getProblembyid = async (req, res) => {
  if (req.params._id) res.status(400).send('No id')
  const problem = await Problem.find({ _id: req.params.id })
  res.send(problem)
}
module.exports = ctrl
