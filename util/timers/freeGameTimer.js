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
      const game = data.data.data.Catalog.searchStore.elements[0];
      if (!bot.cache.epicGamesGame) bot.cache.epicGamesGame = game;

      const cached = bot.cache.epicGamesGame;

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
    }
  },
  time: 1000 * 60,
};
