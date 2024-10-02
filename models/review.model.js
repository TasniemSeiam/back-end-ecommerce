const mongoose = require("mongoose");
const  Schema  = mongoose;

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      // product_id: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Product',
      //   required: [true, 'Review must belong to product'],
      // },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        trim: true,
        maxlength: 500
      },

})

module.exports.ReviewModel = mongoose.model("reviews", reviewSchema);