module.exports = {
  main: function (bot, msg) {
    const user = msg.mentions.users.first() || msg.author;
    let embed = {
      color: 0x333333,
      author: { name: user.username },
      image: { url: user.avatarURL() },
    };
    msg.channel.send('', {
      embed,
    });
  },
  help: 'Get your avatar',
  hide: false,
  args: '[@mention]',
};
