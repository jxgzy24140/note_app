import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    authorId: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const FolderModel = mongoose.model("Folder", folderSchema);

export default FolderModel;
