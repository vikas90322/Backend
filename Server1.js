const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
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

// Define Employee schema
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// CRUD operations

// Create employee
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});