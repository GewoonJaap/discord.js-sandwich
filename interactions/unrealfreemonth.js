const slashCommand = require('../util/slashcommand/index');
const freegame = require('../util/universalCommands/unrealFreeMonth');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'unrealfreemonth',
      description: freegame.description,
    });
  },

  execute: async function (bot, interaction) {
    const result = await freegame.execute();
    console.log(result);
    slashCommand.execute(bot, interaction, {
      embeds: result,
    });
  },
};
