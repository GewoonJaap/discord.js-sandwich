const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  saveFeedback: function (bot, title, feedback) {
    const embed = new MessageEmbed().setColor('0x0000FF').setTitle(title).addField(`Feedback: ${feedback}`, false).setTimestamp();
    bot.channels.cache.get(config.FEEDBACK_CHANNEL).send(embed);
  },
};
