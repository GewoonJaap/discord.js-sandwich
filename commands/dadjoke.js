const request = require('request');

module.exports = {
  main: function (bot, msg) {
    const headers = {
      Accept: 'application/json',
    };

    const options = {
      url: 'https://icanhazdadjoke.com/',
      headers: headers,
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const parsed = JSON.parse(body);
        bot.sendNotification(`😂😂😂 ${parsed.joke} 😂😂😂`, 'success', msg);
      } else {
        bot.sendNotification(`Something went wrong, joke was not funny enough.`, 'error', msg);
      }
    }

    request(options, callback);
  },
  help: 'Get a very funny dadjoke😂😂😂',
  hide: false,
};
