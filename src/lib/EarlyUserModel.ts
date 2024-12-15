import mongoose from "mongoose";

// Helper function
export const getRandomImage = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  const gender = Math.random() < 0.5 ? "men" : "women";
  return `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
};

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
      default: getRandomImage(),
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid overwriting in a hot-reloading environment
const EarlyUser = mongoose.models.EarlyUser || mongoose.model("EarlyUser", earlyUserSchema);

// Export the model
export default EarlyUser;
