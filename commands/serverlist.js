module.exports = {
  main: (bot, msg) => {
    if (msg.author.id == bot.OWNERID) {
      bot.guilds.cache.forEach(server => {
        console.log(server.name + ' id: ' + server.id + ' member count: ' + server.memberCount);
      });
    } else {
      bot.sendNotification('You do not have permission to use this command.', 'error', msg);
    }
  },
  hide: true,
};
