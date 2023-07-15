const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userblacklistsSchema = new Schema(
  {
    userId: String,
    reason: String,
    blacklistedBy: String,
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model('userblacklist', userblacklistsSchema);
