const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const taxRoutes = require('./routes/taxRoutes');
const documentRoutes = require('./routes/documentRoutes');

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

app.use('/api', employeeRoutes);

app.use('/api', taxRoutes);

app.use('/api', documentRoutes);




app.use(documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
