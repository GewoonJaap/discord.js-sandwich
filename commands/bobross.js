const bobross = require('../util/universalCommands/bobross');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(bobross.execute(), 'success', msg);
  },
  help: bobross.description,
  hide: false,
};
