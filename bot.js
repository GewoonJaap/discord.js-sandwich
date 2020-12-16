'use strict';

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const log = require('fancy-log');
const Mustache = require('mustache');

const bot = new Discord.Client({
  autoReconnect: true,
});

bot.OWNERID = config.OWNERID;
bot.PREFIX = config.PREFIX;
bot.TOKEN = config.TOKEN;

bot.DETAILED_LOGGING = config.DETAILED_LOGGING;
bot.DELETE_COMMANDS = config.DELETE_COMMANDS;

bot.COLOR = config.COLOR;
bot.SUCCESS_COLOR = config.SUCCESS_COLOR;
bot.ERROR_COLOR = config.ERROR_COLOR;
bot.INFO_COLOR = config.INFO_COLOR;

String.prototype.padRight = function (l, c) {
  return this + Array(l - this.length + 1).join(c || ' ');
};

bot.sendNotification = function (info, type, msg) {
  let icolor;

  if (type == 'success') icolor = bot.SUCCESS_COLOR;
  else if (type == 'error') icolor = bot.ERROR_COLOR;
  else if (type == 'info') icolor = bot.INFO_COLOR;
  else icolor = bot.COLOR;

  let embed = {
    color: icolor,
    description: info,
  };
  msg.channel.send('', {
    embed,
  });
};

let commands = {};

commands.help = {};
commands.help.args = '';
commands.help.help = 'Displays a list of usable commands.';
commands.help.main = function (bot, msg) {
  let cmds = [];

  for (let command in commands) {
    if (!commands[command].hide) {
      cmds.push({
        name: bot.PREFIX + command,
        value: commands[command].help,
        inline: true,
      });
    }
  }

  let embed = {
    color: bot.COLOR,
    description: 'Here are a list of commands you can use.',
    fields: cmds,
    footer: {
      icon_url: bot.user.avatarURL,
      text: bot.user.username,
    },
  };

  msg.channel.send('', {
    embed,
  });
};

commands.load = {};
commands.load.args = '<command>';
commands.load.help = '';
commands.load.hide = true;
commands.load.main = function (bot, msg) {
  if (msg.author.id == bot.OWNERID) {
    try {
      delete commands[msg.content];
      delete require.cache[__dirname + '/commands/' + msg.content + '.js'];
      commands[msg.content] = require(__dirname + '/commands/' + msg.content + '.js');
      bot.sendNotification('Loaded ' + msg.content + '.js succesfully.', 'success', msg);
      log.info(`Loaded ${msg.content}.js succesfully.`);
    } catch (err) {
      bot.sendNotification('The command was not found, or there was an error loading it.', 'error', msg);
    }
  } else {
    bot.sendNotification('You do not have permission to use this command.', 'error', msg);
  }
};

commands.unload = {};
commands.unload.args = '<command>';
commands.unload.help = '';
commands.unload.hide = true;
commands.unload.main = function (bot, msg) {
  if (msg.author.id == bot.OWNERID) {
    try {
      delete commands[msg.content];
      delete require.cache[__dirname + '/commands/' + msg.content + '.js'];
      bot.sendNotification('Unloaded ' + msg.content + '.js succesfully.', 'success', msg);
      log.info(`Unloaded ${msg.content}.js succesfully.`);
    } catch (err) {
      bot.sendNotification('Command not found.', 'error', msg);
    }
  } else {
    bot.sendNotification('You do not have permission to use this command.', 'error', msg);
  }
};

commands.reload = {};
commands.reload.args = '';
commands.reload.help = '';
commands.reload.hide = true;
commands.reload.main = function (bot, msg) {
  if (msg.author.id == bot.OWNERID) {
    try {
      delete commands[msg.content];
      delete require.cache[__dirname + '/commands/' + msg.content + '.js'];
      commands[msg.content] = require(__dirname + '/commands/' + msg.content + '.js');
      bot.sendNotification('Reloaded ' + msg.content + '.js successfully.', 'success', msg);
      log.info(`Reloaded ${msg.content}.js succesfully.`);
    } catch (err) {
      msg.channel.send('Command not found');
    }
  } else {
    bot.sendNotification('You do not have permission to use this command.', 'error', msg);
  }
};

var loadCommands = function () {
  let files = fs.readdirSync(__dirname + '/commands');
  for (let file of files) {
    if (file.endsWith('.js')) {
      commands[file.slice(0, -3)] = require(__dirname + '/commands/' + file);
      if (bot.DETAILED_LOGGING) log('Loaded ' + file);
    }
  }
  log.info('———— All Commands Loaded! ————');
};

var checkCommand = function (msg, isMention) {
  if (isMention) {
    let command = msg.content.split(' ')[1].toLowerCase();
    msg.content = msg.content.split(' ').splice(2, msg.content.split(' ').length).join(' ');
    if (command && commands[command]) commands[command].main(bot, msg);
  } else {
    let command = msg.content.split(bot.PREFIX)[1].split(' ')[0].toLowerCase();
    msg.content = msg.content.replace(bot.PREFIX + command + ' ', '');
    if (command && commands[command]) commands[command].main(bot, msg);
  }
};

bot.on('ready', () => {
  require('./util/botStatus').setDefaultStatus(bot);
  loadCommands();
  setInterval(function () {
    require('./util/botStatus').setDefaultStatus(bot);
  }, 1000 * 120);
});

bot.on('message', msg => {
  if (msg.content.startsWith('<@' + bot.user.id + '>') || msg.content.startsWith('<@!' + bot.user.id + '>')) {
    checkCommand(msg, true);
    if (bot.DELETE_COMMANDS) msg.delete();
  } else if (msg.content.startsWith(bot.PREFIX)) {
    checkCommand(msg, false);
    if (bot.DELETE_COMMANDS) msg.delete();
  }
});

bot.on('guildMemberAdd', function (member) {
  console.log(`a user joins a guild: ${member.tag}`);
});

bot.on('error', err => {
  log.error('————— BIG ERROR —————');
  log.error(err);
  log.error('——— END BIG ERROR ———');
});

bot.on('disconnected', () => {
  log.error('Disconnected!');
});

bot.login(bot.TOKEN);
