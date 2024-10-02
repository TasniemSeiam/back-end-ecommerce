
const express = require('express')
const { getAllReview, addReview, updateReview, deleteReview } = require('../controllers/review.controller.js')
const verifyToken = require('../middleWare/verifyToken.js')

const router = express.Router()

router.route('/')
.get(getAllReview)
.post(verifyToken,addReview)

router.route('/:id')
.put(verifyToken,updateReview)
.delete(verifyToken,deleteReview)






module.exports = router