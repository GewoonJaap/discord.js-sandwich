module.exports = {
  main: function (bot, msg) {
    let reversed = '';
    let i = msg.content.length;

    while (i > 0) {
      reversed += msg.content.substring(i - 1, i);
      i--;
    }
    msg.channel.send(reversed);
  },
  help: 'Reverse your text',
  hide: false,
  args: '<string>',
};
