import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("Notification", notificationSchema);

export default notificationModel;
