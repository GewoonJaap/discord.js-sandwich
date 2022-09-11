const path = require('path');
module.exports = {
  execute: function (bot, interaction) {
    const guild = bot.guilds.cache.get(interaction.guild_id);
    const member = guild.member(interaction.member.user.id);
    const vchannel = member.voice.channel;
    if (!vchannel) {
      return `You are not in a voice channel!`;
    }
    try {
      vchannel
        .join()
        .then(async connection => {
          try {
            const dispatcher = connection.play(path.join(__dirname, '..', '..', 'sounds', 'outro.mp3'), { volume: 0.5 });
            dispatcher.on('end', function () {
              console.log(`Finished playing music. END`);
              vchannel.leave();
            });
            dispatcher.on('finish', function () {
              console.log(`Finished playing music. FINSIHED`);
              vchannel.leave();
            });
          } catch (error) {
            return `I am not able to play the outro!`;
          }
        })
        .catch(error => {
          console.log(`Outro: ${error}`);
          return `I am unable to join the voice channel!`;
        });
    } catch (e) {
      return `I am unable to join the voice channel!`;
    }
    //play mp3 sound
    return `https://giphy.com/embed/ZBVhKIDgts1eHYdT7u`;
  },
  description: 'Leave the voice chat with a banger💥🎵',
};
