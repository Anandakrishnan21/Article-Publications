import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    authImageUrl: String,
    scholar: {
      type: String,
    },
    scopus: {
      type: Number,
    },
    orcid: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
