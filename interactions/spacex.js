const slashCommand = require('../util/slashcommand/index');
const spaceX = require('../util/universalCommands/spacex');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'spacex',
      description: 'Get the latest info about the SpaceX rocket launches',
      options: [
        {
          name: 'launch',
          description: 'Which launch do you want info on? The latest or the next?',
          type: 3,
          required: true,
          choices: [
            {
              name: 'Latest',
              value: 'latest',
            },
            {
              name: 'Next',
              value: 'next',
            },
          ],
        },
      ],
    });
  },

  execute: async function (bot, interaction) {
    const launchType = interaction.data.options[0].value;
    const result = await spaceX.execute(bot, launchType);
    slashCommand.execute(bot, interaction, {
      embeds: result,
    });
  },
};
