const { MessageEmbed } = require('discord.js');
const request = require('request');
module.exports = {
  main: function (bot, msg) {
    const user = msg.mentions.users.first() || msg.author;
    const member = msg.guild.members.cache.get(user.id);
    if (user.bot !== true) {
      msg.channel.startTyping();
      const embed = new MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setDescription(`Info on **${user.tag}** (ID: ${user.id})`)
        .setColor('0x0000FF')
        .setTitle(user.tag)
        .addField(
          '🛡️ **Guild-based Info:**',
          `Nickname: ${member.nickname ? member.nickname : 'No nickname'}\nRoles: ${member.roles.cache
            .map(roles => `\`${roles.name}\``)
            .join(', ')}\nJoined at: ${member.joinedAt}`
        )
        .addField(
          '🚶 **User Info:**',
          `Created at: ${user.createdAt}\n${user.bot ? 'Account Type: Bot' : 'Account Type: User'}\nStatus: ${user.presence.status}\nGame: ${
            user.presence.game ? user.presence.game.name : 'None'
          }`
        );
      msg.channel.send({
        embed,
      });
      msg.channel.stopTyping();
    } else if (user.bot === true) {
      msg.channel.startTyping();
      request.get(`https://discordbots.org/api/bots/${user.id}/stats`, (err, res, body) => {
        if (err) return console.error;
        body = JSON.parse(body);
        const embed = new MessageEmbed()
          .setThumbnail(user.avatarURL())
          .setDescription(`Info on **${user.tag}** (ID: \`${user.id}\`)`)
          .setColor('0x0000FF')
          .setTitle(user.tag)
          .addField(
            '🛡️ **Guild-based Info:**',
            `Nickname: ${member.nickname ? member.nickname : 'No nickname'}\nRoles: ${member.roles.cache
              .map(roles => `\`${roles.name}\``)
              .join(', ')}\nJoined at: ${member.joinedAt}`
          )
          .addField(
            '🚶 **User Info:**',
            `Created at: ${user.createdAt}\n${user.bot ? 'Account Type: Bot' : 'Account Type: User'}\nStatus: ${user.presence.status}\nGame: ${
              user.presence.game ? user.presence.game.name : 'None'
            }`
          )
          .addField(
            '🤖 **Bot Info:**',
            `Servers: ${body.server_count ? `${body.server_count}` : 'Could not get server count'} \nUpvotes: ${
              body.points ? `${body.points}` : 'Could not get bot stats'
            } \nDescription: ${body.shortdesc ? `${body.shortdesc}` : 'Could not get bot info'}`
          );
        msg.channel.send({
          embed,
        });
        msg.channel.stopTyping();
      });
    }
  },
  help: 'Get info about you or another user/bot',
  hide: false,
  args: '[@mention]',
};
