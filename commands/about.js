const si = require('systeminformation');
const config = require('../config.json');
const os = require('os');
module.exports = {
  main: async function (bot, msg) {
    let cmds = [];
    const cpuData = await si.cpu();
    const osInfo = await si.osInfo();

    cmds.push({
      name: `CPU:`,
      value: `${cpuData.manufacturer} ${cpuData.brand}`,
      inline: true,
    });

    cmds.push({
      name: `Platform:`,
      value: `${osInfo.distro}`,
      inline: true,
    });

    cmds.push({
      name: `RAM usage`,
      value: `${bytesToSize(os.freemem())}/${bytesToSize(os.totalmem())}`,
      inline: true,
    });

    cmds.push({
      name: `Guilds the bot is in`,
      value: `${bot.guilds.cache.size}`,
      inline: true,
    });

    cmds.push({
      name: `The amount of people the bot serves`,
      value: `${bot.users.cache.size}`,
      inline: true,
    });

    cmds.push({
      name: `I am open source :), feel free to contribute`,
      value: `https://github.com/GewoonJaap/discord.js-sandwich`,
      inline: true,
    });

    cmds.push({
      name: `Invite me to your server`,
      value: `${config.BOT_INVITE}`,
      inline: true,
    });

    let embed = {
      color: bot.COLOR,
      description: 'Here is some basic info',
      fields: cmds,
      footer: {
        icon_url: bot.user.avatarURL,
        text: bot.user.username,
      },
    };

    msg.channel.send('', {
      embed,
    });
  },
  help: 'Get basic information about the bot',
  hide: false,
};

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
