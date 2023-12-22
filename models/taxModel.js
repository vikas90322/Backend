const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
  taxcode: String,
  Group: String,
  Schedule: String,
});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
