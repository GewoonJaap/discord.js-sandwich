const serverBlackLists = require('../model/serverblacklists');
const userBlackLists = require('../model/userblacklists');
const { MessageEmbed } = require('discord.js');
const log = require('fancy-log');

module.exports = {
  checkBlacklist: async (bot, guildId, userId) => {
    return (await serverBlackLists.findOne({ guildId: guildId })) ?? (await userBlackLists.findOne({ userId: userId }));
  },
  getBlacklistEmbed: blacklist => {
    const title = `This ${blacklist.userId ? 'User' : 'Server'} has been blacklisted from using this bot`;
    const blacklistedUserText = blacklist.userId ? `**Blacklisted user**: <@${blacklist.userId}>` : '';
    log(title);
    const embed = new MessageEmbed()
      .setColor('#FF5733')
      .setTitle(title)
      .setDescription(`Reason: \`\`\`${blacklist.reason}\`\`\`\n**Blacklisted by**: <@${blacklist.blacklistedBy}>\n${blacklistedUserText}`)
      .setFooter('If you think this is a mistake, please contact the bot owner or join the support server (https://discord.gg/c3vfHJEQQ5)')
      .setTimestamp();
    return embed;
  },
};
