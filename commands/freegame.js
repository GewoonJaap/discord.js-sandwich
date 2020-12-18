const freeGame = require('../util/universalCommands/freegame');
module.exports = {
  main: async function (bot, msg) {
    msg.channel.send(await freeGame.execute());
  },
  help: freeGame.description,
  hide: false,
};
