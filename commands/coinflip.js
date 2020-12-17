const coinFlip = require('../util/universalCommands/coinflip');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(coinFlip.execute(), 'success', msg);
  },
  help: coinFlip.description,
  hide: false,
};
