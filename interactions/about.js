const slashCommand = require('../util/slashcommand/index');
const about = require('../util/universalCommands/about');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'about',
      description: about.description,
    });
  },

  execute: async function (bot, interaction) {
    const result = await about.execute(bot);
    slashCommand.execute(bot, interaction, {
      embeds: result,
    });
  },
};
