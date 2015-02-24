// schema/user-schema.js
// This builds the mongoose User schema

// imports
var mongoose = require('mongoose');
var uuid = require('mongoose-uuid');
var timestamp = require('mongoose-timestamp');

// build schema
var User = new mongoose.Schema({
  email: String,
  password: String,
  name: String
}, {_id: false});

User.plugin(timestamp);
User.plugin(uuid.plugin);

// export finished schema
module.exports = exports = User;

// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });
