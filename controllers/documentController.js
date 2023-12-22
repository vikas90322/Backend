
const Document = require('../models/documentModel');

// CRUD operations
exports.createDocument = async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.readAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
