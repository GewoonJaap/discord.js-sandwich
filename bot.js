'use strict';

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const log = require('fancy-log');
const timers = require('./util/timers/index');
const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true });
const serverConfig = require('./util/serverconfig');
const serverStats = require('./util/stats/serverStatsHandler');

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

bot.cache = {};
bot.cache.stats = { commandsRecieved: 0, slashCommandsRecieved: 0, messagesSent: 0 };

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
let interactions = {};

commands.help = {};
commands.help.args = '';
commands.help.help = 'Displays a list of usable commands.';
commands.help.main = function (bot, msg) {
  let cmds = [];

  for (let command in commands) {
    if (!commands[command].hide) {
      cmds.push({
        name: bot.PREFIX + command + `${commands[command].args ? ' ' + commands[command].args : ''}`,
        value: commands[command].help,
        inline: true,
      });
    }
  }

  let embed = {
    color: bot.COLOR,
    description: 'Here is a list of commands you can use.',
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

function loadInteractions() {
  let files = fs.readdirSync(__dirname + '/interactions');
  for (let file of files) {
    if (file.endsWith('.js')) {
      interactions[file.slice(0, -3)] = require(__dirname + '/interactions/' + file);
      interactions[file.slice(0, -3)].registerCommand(bot);
      if (bot.DETAILED_LOGGING) log('Loaded ' + file);
    }
  }
  log.info('———— All Interactions Loaded! ————');
}

// remove all unused interactions
async function removeUnusedInteractions() {
  let commands = await bot.api.applications(bot.user.id).commands.get();
  log.info('———— Removing Unused Interactions ————');
  for (let command of commands) {
    if (!interactions[command.name]) {
      await bot.api.applications(bot.user.id).commands(command.id).delete();
      bot.api
        .applications(bot.user.id)
        .commands.fetch(command.id)
        .then(cmd => {
          cmd.delete();
        })
        .catch(err => {
          log.error(err);
        });

      log('Removed unused interaction ' + command.name);
    }
  }
  log.info('———— Unused Interactions Removed! ————');
}

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
    if (!msg.content.split(' ')[1]) return;
    let command = msg.content.split(' ')[1].toLowerCase();
    msg.content = msg.content.split(' ').splice(2, msg.content.split(' ').length).join(' ');
    if (command && commands[command]) {
      commands[command].main(bot, msg);
      serverStats.addStats(bot, msg.guild.id, 'commandsExecuted', msg.channel.id);
      bot.cache.stats.commandsRecieved++;
      bot.cache.stats.messagesSent++;
    }
  } else {
    let command = msg.content.split(bot.PREFIX)[1].split(' ')[0].toLowerCase();
    msg.content = msg.content.replace(bot.PREFIX + command + ' ', '');
    if (command && commands[command]) {
      commands[command].main(bot, msg);
      serverStats.addStats(bot, msg.guild.id, 'commandsExecuted', msg.channel.id);
      bot.cache.stats.commandsRecieved++;
      bot.cache.stats.messagesSent++;
    }
  }
};

bot.on('ready', () => {
  require('./util/botStatus').setDefaultStatus(bot);
  loadCommands();
  loadInteractions();
  timers.init(bot);
  setInterval(function () {
    require('./util/botStatus').setDefaultStatus(bot);
  }, 1000 * 120);
  removeUnusedInteractions();
});

bot.on('message', msg => {
  if (msg.author.bot || msg.guild === null) return;
  msg.args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
  msg.args.shift();
  serverStats.addStats(bot, msg.guild.id, 'messagesRecieved', msg.channel.id);

  if (!config.DEVMODE || (config.DEVMODE && msg.guild.id == config.DEV_SERVER)) {
    if (msg.content.startsWith('<@' + bot.user.id + '>') || msg.content.startsWith('<@!' + bot.user.id + '>')) {
      msg.args.shift();
      checkCommand(msg, true);
      if (bot.DELETE_COMMANDS) msg.delete();
    } else if (msg.content.startsWith(bot.PREFIX)) {
      checkCommand(msg, false);
      if (bot.DELETE_COMMANDS) msg.delete();
    }
  }
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
  const interaction_name = interaction.data.name;
  if (!config.DEVMODE || (config.DEVMODE && interaction.guild_id == config.DEV_SERVER)) {
    if (interaction_name && interactions[interaction_name]) {
      interactions[interaction_name].execute(bot, interaction);
      bot.cache.stats.slashCommandsRecieved++;
      bot.cache.stats.messagesSent++;
      serverStats.addStats(bot, interaction.guild_id, 'slashCommandsExecuted', interaction.channel_id);
    }
  }
});

bot.on('guildMemberAdd', function (member) {
  log(`a user joins a guild: ${member.user}`);
});

bot.on('guildCreate', function (guild) {
  log(`the client joins a guild: ${guild.id}`);
  serverConfig.addConfig(bot, guild.id);
  serverStats.addServer(guild.id);
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
