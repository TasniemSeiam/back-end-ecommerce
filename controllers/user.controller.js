
const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken.js");
const generateOTP = require("../utils/generateOTP.js");
const sendEmail = require("../utils/sendEmail.js");

const htmlForResetPAssword = (otpNumper,name) => {
  return `   <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              hello ${name}
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for choosing our Company. Use the following OTP
              to complete the procedure to change your password. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f;">10 minutes</span>.
              Do not share this code with others, including Archisketch
              employees.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              ${otpNumper}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:moustafaashraf20@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >moustafaashraf20@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>`
}

const congratulationsRegister = (name) => {
return  `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 20px; background-color: #4CAF50; color: #fff; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations! 🎉</h1>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 18px; color: #333;">Dear <strong>${name}</strong>,</p>
            <p style="font-size: 18px; color: #333;">We are thrilled to congratulate you on your recent success!</p>
            <p style="font-size: 18px; color: #333;">You have achieved something truly remarkable, and we are excited to celebrate this special moment with you.</p>
            <p style="font-size: 16px; color: #333;">Keep up the great work, and we wish you continued success in all your future endeavors.</p>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #888;">
            <p>Best regards,</p>
            <p>e commerce</p>
        </div>
    </div>
</body>`
}
 








// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select('-password');
  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  
  res.json(users);
});

// register user
const register = asyncHandler(async (req, res) => {
  const { password, email, ...otherData } = req.body;
  const existedUser = await UserModel.findOne({ email });

  if (existedUser) {
    res.status(409);
    throw new Error("User already existed");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userData = {
    ...otherData,
    email: email,
    password: hashedPassword,
  };
  await UserModel.create(userData);
  res.status(201).json({ message: "User added successfully" });
  sendEmail(userData.email,"Thank You For Registration",congratulationsRegister(userData.username))
});

// sign in user
const signIn = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const validUser = await UserModel.findOne({ email });
  if (!validUser) {
    res.status(404);
    throw new Error("User not found");
  }


  const checkPassword = bcrypt.compareSync(req.body.password, validUser.password);
  if (!checkPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = generateToken(validUser._id);
  const { password, ...rest } = validUser._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, //This is 1 hour
    })
    .status(201)
    .json(rest);
});

// sign in with google 
const authWithGoogle = asyncHandler(async (req, res) => {
  // check if user already existed in database
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    const token = generateToken(user._id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000, //  This is 1 hour
      })
      .status(200)
      .json(user);
  } else {
    // if user doesn't exist in database
    const generatePassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatePassword, 10);
    const { username, email, photo } = req.body;
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      profilePicture: photo,
    });

    await newUser.save();
    const token = generateToken(newUser._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, // Note: This is 1 hour
    }).status(201).json(newUser);
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  if (req.user.id !== id) {
    res.status(403);
    throw new Error("You can update only your account");
  }
  const { username, email, address, profilePicture, phone } = req.body;
  const existedEmail = await UserModel.findOne({email})
  if (existedEmail) {
    res.status(409);
    throw new Error("email already existed choose another one");
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      $set: {
        username,
        email,
        address,
        profilePicture,
        phone,
      },
    },
    { new: true }
  );

  res.status(201).json(updatedUser);
});


// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.user.id !== id) {
    res.status(403);
    throw new Error("You can delete only your account");
  } else {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json("User has been deleted");
  }
});

// sign out
const signOut = asyncHandler(async (req, res) => {
  res.clearCookie('access_token').status(200).json("Sign out success");
});


// handle reset password with send OTP mail

const sendOtp = asyncHandler(async (req,res) => {
  
const {email} = req.body ;

const user =  await UserModel.findOne({ email });
if (!user) {
    res.status(404)
    throw new Error("User not found");
    
}

const otp = generateOTP();
user.otp = otp; // to check valid otp or not
user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

await user.save();

// send otp to user
await sendEmail(email,"Password Reset OTP", htmlForResetPAssword(otp,user.username));
res.status(200).json({ msg: 'OTP sent to your email' });


});

// Verify OTP and reset password

const verifyOTPAndResetPassword = asyncHandler(async (req,res) => {
  
  const {email,otp, newPassword} = req.body;

const user = await UserModel.findOne({
  email,
  otp,
  otpExpires:{$gt:Date.now()}
})
console.log(user);

if (!user) {
  res.status(400)
  throw new Error("Invalid OTP or OTP expired");
  
}
// hash new password
user.password = bcrypt.hashSync(newPassword, 10);
user.otp = undefined;
user.otpExpires = undefined; // Clear OTP
await user.save();

res.status(200).json({message:"Password reset successfully"})
})







module.exports = {
  getAllUsers,
  register,
  signIn,
  authWithGoogle,
  updateUser,
  deleteUser,
  signOut,
  sendOtp,
  verifyOTPAndResetPassword
};
