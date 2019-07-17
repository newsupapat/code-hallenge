var c_support = require('./lib/c-support.js')
var cpp_support = require('./lib/cpp-support.js')

module.exports = {
  runC: c_support.runC,
  runCpp: cpp_support.runCpp
}
