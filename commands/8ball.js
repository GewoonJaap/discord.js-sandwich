const responses = require('../util/8ball_responses.json');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(`👀: ${responses[Math.floor(Math.random() * responses.length)]}`, 'success', msg);
  },
  help: '8Ball will decide👀👀',
  hide: false,
};
