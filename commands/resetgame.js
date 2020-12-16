const config = require('../config.json');
module.exports = {
  main: (bot, msg) => {
    if (msg.author.id == bot.OWNERID) {
      const status = require('../util/botStatus').setDefaultStatus(bot);
      bot.sendNotification(`Game changed to: "${status}".`, 'success', msg);
    } else {
      bot.sendNotification('You do not have permission to use this command.', 'error', msg);
    }
  },
  hide: true,
};
