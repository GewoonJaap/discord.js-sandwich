const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverConfigSchema = new Schema(
  {
    serverID: Number,
    epicGamesGameChannel: String,
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model('serverConfig', serverConfigSchema);
