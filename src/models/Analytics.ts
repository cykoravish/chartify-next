import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Podcast',
    required: true,
  },
  totalDownloads: {
    type: Number,
    default: 0,
  },
  totalPlays: {
    type: Number,
    default: 0,
  },
  totalShares: {
    type: Number,
    default: 0,
  },
  listenerDemographics: {
    age: {
      '18-24': { type: Number, default: 0 },
      '25-34': { type: Number, default: 0 },
      '35-44': { type: Number, default: 0 },
      '45-54': { type: Number, default: 0 },
      '55+': { type: Number, default: 0 },
    },
    gender: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
  },
  geographicalData: [{
    country: String,
    count: Number,
  }],
  listeningDuration: {
    total: Number,
    average: Number,
  },
  deviceInfo: [{
    device: String,
    count: Number,
  }],
  platformInfo: [{
    platform: String,
    count: Number,
  }],
}, { timestamps: true });

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);

