
const express = require('express')
const auth = require('../controllers/Auth.controller.js')
const { getAllReview, addReview, updateReview, deleteReview } = require('../controllers/review.controller.js')
// const verifyToken = require('../middleware/verifyToken.js')

const router = express.Router()

router.route('/')
.get(getAllReview)
.post(auth.protect,auth.allowedTo('user'),addReview)

router.route('/:id')
.put(auth.protect,auth.allowedTo('user'),updateReview)
.delete(auth.protect,auth.allowedTo(['user','admin']),deleteReview)






module.exports = router