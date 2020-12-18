const log = require('fancy-log');
const botstats = require('../../model/botstats');
module.exports = {
  execute: async function (bot) {
    botstats.find({}, function (err, result) {
      if (!result || result.length == 0) {
        let newBotstats = new botstats({
          commandsRecieved: bot.cache.stats.commandsRecieved,
          slashCommandsRecieved: bot.cache.stats.slashCommandsRecieved,
          messagesSent: bot.cache.stats.messagesSent,
        });
        newBotstats.save(function (err, result) {
          if (err) log.error(err);
          log(`Added bot stats!`);
          bot.cache.stats.commandsRecieved = 0;
          bot.cache.stats.slashCommandsRecieved = 0;
          bot.cache.stats.messagesSent = 0;
        });
      } else {
        botstats.updateOne(
          { _id: result[0]._id },
          {
            $set: {
              commandsRecieved: (result[0].commandsRecieved += bot.cache.stats.commandsRecieved),
              slashCommandsRecieved: (result[0].slashCommandsRecieved += bot.cache.stats.slashCommandsRecieved),
              messagesSent: (result[0].messagesSent += bot.cache.stats.messagesSent),
            },
          },
          function (err, result) {
            if (err) log.error(err);
            log(`Saved bot stats!`);
            bot.cache.stats.commandsRecieved = 0;
            bot.cache.stats.slashCommandsRecieved = 0;
            bot.cache.stats.messagesSent = 0;
          }
        );
      }
    });
  },
  time: 1000 * 60,
};
