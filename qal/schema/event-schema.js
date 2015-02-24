// schema/event-schema.js
// This builds the mongoose Item schema

// imports
var mongoose = require('mongoose');
var uuid = require('mongoose-uuid');
var timestamps = require('mongoose-timestamp');
var tags = require('./plugins/tags');

// build schema
var Event = new mongoose.Schema({
  title: String,
  desc: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  user: Number
});

Event.plugin(timestamps);
Event.plugin(tags);
Event.plugin(uuid.plugin);

// export finished schema
module.exports = exports = Event;


// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });
