

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  Company: String,
  HmsCode: String,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
