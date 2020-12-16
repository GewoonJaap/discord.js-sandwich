module.exports = {
  main: function (bot, msg) {
    const result = Math.random() < 0.5 ? 'Tails' : 'Heads';
    bot.sendNotification(`📢 ${result}`, 'success', msg);
  },
  help: 'Simple coinflip',
  hide: false,
};
