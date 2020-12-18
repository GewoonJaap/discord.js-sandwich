const log = require('fancy-log');
const serverConfig = require('../model/serverconfig');
module.exports = {
  addConfig: function (bot, guild) {
    serverConfig.findOne({ serverID: guild.id }, function (err, result) {
      if (!result || result.length == 0) {
        const newConfig = new serverConfig({
          serverID: guild.id,
          epicGamesGameChannel: undefined,
        });
        newConfig.save(function (err, result) {
          if (err) return log.error(err);
          log(`Saved new server config model!`);
        });
      }
    });
  },
};
