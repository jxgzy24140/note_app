import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: "string",
      required: true,
    },
    folderId: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
