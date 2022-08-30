const about = require('../util/universalCommands/about');
module.exports = {
  main: async function (bot, msg) {
    const embed = await about.execute(bot);
    msg.channel.send(msg.author, { embed });
  },
  help: 'Get basic information about the bot',
  hide: false,
};
