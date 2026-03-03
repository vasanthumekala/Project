import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  assignMechanic,
} from "../controllers/booking.controller.js";

const router = Router();

// User routes
router.route("/create").post(verifyJWT, createBooking);
router.route("/myBookings").get(verifyJWT, getMyBookings);
router.route("/cancel/:bookingId").patch(verifyJWT, cancelBooking);

// Admin routes
router.route("/allBookings").get(verifyJWT, getAllBookings);
router.route("/updateStatus/:bookingId").patch(verifyJWT, updateBookingStatus);
router.route("/assignMechanic/:bookingId").patch(verifyJWT, assignMechanic);

export default router;
