const { MessageEmbed } = require('discord.js');
const morse = require('morse-node').create('ITU');
module.exports = {
  main: function (bot, msg) {
    const translated = morse.encode(msg.content);
    const embed = new MessageEmbed()
      .setColor('0x0000FF')
      .setTitle('Morse Code Translator')
      .addField('📥 Original 📥', msg.content, false)
      .addField('📤 Morse Code 📤', translated, false)
      .setTimestamp();
    msg.channel.send(msg.author, { embed });
  },
  help: 'Translate your text into morse',
  hide: false,
  args: '<string>',
};
