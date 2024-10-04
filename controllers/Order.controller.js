const stripe = require("stripe")(process.env.STRIPE_SECRET);
const asyncHandler = require("express-async-handler");
const ApiError = require("../util/AppHandleError");

const UserModel = require("../models/User.model");
const Product = require("../models/products.model");
const Cart = require("../models/Cart.model");
const Order = require("../models/Order.model");


// end point  POST /api/v1/orders/cartId
// allow to  /User
exports.createCashOrder = asyncHandler(async (req, res, next) => {

  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  if (order) {
    const bulkOperations = [];

    cart.cartItems.forEach((item) => {
      bulkOperations.push({
        updateOne: {
          filter: { _id: item.product }, 
          update: {
            $inc: {
              quantity: -item.quantity, 
              sold: item.quantity, 
            },
          },
        },
      });
    });

    await Product.bulkWrite(bulkOperations);

    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});

// end point  POST /api/v1/orders
// allow to  /User-Admin-Manager
exports.findAllOrders = asyncHandler(async (req, res, next) => {
  if(req.filterObj){
    const orders = await Order.find(req.filterObj);
    res.status(200).json({
      status: "success",
      numOfOrders: orders.length,
      data: orders,
    });
  }else{  
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      numOfOrders: orders.length,
      data: orders,
    });
  }
});

// end point  POST /api/v1/orders/:id
// allow to  /User-Admin-Manager
exports.findSpecificOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ status: "success", data: order });
});

// end point  PUT /api/v1/orders/:id/pay
// allow to  /Admin-Manager
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

// end point  PUT /api/v1/orders/:id/deliver
// allow to  /Admin-Manager
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});


// end point  GET /api/v1/orders/checkout-session/cartId
// allow to  /User
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        name: req.user.name,
        amount: totalOrderPrice * 100,
        currency: "egp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  res.status(200).json({ status: "success", session });
});

const createCardOrder = async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const oderPrice = session.amount_total / 100;

  const cart = await Cart.findById(cartId);
  const user = await UserModel.findOne({ email: session.customer_email });

  const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: oderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: "card",
  });

  if (order) {
    const bulkOperations = [];

    cart.cartItems.forEach((item) => {
      bulkOperations.push({
        updateOne: {
          filter: { _id: item.product },
          update: {
            $inc: {
              stock: -item.stock,
              sold: item.quantity, 
            },
          },
        },
      });
    });

    await Product.bulkWrite(bulkOperations);

    await Cart.findByIdAndDelete(cartId);
  }
};

//  This webhook will run when stripe payment success paid
// end point  POST /webhook-checkout
// allow to  /User
exports.webhookCheckout = asyncHandler(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    createCardOrder(event.data.object);
  }

  res.status(200).json({ received: true });
});
