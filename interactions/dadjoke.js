const slashCommand = require('../util/slashcommand/index');
module.exports = {
  registerCommand: function (bot) {
    slashCommand.registerCommand(bot, {
      name: 'dadjoke',
      description: 'Get a very funny dad joke. You are gonna laugh. I promise',
    });
  },

  execute: function (bot, interaction) {
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
        slashCommand.execute(bot, interaction, {
          content: `😂😂😂 ${parsed.joke} 😂😂😂`,
        });
      } else {
        slashCommand.execute(bot, interaction, {
          content: `Something went wrong, joke was not funny enough.`,
        });
      }
    }

    request(options, callback);
  },
};
