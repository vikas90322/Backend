const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();
// Define routes
router.post('/api/newmodels', documentController.createDocument);
router.get('/api/newmodels', documentController.readAllDocuments);
router.put('/api/newmodels/:id', documentController.updateDocument);
router.delete('/api/newmodels/:id', documentController.deleteDocument);

module.exports = router;
