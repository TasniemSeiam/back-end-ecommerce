const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "category is required "],
      unique: [true, "category should be unique"],
      minlength: [3, "category should be at least 3 characters"],
      maxlength: [100, "category should be at most 40 characters"],
    },

    slug: { type: String, lowercase: true, required: true },

    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [3, "description should be at least 3 characters"],
    },

    price: {
      type: Number,
      trim: true,
      required: [true, "price is required"],
    },
    priceAfterDisc: {
      type: Number,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    colors: [String],
    size: [String],
    material:[String],

    imageCover: {
      type: String,
      required: [true, "image is required"],
    },
    images: [String],

    stock: {
      type: Number,
      required: [true, "stock is required"],
    },

    sold: {
      // How many times has this product been sold?
      type: Number,
      default: 0,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category must be belong to a category"],
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;