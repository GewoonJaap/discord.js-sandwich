const request = require('../apiRequest');
const log = require('fancy-log');
const unrealFreeMonthEmbed = require('../universalCommands/unrealFreeMonth');
const serverConfigs = require('../../model/serverconfig');
module.exports = {
  execute: async function (bot) {
    const data = await request.execute(
      'https://www.unrealengine.com/marketplace/api/assets?lang=en-US&start=0&count=100&sortBy=effectiveDate&sortDir=DESC&tag[]=4910'
    );
    if (data.status) {
      let freeMonthContent = [];
      const freeAssets = data.data.data.elements;

      for (let i = 0; i < freeAssets.length; i++) {
        if (freeAssets[i].status == 'ACTIVE') {
          freeMonthContent.push(freeAssets[i]);
          log.info(`Found free asset: ${freeAssets[i].title}`);
        }
      }

      let freeAssetsToAnnounce = [];
      let coldStart = false;
      if (!bot.cache.unrealEngineMonth) {
        bot.cache.unrealEngineMonth = [];
        coldStart = true;
      }
      freeMonthContent.forEach(asset => {
        let found = false;
        bot.cache.unrealEngineMonth.forEach(cachedasset => {
          if (cachedasset.title == asset.title) {
            found = true;
          }
        });
        if (!found) {
          bot.cache.unrealEngineMonth.push(asset);
          freeAssetsToAnnounce.push(asset);
        }
      });

      if (coldStart) return;

      try {
        if (freeAssetsToAnnounce.length > 0) {
          const embeds = await unrealFreeMonthEmbed.execute();
          let embedsToSend = [];
          embeds.forEach(embed => {
            let shouldAnnounce = freeAssetsToAnnounce.some(function (game) {
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
                if (result[i].unrealEngineFreeMonthGameChannel != undefined) {
                  try {
                    log.info(
                      `Sending free assets of the month announcement to guild: ${result[i].guildID} with channel: ${result[i].unrealEngineFreeMonthGameChannel}`
                    );
                    embedsToSend.forEach(embed => {
                      bot.channels.cache
                        .get(result[i].unrealEngineFreeMonthGameChannel)
                        .send('There is new free for the month content on the Unreal Engine Marketplace!', { embed });
                    });
                  } catch (error) {
                    log.error(
                      `Error sending free assets of the month announcement to guild: ${result[i].guildID} with channel: ${result[i].unrealEngineFreeMonthGameChannel}, error: ${error}`
                    );
                  }
                }
              }
            }
          });
        }
      } catch (e) {
        log.error(`Error while announcing free assets of the month: ${e}`);
      }
    }
  },
  time: 1000 * 60,
};
