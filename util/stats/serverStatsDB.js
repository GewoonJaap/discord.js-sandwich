const serverstat = require('../../model/serverstats');
const log = require('fancy-log');
module.exports = {
  addServer: function (guildId) {
    const serverstatsHandler = require('./serverStatsHandler');
    serverstat.findOne({ guildId: guildId }, function (err, result) {
      if (!result || result.length == 0) {
        const object = serverstatsHandler.getDefaultObject(guildId);
        const newServerstat = new serverstat(object);
        newServerstat.save(function (err, result) {
          if (err) console.log(err);
        });
      }
    });
  },
  updateStats: function (guildId, statsObject, bot) {
    serverstat.findOne({ guildId: guildId }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, guildId: 0 }, function (err, result) {
      if (!result || result.length == 0) {
        return module.exports.addServer(guildId);
      }
      const newStats = mergeStats(result, statsObject);
      serverstat.updateOne({ guildId: guildId }, { $set: newStats }, function (err, result) {
        if (err) log.error(err);
        log(`Saved server stats! ${guildId}`);
        delete bot.cache.serverStats[guildId];
      });
    });
  },
};

function mergeStats(currentStats, newStats) {
  const keys = Object.keys(newStats);
  keys.forEach(key => {
    if (!currentStats[key]) currentStats[key] = {};
    if (key != 'guildId') {
      const channels = Object.keys(newStats[key]);
      channels.forEach(channel => {
        if (!currentStats[key][channel]) currentStats[key][channel] = 0;
        currentStats[key][channel] += newStats[key][channel];
      });
    }
  });
  return currentStats;
}
