const slashCommand = require('../util/slashcommand/index');
const coinFlip = require('../util/universalCommands/coinflip');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'coinflip',
      description: coinFlip.description,
    });
  },

  execute: function (bot, interaction) {
    const result = coinFlip.execute();
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};
