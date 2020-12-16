const config = require('../config.json');

module.exports = {
  main: (bot, msg) => {
    if (msg.author.id == bot.OWNERID) {
      bot.user.setPresence({ activity: { name: config.DEFAULT_ACTIVITY }, status: 'idle' }).catch(console.error);
      bot.sendNotification('Game changed to "' + config.DEFAULT_ACTIVITY + '".', 'success', msg);
    } else {
      bot.sendNotification('You do not have permission to use this command.', 'error', msg);
    }
  },
  hide: true,
};
