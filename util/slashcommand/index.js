module.exports = {
  registerCommand: function (bot, data) {
    bot.api.applications(bot.user.id).commands.post({
      data,
    });
    console.log(`Registered slash command: ${data.name} | ${data.description}`);
  },

  execute: function (bot, interaction, data) {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data,
      },
    });
  },
};
