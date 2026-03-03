import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Booking } from "../models/booking.model.js";

// User: create a new booking
const createBooking = AsyncHandler(async (req, res) => {
  const { brand, model, licenseNo, serviceId, mechanicId, bookingDate, notes } =
    req.body;

  if (!brand || !model || !licenseNo || !serviceId || !bookingDate) {
    throw new ApiError(
      400,
      "brand, model, licenseNo, serviceId and bookingDate are required.",
    );
  }

  const booking = await Booking.create({
    user: req.user._id,
    carDetails: { brand, model, licenseNo },
    service: serviceId,
    mechanic: mechanicId || null,
    bookingDate: new Date(bookingDate),
    notes: notes || "",
  });

  const populated = await Booking.findById(booking._id)
    .populate("service", "serviceType serviceCharge")
    .populate("mechanic", "name contact");

  return res
    .status(201)
    .json(new ApiResponse(201, populated, "Booking created successfully."));
});

// User: get own bookings
const getMyBookings = AsyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("service", "serviceType serviceCharge")
    .populate("mechanic", "name contact")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "Your bookings fetched successfully."),
    );
});

// User: cancel own booking
const cancelBooking = AsyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required.");
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only cancel your own bookings.");
  }

  if (["completed", "cancelled"].includes(booking.status)) {
    throw new ApiError(400, `Booking is already ${booking.status}.`);
  }

  booking.status = "cancelled";
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully."));
});

// Admin: get all bookings
const getAllBookings = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can view all bookings.");
  }

  const bookings = await Booking.find()
    .populate("user", "name email phone userName")
    .populate("service", "serviceType serviceCharge")
    .populate("mechanic", "name contact")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "All bookings fetched successfully."));
});

// Admin: update booking status
const updateBookingStatus = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can update booking status.");
  }

  const { bookingId } = req.params;
  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required.");
  }

  const { status } = req.body;
  const validStatuses = [
    "pending",
    "confirmed",
    "in-progress",
    "completed",
    "cancelled",
  ];
  if (!status || !validStatuses.includes(status)) {
    throw new ApiError(
      400,
      `Status must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { $set: { status } },
    { new: true },
  )
    .populate("user", "name email phone")
    .populate("service", "serviceType serviceCharge")
    .populate("mechanic", "name contact");

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking status updated."));
});

// Admin: assign mechanic to booking
const assignMechanic = AsyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can assign mechanics to bookings.");
  }

  const { bookingId } = req.params;
  const { mechanicId } = req.body;

  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required.");
  }

  if (!mechanicId) {
    throw new ApiError(400, "Mechanic ID is required.");
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { $set: { mechanic: mechanicId } },
    { new: true },
  )
    .populate("user", "name email phone userName")
    .populate("service", "serviceType serviceCharge")
    .populate("mechanic", "name contact experience");

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Mechanic assigned successfully."));
});

export {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  assignMechanic,
};
