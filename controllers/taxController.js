const Tax = require('../models/taxModel');

exports.createTax = async (req, res) => {
  try {
    const tax = new Tax(req.body);
    await tax.save();
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateTax = async (req, res) => {
  try {
    const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTax = async (req, res) => {
  try {
    const tax = await Tax.findByIdAndDelete(req.params.id);
    res.json(tax);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
