module.exports = {
  addServer: function (guildId) {
    const serverStatsDB = require('./serverStatsDB');
    serverStatsDB.addServer(guildId);
  },
  addStats: function (bot, guildId, statsKey, channelId) {
    if (!bot.cache.serverStats) bot.cache.serverStats = {};
    if (!bot.cache.serverStats[guildId]) bot.cache.serverStats[guildId] = module.exports.getDefaultObject(guildId);
    if (!bot.cache.serverStats[guildId][statsKey]) bot.cache.serverStats[guildId][statsKey] = {};
    if (!bot.cache.serverStats[guildId][statsKey][channelId]) bot.cache.serverStats[guildId][statsKey][channelId] = 0;

    bot.cache.serverStats[guildId][statsKey][channelId]++;
  },
  getDefaultObject: function (guildID) {
    const result = {
      guildId: guildID,
      commandsExecuted: {},
      slashCommandsExecuted: {},
      messagesSent: {},
      messagesRecieved: {},
    };
    return result;
  },
};
