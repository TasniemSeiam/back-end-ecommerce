const express = require('express');
const {
  checkoutSession,
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  findSpecificOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/Order.controller');

const auth = require('../controllers/Auth.controller');

const router = express.Router();

router.use(auth.protect);

router.get(
  '/checkout-session/:cartId',
  auth.allowedTo('user'),
  checkoutSession
);

router.route('/:cartId').post(auth.allowedTo('user'), createCashOrder);
router.get(
  '/',
  auth.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  auth.allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  auth.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;