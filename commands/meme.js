const request = require('../util/apiRequest');
const { MessageEmbed } = require('discord.js');
module.exports = {
  main: async function (bot, msg) {
    const url = `https://meme-api.herokuapp.com/gimme/${msg.args.length == 0 ? '' : msg.args[0]}`;
    let response = await request.execute(url);
    let tries = 0;
    while (response.status && response.data.nsfw) {
      response = await request.execute(url);
      if (tries >= 5) {
        return msg.reply(`Failed to find funny meme`);
      }
      tries++;
    }
    if (!response.status) return msg.reply(`Something went wrong :( Are you sure this subreddit exists and has posts?`);
    const embed = new MessageEmbed()
      .setColor('0x0000FF')
      .setTitle(`Funny meme from: ${response.data.subreddit}`)
      .setDescription(`${response.data.title}`)
      .setImage(response.data.url)
      .setTimestamp();
    msg.channel.send(msg.author, { embed });
  },
  help: 'Get a funny meme :)',
  args: '<subreddit>',
  hide: false,
};
