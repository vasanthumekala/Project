import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Mechanic } from "../models/mechanic.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// add mechaic details
const addMechanic = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can add new mechanic.");
  }
  const { name, experience, contact } = req.body;
  if (!name || experience === undefined || !contact) {
    throw new ApiError(400, "All fields are required.");
  }
  const existingMechanic = await Mechanic.findOne({ contact });
  if (existingMechanic) {
    throw new ApiError(409, "Mechanic already exists");
  }
  const profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    throw new ApiError(400, "profile image is required.");
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage?.url) {
    throw new ApiError(400, "Profile image upload failed");
  }
  const mechanic = await Mechanic.create({
    name,
    experience,
    contact,
    profileImage: profileImage.url,
  });
  const createdMechanic = await Mechanic.findById(mechanic._id);

  if (!createdMechanic) {
    throw new ApiError(400, "mechanic could not be registered.");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdMechanic,
        "mechanic registered successfully.",
      ),
    );
});
// update mechanic details
const updateMechanic = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can update mechanic details.");
  }
  const { mechanicId } = req.params;
  if (!mechanicId) {
    throw new ApiError(400, "mechanic id is required");
  }
  const { name, experience, contact } = req.body;
  if (!name && experience === undefined && !contact) {
    throw new ApiError(400, "Atlest one value is required.");
  }
  if (contact) {
    const exists = await Mechanic.findOne({ contact });
    if (exists && exists._id.toString() !== mechanicId) {
      throw new ApiError(409, "contact already exists");
    }
  }
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (experience !== undefined) updateFields.experience = experience;
  if (contact !== undefined) updateFields.contact = contact;
  const mechanic = await Mechanic.findByIdAndUpdate(
    mechanicId,
    {
      $set: updateFields,
    },
    { new: true },
  );
  if (!mechanic) {
    throw new ApiError(404, "Mechanic does not exists.");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, mechanic, "mechanic details updated successfully"),
    );
});

//remove mechanic
const removeMechanic = AsyncHandler(async (req, res) => {
  if (req.user.role != "admin") {
    throw new ApiError(403, "Only admin can remove mechanic");
  }
  const { mechanicId } = req.params;
  if (!mechanicId) {
    throw new ApiError(400, "mechanic id is required.");
  }
  const deletedMechanic = await Mechanic.findByIdAndDelete(mechanicId);
  if (!deletedMechanic) {
    throw new ApiError(404, "mechanic not found.");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedMechanic, "mechanic removed successfully."),
    );
});

//get all mechanics
const allMechanic = AsyncHandler(async (req, res) => {
  if (req.user.role != "admin") {
    throw new ApiError(403, "Only admin can remove mechanic");
  }
  const mechanic = await Mechanic.find();
  if (!mechanic) {
    throw new ApiError(404, "no mechanic found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, mechanic, "fetched all mechanics"));
});

//profile image update
const updateMechanicProfile = AsyncHandler(async (req, res) => {
  if (req.user.role != "admin") {
    throw new ApiError(403, "Only admin can remove mechanic");
  }
  const { mechanicId } = req.params;
  if (!mechanicId) {
    throw new ApiError(400, "mechanic id is required.");
  }
  const profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    throw new ApiError(400, "profile file is missing.");
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage.url) {
    throw new ApiError(400, "Error while uploading on cloudinary.");
  }
  const user = await Mechanic.findByIdAndUpdate(
    mechanicId,
    {
      $set: { profileImage: profileImage.url },
    },
    { new: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile  updated successfully."));
});

export {
  addMechanic,
  updateMechanic,
  removeMechanic,
  allMechanic,
  updateMechanicProfile,
};
