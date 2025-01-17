import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const captainSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: [2, " First name must be at least 2 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [2, " Last name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketID: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    color: {
      type: String,
      required: true,
      minlength: [2, " Last name must be at least 2 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [2, " Last name must be at least 2 characters long"],
    },
    capacity: {
        type: Number,
        required: true,
        minlength: [1, "Capacity must be at last 1"], 
    },
    vehicleType: {
        type: String,
        required: true,
        enum : [ "car", "motorcycle", "cng", ],
    },
    lat:{
        type: Number,
    },
    lng:{
        type: Number,
    },
  },
  { timestamps: true }
);

// password hashing
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//  compare password
captainSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate token
captainSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
};

const CaptainModel = mongoose.model("User", captainSchema);
export default CaptainModel; // export the model
