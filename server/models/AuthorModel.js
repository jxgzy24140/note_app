import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
