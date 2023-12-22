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

// Define Tax schema
const taxSchema = new mongoose.Schema({
  taxcode: String,
  Group: String,
  Schedule: String,
});

const Tax = mongoose.model('Tax', taxSchema);

// CRUD operations

// Create tax
app.post('/api/taxes', async (req, res) => {
  try {
    const tax = new Tax(req.body);
    await tax.save();
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read all taxes
app.get('/api/taxes', async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update tax
app.put('/api/taxes/:id', async (req, res) => {
  try {
    const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete tax
app.delete('/api/taxes/:id', async (req, res) => {
  try {
    const tax = await Tax.findByIdAndDelete(req.params.id);
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
