const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
  codes: mongoose.Schema.Types.Mixed,
  inputs: [String],
  outputs: [String],
  theme:{
    type: String,
    default: 'Space'
  }
});
module.exports = mongoose.model("problem", problemSchema);
