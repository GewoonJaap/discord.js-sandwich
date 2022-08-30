const si = require('systeminformation');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const os = require('os');
const botStats = require('../../model/botstats');
module.exports = {
  execute: async function (bot) {
    const cpuData = await si.cpu();
    const osInfo = await si.osInfo();

    const result = await botStats.find({});
    const embed = new MessageEmbed()
      .setColor(bot.COLOR)
      .setTitle('Some stats about me :)')
      .addField('🖥️CPU:', `${cpuData.manufacturer} ${cpuData.brand}`, false)
      .addField('🖥️Platform:', `${osInfo.distro}`, false)
      .addField('💾RAM usage:', `${bytesToSize(os.freemem())}/${bytesToSize(os.totalmem())}`, false)
      .addField('🏫Amount of guilds I am in', `${bot.guilds.cache.size}`, false)
      .addField('🥪Amount of sandwiches I serve in those guilds', `${bot.users.cache.size}`, false)
      .addField('🥪Amount of commands I recieved', `${result[0].commandsRecieved} and ${result[0].slashCommandsRecieved} slash commands`, false)
      .addField('🥪Amount of messages I sent', `${result[0].messagesSent}`, false)
      .addField('ℹ️My source code', `https://github.com/GewoonJaap/discord.js-sandwich`, true)
      .addField('✉️Invite me', `${config.BOT_INVITE}`, true)
      .addField('✉️Support server', `${config.BOT_SUPPORT_GUILD_INVITE}`, true)
      .addField('🖊️Coded by:', `Mr. Proper#2095`, true)
      .setThumbnail(bot.user.avatarURL())
      .setTimestamp();
    return [embed];
  },
  description: 'Get basic information about the bot',
};

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
