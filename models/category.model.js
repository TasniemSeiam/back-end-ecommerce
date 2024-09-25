const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "category is required "],
      unique: [true, "category should be unique"],
      minlength: [3, "category should be at least 3 characters"],
      maxlength: [40, "category should be at most 40 characters"],
    },
    slug: { type: String, lowercase: true },
    // image: {
    //   type: String,
    // },
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
