const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

router.post("/token", async (req, res) => {
  if (!req.body.googleId || !req.body.email)
    res.status(400).send("No Googleid Or Email");
  //Check existing Email
  const EmailExist = await User.findOne({ Email: req.body.email });
  if (EmailExist) {
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign(
      { _id: EmailExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: expiresIn,
      }
    );
    return res
      .header("Authorization", accessToken)
      .send({ accessToken, role: EmailExist.role });
  }

  //Create New User
  const user = new User({
    googleId: req.body.googleId,
    Email: req.body.email,
    role: "admin",
  });
  try {
    const SaveUser = await user.save();
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: expiresIn,
    });
    res
      .header("Authorization", accessToken)
      .send({ accessToken, role: SaveUser.role });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
