const { set } = require('mongoose');
const config = require('../config.json');
const settingsList = require('../util/settings.json');
module.exports = {
  main: (bot, msg) => {
    if (!msg.member.hasPermission('MANAGE_CHANNELS') && config.OWNERID != msg.author.id) {
      return msg.channel.send(`Sorry, you don't have enough permissions to do this! You need to have the \`\`MANAGE_CHANNELS\`\` permission.`);
    }
    const setting = msg.args[0];
    const value = msg.args[1];
    if (!setting || !getSettingByValue(setting))
      return msg.channel.send(
        `You are missing the setting you want to set or the setting type you entered is incorrect. All settings that are available: ${getAllSettingNames().toString()}\nCommand usage: ${
          config.PREFIX
        }settings <\`\`setting type\`\`>`
      );
    const foundSetting = getSettingByValue(setting);
    if (!value && foundSetting.args.length != 0)
      return msg.channel.send(
        `You are missing arguments. Command usage: ${config.PREFIX}settings ${foundSetting.value} <\`\`${foundSetting.args.toString()}\`\`>`
      );
    require(`../util/settings/${setting}.js`).execute(bot, msg);
  },
  hide: false,
  help: 'Configure the server settings',
};

function getAllSettingNames() {
  let settings = [];
  settingsList.forEach(setting => {
    settings.push(`\`\`${setting.value}\`\``);
  });
  return settings;
}

function getSettingByValue(value) {
  const setting = settingsList.filter(function (setting) {
    return setting.value == value;
  });
  return setting[0];
}
