// import mongoose from 'mongoose';

// const PodcastSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   fileUrl: {
//     type: String,
//     required: true,
//   },
//   fileId: {
//     type: String,
//     required: true,
//   },
//   duration: Number,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   tags: [String],
//   analytics: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Analytics',
//   },
// }, { timestamps: true });

// export default mongoose.models.Podcast || mongoose.model('Podcast', PodcastSchema);

import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  duration: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
  analytics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analytics',
    // required:true,
  },
}, { timestamps: true });

export default mongoose.models.Podcast || mongoose.model('Podcast', PodcastSchema);

