const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  mood: String,
  date: String
});

module.exports = mongoose.model('Entry', entrySchema);
