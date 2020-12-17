const slashCommand = require('../util/slashcommand/index');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'ping',
      description: 'ping pong!',
    });
  },

  execute: function (bot, interaction) {
    slashCommand.execute(bot, interaction, {
      content: 'Pong',
    });
  },
};
