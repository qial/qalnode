// schema/user-schema.js
// This builds the mongoose User schema

// imports
var mongoose = require('mongoose');
var lastMod = require('./plugins/lastMod');

// build schema
var User = new mongoose.Schema({
  email: String,
  openId: String,
  name: String,
  firstName: String,
  id: Number
});
User.plugin(lastMod);

// export finished schema
module.exports = exports = User;


// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });