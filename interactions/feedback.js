const slashCommand = require('../util/slashcommand/index');
const feedbackSave = require('../util/feedback/saveFeedback');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'feedback',
      description: 'Give some feedback about the bot',
      options: [
        {
          name: 'your_feedback',
          description: 'Your feedback here :)',
          type: 3,
          required: true,
        },
      ],
    });
  },

  execute: function (bot, interaction) {
    const user = interaction.member.user;
    const title = `${user.username}#${user.discriminator} | ${user.id}`;
    feedbackSave.saveFeedback(bot, title, interaction.data.options[0].value);
    slashCommand.execute(bot, interaction, {
      content: 'Thanks for your feedback. Here have a sandwich🥪',
    });
  },
};
