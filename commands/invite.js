const config = require('../config.json');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(`Add me to your server with the following link:\n🔗: ${config.BOT_INVITE}`, 'success', msg);
  },
  help: 'Get a link to add me to your server',
  hide: false,
};
