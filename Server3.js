const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/taxDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Document schema
const documentSchema = new mongoose.Schema({
  Company: String,
  HmsCode: String,
});

const Document = mongoose.model('Document', documentSchema);

// CRUD operations

// Create document
app.post('/api/newmodels', async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read all documents
app.get('/api/newmodels', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update document
app.put('/api/newmodels/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete document
app.delete('/api/newmodels/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    res.json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
