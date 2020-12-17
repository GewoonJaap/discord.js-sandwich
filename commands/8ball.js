const ball = require('../util/universalCommands/8ball');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(ball.execute(), 'success', msg);
  },
  help: ball.description,
  hide: false,
};
