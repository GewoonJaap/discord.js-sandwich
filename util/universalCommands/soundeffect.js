const path = require('path');
const sounds = require('../sounds.json');
const fs = require('fs');
module.exports = {
  execute: function (bot, interaction, soundName) {
    const guild = bot.guilds.cache.get(interaction.guild_id);
    const member = guild.member(interaction.member.user.id);
    const vchannel = member.voice.channel;
    const soundEffect = sounds.find(sound => sound.interactionName === soundName);
    if (!soundEffect || !fs.existsSync(path.join(__dirname, '..', '..', 'sounds', soundEffect.soundFile))) {
      return `Sound effect ${soundName} not found.`;
    }
    if (!vchannel) {
      return `You are not in a voice channel!`;
    }
    try {
      vchannel
        .join()
        .then(async connection => {
          try {
            const dispatcher = connection.play(path.join(__dirname, '..', '..', 'sounds', soundEffect.soundFile), { volume: 0.5 });
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
    return soundEffect.messageToSend;
  },
  description: 'Play an awesome sound effect in your voice channel!',
};
