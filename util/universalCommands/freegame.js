const { MessageEmbed } = require('discord.js');
const request = require('../apiRequest');
module.exports = {
  execute: async function () {
    const data = await request.execute(
      'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL'
    );
    if (data.status) {
      let freeGames = [];
      let freeGamesEmbeds = [];
      const games = data.data.data.Catalog.searchStore.elements;
      for (let i = 0; i < games.length; i++) {
        if (games[i].promotions) {
          if (games[i].promotions.promotionalOffers.length != 0) {
            const offer = games[i].promotions.promotionalOffers[0].promotionalOffers[0];
            const now = new Date();
            const start = new Date(offer.startDate);
            const end = new Date(offer.endDate);
            if (now >= start && now <= end && games[i].price.totalPrice.fmtPrice.discountPrice == '0') {
              freeGames.push(games[i]);
            }
          }
        }
      }
      freeGames.forEach(game => {
        const embed = new MessageEmbed()
          .setColor('0x0000FF')
          .setTitle(`Free game of the week: ${game.title}`)
          .setDescription(game.description)
          .setThumbnail(game.keyImages[0].url)
          .setImage(game.keyImages[1].url)
          .setURL(`https://www.epicgames.com/store/en-US/product/${game.productSlug}`)
          .setTimestamp();
        freeGamesEmbeds.push(embed);
      });
      return freeGamesEmbeds;
    } else {
      const embed = new MessageEmbed()
        .setColor('0x0000ff')
        .setTitle(`Free game of the week: NOT FOUND`)
        .setDescription("Sorry, we couldn't fetch the free game :(")
        .setTimestamp();
      return [embed];
    }
  },
  description: 'Get the Epic Games free games of the week',
};
