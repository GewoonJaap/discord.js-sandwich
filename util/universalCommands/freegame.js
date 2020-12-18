const { MessageEmbed } = require('discord.js');
const request = require('../apiRequest');
module.exports = {
  execute: async function () {
    const data = await request.execute(
      'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL'
    );
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
      return embed;
    } else {
      const embed = new MessageEmbed()
        .setColor('0x0000ff')
        .setTitle(`Free game of the day: NOT FOUND`)
        .setDescription("Sorry, we couldn't fetch the free game :(")
        .setTimestamp();
      return embed;
    }
  },
  description: 'Get the Epic Games free game of the day',
};
