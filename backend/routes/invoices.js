const express = require('express');
const { generateInvoice } = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/:orderId').get(protect, authorize('admin'), generateInvoice);

module.exports = router;

