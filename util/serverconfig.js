const log = require('fancy-log');
const serverConfig = require('../model/serverconfig');
const allowedUpdateKeys = ['epicGamesGameChannel'];
module.exports = {
  addConfig: function (bot, guildId) {
    serverConfig.findOne({ serverID: guildId }, function (err, result) {
      if (!result || result.length == 0) {
        const newConfig = new serverConfig({
          serverID: guildId,
          epicGamesGameChannel: undefined,
        });
        newConfig.save(function (err, result) {
          if (err) return log.error(err);
          log(`Saved new server config model for: ${guildId}!`);
        });
      }
    });
  },

  updateConfig: function (bot, guildId, value, setting) {
    return new Promise(function (resolve, reject) {
      serverConfig.findOne({ serverID: guildId }, function (err, result) {
        if (!result || result.length == 0) {
          module.exports.addConfig(bot, guildId);
          reject(`Something went wrong, try again later`);
        } else {
          if (allowedUpdateKeys.indexOf(setting) != -1) {
            let newData = {};
            newData[setting] = value;
            serverConfig.updateOne({ serverID: guildId }, newData, function (err, docs) {
              if (err) {
                reject(`Something went wrong, try again later`);
              } else {
                resolve(`Updated the settings!`);
              }
            });
          }
        }
      });
    });
  },
};
