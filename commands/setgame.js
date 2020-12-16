module.exports = {
  main: (bot, msg) => {
    if (msg.author.id == bot.OWNERID) {
      bot.user.setPresence({ activity: { name: msg.content }, status: 'idle' }).catch(console.error);
      const status = require('../util/botStatus').setCustomStatus(bot, msg.content);
      bot.sendNotification(`Game changed to: "${status}".`, 'success', msg);
    } else {
      bot.sendNotification('You do not have permission to use this command.', 'error', msg);
    }
  },
  hide: true,
};
