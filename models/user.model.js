const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"], 
      minLength: [6, "to short password"],
    },
    phone: {
      type: String,
      default: "",
    },
    profilePicture :{
      type :String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    address: {
      country :{type:String,trim:true,default:""},
      city :{type:String,trim:true,default:""},
      street :{type:String,trim:true,default:""},
      zipcode :{type:String,trim:true,default:""},
    },

    wishList :[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"product"
    }],
    role: {
      type: String, 
      enum: ["user", "seller","admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    }, 
    blocked: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

module.exports.UserModel = mongoose.model("users", userSchema);
