const spaceX = require('../util/universalCommands/spacex');
module.exports = {
  main: async function (bot, msg) {
    let option = 'latest';
    if (msg.args.length != 0) {
      option = msg.args[0].toString().toLowerCase();
    }
    const embed = await spaceX.execute(bot, option);
    embed.forEach(launch => {
      msg.channel.send(launch);
    });
  },
  help: spaceX.description,
  args: '[``latest`` | ``next``]',
};
