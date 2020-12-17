const responses = require('../8ball_responses.json');
module.exports = {
  execute: function () {
    return `👀: ${responses[Math.floor(Math.random() * responses.length)]}`;
  },
  description: '8Ball will decide👀 👀',
};
