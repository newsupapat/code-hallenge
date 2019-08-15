require("dotenv").config();
var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

//Reduce Size
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
// const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on("connected", function() {
  console.log("MongoDB connected");
});
//Router
const Compile = require("./routes/code");
const Auth = require("./routes/auth");

app.use("/api", require('./routes/api'));
app.use("/user", Auth);

if (process.env.NODE_ENV == "production") {
  // js and css files
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`);
});

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['testKey']
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())
