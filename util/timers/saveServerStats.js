const log = require('fancy-log');
const serverStats = require('../stats/serverStatsDB');
module.exports = {
  execute: async function (bot) {
    if (!bot.cache.serverStats) return;
    const servers = Object.keys(bot.cache.serverStats);
    servers.forEach(server => {
      serverStats.updateStats(bot.cache.serverStats[server].guildId, bot.cache.serverStats[server], bot);
    });
  },
  time: 1000 * 60,
};
