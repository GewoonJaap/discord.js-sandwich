const { MessageEmbed } = require("discord.js");
module.exports = {
    main: function(bot, msg) {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return bot.emojis.cache.get(id).toString();
        }
        msg.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });
        let Embed = new MessageEmbed()
          .setTitle(`Emojis in ${msg.guild.name}.`)
          .setDescription(
            `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
          )
          .setColor(bot.SUCCESS_COLOR);
        msg.channel.send(Embed);
   },
   help: 'Get all the emoji\'s from this server',
   hide: false
};