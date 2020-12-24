const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverStatsSchema = new Schema(
  {
    guildId: String,
    commandsExecuted: Object,
    slashCommandsExecuted: Object,
    messagesSent: Object,
    messagesRecieved: Object,
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

module.exports = mongoose.model('serverstat', serverStatsSchema);
