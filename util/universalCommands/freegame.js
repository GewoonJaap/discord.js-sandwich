const { MessageEmbed } = require('discord.js');
const request = require('../apiRequest');
module.exports = {
  execute: async function () {
    const data = await request.execute(
      'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL'
    );
    if (data.status) {
      let game;
      const games = data.data.data.Catalog.searchStore.elements;
      for (let i = 0; i < games.length; i++) {
        if (games[i].promotions.promotionalOffers.length != 0) {
          const offer = games[i].promotions.promotionalOffers[0].promotionalOffers[0];
          if (offer.startDate.startsWith(`2020-12-${new Date().getDate()}`) || offer.endDate.startsWith(`2020-12-${new Date().getDate()}`)) {
            game = games[i];
            break;
          }
        }
      }
      try {
        const embed = new MessageEmbed()
          .setColor('0x0000FF')
          .setTitle(`Free game of the day: ${game.title}`)
          .setDescription(game.description)
          .setThumbnail(game.keyImages[0].url)
          .setImage(game.keyImages[1].url)
          .setURL(`https://www.epicgames.com/store/en-US/product/${game.productSlug}`)
          .setTimestamp();
        return embed;
      } catch (e) {
        const embed = new MessageEmbed()
          .setColor('0x0000ff')
          .setTitle(`Free game of the day: NOT FOUND`)
          .setDescription("Sorry, we couldn't fetch the free game :(")
          .setTimestamp();
        return embed;
      }
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
