const config = require('../config.json');
const Mustache = require('mustache');
module.exports = {
  setDefaultStatus: bot => {
    const view = {
      users: bot.users.cache.size,
      servers: bot.guilds.cache.array().length,
      prefix: config.PREFIX,
    };
    const output = Mustache.render(config.DEFAULT_ACTIVITY, view);
    bot.user.setPresence({ activity: { name: output }, status: 'idle' }).catch(console.error);
    return output;
  },
  setCustomStatus: (bot, status) => {
    const view = {
      users: bot.users.cache.size,
      servers: bot.guilds.cache.array().length,
      prefix: config.PREFIX,
    };
    const output = Mustache.render(status, view);
    bot.user.setPresence({ activity: { name: output }, status: 'idle' }).catch(console.error);
    return output;
  },
};
