const quotes = require('../util/bobross_quote.json');
module.exports = {
  main: function (bot, msg) {
    bot.sendNotification(`🧠📣: ${quotes[Math.floor(Math.random() * quotes.length)]}`, 'success', msg);
  },
  help: 'Get a random bobross quote',
  hide: false,
};
