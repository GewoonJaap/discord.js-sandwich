const about = require('../util/universalCommands/about');
module.exports = {
  main: async function (bot, msg) {
    const embed = await about.execute(bot);
    embed.forEach(about => {
      msg.channel.send(about);
    });
  },
  help: 'Get basic information about the bot',
  hide: false,
};
