import mongoose, { models, Schema } from "mongoose";
import Company from "@/models/company";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
