// schema/event-schema.js
// This builds the mongoose Item schema

// imports
var mongoose = require('mongoose');
var lastMod = require('./plugins/lastMod');

// build schema
var Event = new mongoose.Schema({
  title: String,
  desc: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  user: Number
});
Event.plugin(lastMod);

// export finished schema
module.exports = exports = Item;


// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });
