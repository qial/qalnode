// schema/reminder-schema.js
// This builds the mongoose Reminder schema

// imports
var mongoose = require('mongoose');
var uuid = require('mongoose-uuid');
var lastMod = require('./plugins/lastMod');
var tags = require('./plugins/tags');

// build schema
var Reminder = new mongoose.Schema({
  startDate: { type: Date, default: Date.now },
  lastDate: { type: Date },
  lastCompleted: { type: Date },
  enabled: { type: Boolean },
  amount: Number,
  strict: Boolean
});

Reminder.plugin(lastMod);
Reminder.plugin(tags);
Reminder.plugin(uuid.plugin);

// export finished schema
module.exports = exports = Reminder;


// plugin example game-schema.js
//var lastMod = require('./lastMod');
//var Game = new Schema({ ... });
//Game.plugin(lastMod, { index: true });
