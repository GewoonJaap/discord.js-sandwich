const request = require('../apiRequest');
const log = require('fancy-log');
const gameEmbed = require('../universalCommands/freegame');
const serverConfigs = require('../../model/serverconfig');
module.exports = {
  execute: async function (bot) {
    const data = await request.execute(
      'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL'
    );
    if (data.status) {
      let game;
      const games = data.data.data.Catalog.searchStore.elements;

      for (let i = 0; i < games.length; i++) {
        if (games[i].promotions) {
          if (games[i].promotions.promotionalOffers.length != 0) {
            const offer = games[i].promotions.promotionalOffers[0].promotionalOffers[0];
            const now = new Date();
            const start = new Date(offer.startDate);
            const end = new Date(offer.endDate);
            if (now >= start && now <= end && games[i].price.totalPrice.fmtPrice.discountPrice == "0") {
              game = games[i];
              break;
            }
          }
        }
      }
      console.log(game.title);
      if (!bot.cache.epicGamesGame) bot.cache.epicGamesGame = game;

      const cached = bot.cache.epicGamesGame;
      try {
        if (cached.title != game.title) {
          console.log(`New game! ${cached.title} -> ${game.title}`);
          const embed = await gameEmbed.execute();
          serverConfigs.find({}, function (err, result) {
            if (err) log.error(err);
            else {
              bot.cache.epicGamesGame = game;
              for (let i = 0; i < result.length; i++) {
                try {
                  bot.channels.cache.get(result[i].epicGamesGameChannel).send('There is a new Epic Games free game!', { embed });
                } catch (error) {}
              }
            }
          });
        }
      } catch (e) {}
    }
  },
  time: 1000 * 60,
};
