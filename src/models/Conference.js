import mongoose, { Schema, models } from "mongoose";

const conferenceSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author1: {
      type: String,
      required: true,
    },
    author2: {
      type: String,
    },
    author3: {
      type: String,
    },
    author4: {
      type: String,
    },
    author5: {
      type: String,
    },
    dept: {
      type: String,
      required: true,
    },
    conference: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    pubYear: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    doi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Conference = models.Conference || mongoose.model("Conference", conferenceSchema);
export default Conference;
