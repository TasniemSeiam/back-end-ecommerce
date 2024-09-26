const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minlength: [3, 'Too short Brand name'],
        maxlength: [32, 'Too long Brand name'],
      },
      slug: {
        type: String,
        lowercase: true,
      },
      image: String,
    },
    { timestamps: true }
  );

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
