const slashCommand = require('../util/slashcommand/index');
const serverConfig = require('../util/serverconfig');
const config = require('../config');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'settings',
      description: 'Update server settings',
      options: [
        {
          name: 'setting',
          description: 'The setting type',
          type: 3,
          required: true,
          choices: [
            {
              name: 'Epic Games free game announcement channel',
              value: 'epicGamesGameChannel',
            },
            {
              name: 'Amazon Prime free game announcement channel',
              value: 'amazonPrimeGameChannel',
            },
          ],
        },
        {
          name: 'channel',
          description: 'Channel to set',
          type: 7,
          required: true,
        },
      ],
    });
  },

  execute: async function (bot, interaction) {
    const member = await bot.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id);
    if (!member.hasPermission('MANAGE_CHANNELS') && config.OWNERID != interaction.member.user.id) {
      return slashCommand.execute(bot, interaction, {
        content: 'You need to have the `Manage Channels` permission',
      });
    }
    const settingType = interaction.data.options[0].value;
    const channel = interaction.data.options[1].value;
    const result = await serverConfig.updateConfig(bot, interaction.guild_id, channel, settingType);
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};
