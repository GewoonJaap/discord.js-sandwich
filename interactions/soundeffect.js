const slashCommand = require('../util/slashcommand/index');
const sounds = require('../util/sounds');
const soundeffect = require('../util/universalCommands/soundeffect');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'soundeffect',
      description: soundeffect.description,
      options: [
        {
          name: 'effect',
          description: 'Which sound effect do you want to hear?',
          type: 3,
          required: true,
          choices: createChoicesArray(),
        },
      ],
    });
  },

  execute: async function (bot, interaction) {
    const effectName = interaction.data.options[0].value;
    const result = await soundeffect.execute(bot, interaction, effectName);
    slashCommand.execute(bot, interaction, {
      content: result,
    });
  },
};

function createChoicesArray() {
  const choices = [];
  for (const sound of sounds) {
    choices.push({
      name: sound.FancyName,
      value: sound.interactionName,
    });
  }
  return choices;
}
