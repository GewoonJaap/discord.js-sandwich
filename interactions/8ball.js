const slashCommand = require('../util/slashcommand/index');
const ball = require('../util/universalCommands/8ball');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: '8ball',
      description: ball.description,
    });
  },

  execute: function (bot, interaction) {
    const result = ball.execute();
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};
