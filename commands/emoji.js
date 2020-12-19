const { MessageEmbed } = require('discord.js');
module.exports = {
  main: function (bot, msg) {
    let Emojis = '';
    let EmojisAnimated = '';
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    msg.guild.emojis.cache.forEach(emoji => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id, bot);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id, bot);
      }
    });
    let Embed = new MessageEmbed()
      .setColor(bot.COLOR)
      .setThumbnail(msg.guild.iconURL())
      .setTitle(`Emojis in ${msg.guild.name}.`)
      .addField(`**Animated [${Animated}]**:`, EmojisAnimated, false)
      .addField(`**Standard [${EmojiCount}]**:`, Emojis, false)
      .setDescription(`**Over all emojis [${OverallEmojis}]**:`);
    msg.channel.send(Embed);
  },
  help: "Get all the emoji's from this server",
  hide: false,
};

function Emoji(id, bot) {
  return bot.emojis.cache.get(id).toString();
}
