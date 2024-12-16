import mongoose from "mongoose";

// Define the schema
const earlyUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid overwriting in a hot-reloading environment
const EarlyUser =
  mongoose.models.EarlyUser || mongoose.model("EarlyUser", earlyUserSchema);

// Export the model
export default EarlyUser;

