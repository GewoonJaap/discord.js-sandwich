const responses = require('../bobross_quote.json');
module.exports = {
  execute: function () {
    return `🧠📣: ${responses[Math.floor(Math.random() * responses.length)]}`;
  },
  description: 'Get a wise Bob Ross quotes',
};
