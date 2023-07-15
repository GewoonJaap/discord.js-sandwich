const serverBlackLists = require('../model/serverblacklists');
const { MessageEmbed } = require('discord.js');
const log = require('fancy-log');

module.exports = {
  checkBlacklist: async (bot, guildId) => {
    return await serverBlackLists.findOne({ guildId: guildId });
  },
  getBlacklistEmbed: blacklist => {
    log(`Server: ${blacklist.guildId} is blacklisted, blocking command`);
    const embed = new MessageEmbed()
      .setColor('#FF5733')
      .setTitle(`This server has been blacklisted from using this bot by <@${blacklist.blacklistedBy}>`)
      .setDescription(`Reason: \`\`\`${blacklist.reason}\`\`\``)
      .setFooter('If you think this is a mistake, please contact the bot owner or join the support server (https://discord.gg/c3vfHJEQQ5)')
      .setTimestamp();
    return [embed];
  },
};
