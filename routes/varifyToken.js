const jwt = require("jsonwebtoken");

const AuthenMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(404).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(404).send(error);
  }
};
