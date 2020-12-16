const config = require('../config.json');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(
      `Add me to your server with the following link:\n🔗: https://discord.com/oauth2/authorize?client_id=${config.BOTID}&scope=bot&permissions=${config.PERMISSIONS}`,
      'success',
      msg
    );
  },
  help: 'Get a link to add me to your server',
  hide: false,
};
