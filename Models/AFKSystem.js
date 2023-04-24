const { model, Schema } = require("mongoose");

let AFK = new Schema({
  Guild: String,
  User: String,
  Afk: Boolean,
  Date: Number,
});

module.exports = model("AFK", AFK);
