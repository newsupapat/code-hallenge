const jwt = require("jsonwebtoken");
const HttpStatus = require('http-status-codes')

const AuthenMiddleware = (req, res, next) => {
  console.log('Authen')
  let token = null;
  if (req.header("Authorization") && req.header("Authorization").split(' ')[0] === 'Bearer') {
    token = req.header("Authorization").split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  } else {
    token = req.body.token
  }
  console.log(token)
  if (!token) return res.send({
    ok: false,
    error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
    code: HttpStatus.UNAUTHORIZED
  })

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = AuthenMiddleware