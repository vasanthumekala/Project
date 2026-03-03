import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  contact: {
    type: String,
    trim: true,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  ratings: [
    {
      type: Number,
      min: 0,
      max: 5,
    },
  ],
  profileImage: {
    type: String,
    required: true,
  },
});
mechanicSchema.virtual("averageRating").get(function () {
  if (!this.ratings || !this.ratings.length) return 0;
  return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
});
mechanicSchema.set("toJSON", { virtuals: true });
mechanicSchema.set("toObject", { virtuals: true });

export const Mechanic = mongoose.model("Mechanic", mechanicSchema);
