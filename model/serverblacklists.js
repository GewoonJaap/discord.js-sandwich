const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverBlacklistSchema = new Schema(
  {
    guildId: String,
    reason: String,
    blacklistedBy: String,
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model('serverblacklist', serverBlacklistSchema);
