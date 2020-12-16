module.exports = {
  main: function (bot, msg) {
    const start = Date.now();
    let stop, diff;
    msg.channel.send('Pong!').then(function (newMsg) {
      stop = Date.now();
      diff = stop - start;
      newMsg.edit('Pong! `(' + diff + 'ms)`');
    });
  },
  help: 'Ping the bot',
  hide: false,
};
