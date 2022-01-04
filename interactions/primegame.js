const slashCommand = require('../util/slashcommand/index');
const freegame = require('../util/universalCommands/primegame');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'primegame',
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
