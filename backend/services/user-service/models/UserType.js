import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserTypeSchema = new Schema({
  userType: {
    type: String,
    required: true,
    unique: true,
  },
  userLevel: Number,
  trsTime: {
    type: Date,
    default: () => new Date(),
  },
});

export const UserType = mongoose.model("UserType", UserTypeSchema);
