const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getSalesStats
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/stats').get(protect, authorize('admin'), getSalesStats);

router
  .route('/')
  .get(protect, authorize('admin'), getOrders)
  .post(createOrder);

router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, authorize('admin'), updateOrder)
  .delete(protect, authorize('admin'), deleteOrder);

module.exports = router;

