import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  emailVerified: Date,
  image: String,
  podcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free',
  },
},{ timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

//////////////////////////////////////////////////////////////////////////////////////////////

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   image: String,
//   podcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }],
//   preferences: {
//     theme: {
//       type: String,
//       enum: ['light', 'dark'],
//       default: 'light',
//     },
//     notifications: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   subscriptionTier: {
//     type: String,
//     enum: ['free', 'pro', 'enterprise'],
//     default: 'free',
//   },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model('User', UserSchema);

