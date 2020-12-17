const { MessageEmbed } = require('discord.js');
const freeGame = require('../util/universalCommands/freegame');
module.exports = {
  main: async function (bot, msg) {
    const data = await freeGame.execute();
    if (data.status) {
      const game = data.data.data.Catalog.searchStore.elements[0];
      const embed = new MessageEmbed()
        .setColor('0x0000FF')
        .setTitle(`Free game of the day: ${game.title}`)
        .setDescription(game.description)
        .setThumbnail(game.keyImages[0].url)
        .setImage(game.keyImages[1].url)
        .setURL(`https://www.epicgames.com/store/en-US/product/${game.productSlug}`)
        .setTimestamp();
      msg.channel.send(embed);
    }
  },
  help: 'Get the Epic Games free game of the day',
  hide: false,
};
