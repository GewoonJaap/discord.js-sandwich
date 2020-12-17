const slashCommand = require('../util/slashcommand/index');
const bobross = require('../util/universalCommands/bobross');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'bobross',
      description: bobross.description,
    });
  },

  execute: function (bot, interaction) {
    const result = bobross.execute();
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};
