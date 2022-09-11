const slashCommand = require('../util/slashcommand/index');
const outro = require('../util/universalCommands/outro.js');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'outro',
      description: outro.description,
    });
  },

  execute: function (bot, interaction) {
    const result = outro.execute(bot, interaction);
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};
