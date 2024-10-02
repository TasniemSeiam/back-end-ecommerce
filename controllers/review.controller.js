const asyncHandler = require("express-async-handler");
const { ReviewModel } = require("../models/review.model.js");

const getAllReview = asyncHandler(async (req, res) => {
  const reviews = await ReviewModel.find().populate("user_id",['username','email']);
  if (reviews.length == 0) {
    res.status(201).json("no reviews");
  }
  res.status(200).json(reviews);
});



// handle add review
const addReview = asyncHandler(async (req, res) => {
  const { product_id, rating, comment } = req.body;

  const review = new ReviewModel({
    user_id: req.user._id,
    product_id,
    rating,
    comment,
  });
  await review.save();
  res.status(200).json({ message: "review added successfully", review });
});
// handle update review
const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await ReviewModel.findById(id);
  if (!review) {
    res.status(404);
    throw new Error("Review Not Found");
  }

  if (req.user.id.toString() !== review.user_id.toString()) {
    res.status(403);
    throw new Error("You can only update your own reviews");
  }

  const updatedReview = await ReviewModel.findByIdAndUpdate(
    id,
    {
      $set: {
        rating,
        comment,
      },
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ message: "Review updated successfully", review: updatedReview });
});

// handle delete review 
const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await ReviewModel.findById(id);
    if (!review) {
      res.status(404);
      throw new Error("Review Not Found");
    }
  
    if (req.user.id.toString() !== review.user_id.toString()) {
      res.status(403);
      throw new Error("You can only update your own reviews");
    }
  
    await ReviewModel.findByIdAndDelete(id)
    res.status(200).json({message:"Review deleted successfully"})
  });

module.exports = {
  getAllReview,
  addReview,
  updateReview,
  deleteReview
};
