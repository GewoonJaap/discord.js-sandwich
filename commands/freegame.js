const freeGame = require('../util/universalCommands/freegame');
module.exports = {
  main: async function (bot, msg) {
    let freeGames = await freeGame.execute();
    freeGames.forEach(game => {
      msg.channel.send(game);
    });
  },
  help: freeGame.description,
  hide: false,
};
