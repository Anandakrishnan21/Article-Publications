import mongoose, { Schema, models } from "mongoose";

const paperSchema = new Schema(
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
    journal: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    pubyear: {
      type: Number,
      required: true,
    },
    issn: {
      type: String,
      required: true,
    },
    vol: {
      type: Number,
    },
    issue: {
      type: Number,
    },
    pageno: {
      type: Number,
    },
    doi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Paper = models.Paper || mongoose.model("Paper", paperSchema);
export default Paper;
