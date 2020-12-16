module.exports = {
  main: (bot, msg) => {
    if (msg.author.id == bot.OWNERID) {
      bot.user.setPresence({ activity: { name: msg.content }, status: 'idle' }).catch(console.error);
      bot.sendNotification('Game changed to "' + msg.content + '".', 'success', msg);
    } else {
      bot.sendNotification('You do not have permission to use this command.', 'error', msg);
    }
  },
  hide: true,
};
