import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

//option
const option = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

//register user
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, userName, phone, address } = req.body;
  if (!email || !password || !userName || !phone || !name) {
    throw new ApiError(400, "All required fields must be provided");
  }
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const profileImageLocalPath = req.file?.path;

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage?.url) {
    throw new ApiError(400, "Profile image upload failed");
  }

  const user = await User.create({
    name,
    profileImage: profileImage.url,
    email,
    password,
    userName,
    phone,
    address,
  });
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the User!");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
//Login Users
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, " User does not exists.");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Password is invalid.");
  }
  const accessToken = await user.generateAccessToken();
  const loggedInUser = await User.findById(user._id).select("-password");

  const response = new ApiResponse(
    200,
    loggedInUser,
    "user successfully logged in.",
  );

  return res
    .status(200)
    .cookie("accesstoken", accessToken, option)
    .json({
      ...response,
      accessToken,
    });
});
//logout
const logoutUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accesstoken", option)
    .json(new ApiResponse(200, {}, "User logged out !!"));
});
//profile image update
const updateUserProfile = AsyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    throw new ApiError(400, "profile file is missing.");
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage.url) {
    throw new ApiError(400, "Error while uploading on cloudinary.");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { profileImage: profileImage.url },
    },
    { new: true },
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile  updated successfully."));
});

// change user password
const changeCurrentUserPassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old Password and New Password are required");
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// get current user details
const getCurrentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User fetched successfully"));
});

//update user account
const updateAccoutDetails = AsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new ApiError(400, "All fields are required.");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { name, email, phone },
    },
    { new: true },
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Accounts details updated."));
});

// DEV ONLY: promote a user to admin by email
const makeAdmin = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required.");
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { role: "admin" } },
    { new: true },
  ).select("-password");
  if (!user) throw new ApiError(404, "User not found.");
  return res
    .status(200)
    .json(new ApiResponse(200, user, `${user.email} is now admin.`));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  changeCurrentUserPassword,
  getCurrentUser,
  updateAccoutDetails,
  makeAdmin,
};
