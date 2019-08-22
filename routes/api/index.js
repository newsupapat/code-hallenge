const express = require('express')
const router = express.Router()
const AuthenMiddleware = require('../verifyToken')

// Code And Problem
const problem = require('../control/problem')
router.post('/problem',AuthenMiddleware, problem.createProblem)
router.get('/problem', problem.getProblem)
router.get('/problem/:id', problem.getProblembyid)
router.post('/compilecode', problem.compilecode)

module.exports = router
