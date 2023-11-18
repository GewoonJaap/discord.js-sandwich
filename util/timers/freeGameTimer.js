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
      let freeGames = [];
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
      console.log(freeGames);

      let gamesToAnnounce = [];
      let coldStart = false;
      if (!bot.cache.epicGamesGame || bot.cache.epicGamesGame.length == 0) {
        bot.cache.epicGamesGame = [];
        coldStart = true;
      }
      freeGames.forEach(game => {
        let found = false;
        bot.cache.epicGamesGame.forEach(cachedGame => {
          if (cachedGame.title.toLowerCase().localeCompare(game.title.toLowerCase()) == 0) {
            found = true;
          }
        });
        if (!found) {
          bot.cache.epicGamesGame.push(game);
          gamesToAnnounce.push(game);
          console.log(`New game! ${game.title}`);
        }
      });

      if (coldStart) return;

      try {
        if (gamesToAnnounce.length > 0) {
          const embeds = await gameEmbed.execute();

          let embedsToSend = [];
          embeds.forEach(embed => {
            let shouldAnnounce = gamesToAnnounce.some(function (game) {
              return embed.title.includes(game.title);
            });
            if (shouldAnnounce) {
              embedsToSend.push(embed);
            }
          });

          serverConfigs.find({}, function (err, result) {
            if (err) log.error(err);
            else {
              for (let i = 0; i < result.length; i++) {
                if (result[i].epicGamesGameChannel != undefined) {
                  try {
                    log.info(`Sending free game announcement to guild: ${result[i].guildID} with channel: ${result[i].epicGamesGameChannel}`);
                    embedsToSend.forEach(embed => {
                      bot.channels.cache
                        .get(result[i].epicGamesGameChannel)
                        .send('There is a new free game of the week in the Epic Games Store!', { embed });
                    });
                  } catch (error) {}
                }
              }
            }
          });
        }
      } catch (e) {}
    }
  },
  time: 1000 * 60,
};
