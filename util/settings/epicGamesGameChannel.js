const serverConfig = require('../serverconfig');
module.exports = {
  execute: async function (bot, msg) {
    const channelInput = msg.args[1].replace(/\D/g, '');
    if (channelInput.trim().length == 0) return msg.channel.send(`Invalid channel, please tag the channel.`);
    const channel = await msg.guild.channels.cache.get(channelInput);
    if (!channel) return msg.channel.send(`Invalid channel, please tag the channel.`);
    const result = await serverConfig.updateConfig(bot, msg.guild.id, channel.id, 'epicGamesGameChannel');
    return msg.channel.send(result);
  },
};
