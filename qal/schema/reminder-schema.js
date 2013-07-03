// schema/reminder-schema.js
// This builds the mongoose Reminder schema

// imports
var mongoose = require('mongoose');
var lastMod = require('plugins/lastMod');

// build schema
var Reminder = new mongoose.Schema({
  startDate: {type: Date, default: Date.now },
  lastDate: {type: Date},
  lastCompleted: {type: Date},
  enabled: {type: Boolean},
  amount: Number,
  strict: Boolean
});
Reminder.plugin(lastMod);

// export finished schema
module.exports = exports = Reminder;


// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });