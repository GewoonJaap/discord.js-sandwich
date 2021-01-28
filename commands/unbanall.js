module.exports = {
  main: function (bot, msg) {
    if (!bot.hasPermission('BAN_MEMBERS')) {
      return bot.sendNotification('Please grant me the BAN_MEMBERS permission.', 'error', msg);
    }
    if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.id == bot.OWNERID) {
      let amountOfBanned = 0;
      msg.guild
        .fetchBans()
        .then(bans => {
          if (bans.size == 0) {
            msg.reply('There are no banned users.');
            throw 'No members to unban.';
          }
          amountOfBanned = bans.size;
          bans.forEach(ban => {
            msg.guild.members.unban(ban.user.id);
          });
        })
        .then(() => bot.sendNotification(`Unbanned ${amountOfBanned} users!`, 'success', msg))
        .catch(e => {
          console.log(e);
          bot.sendNotification(`Error: ${e}`, 'error', msg);
        });
    } else {
      bot.sendNotification('You need the BAN_MEMBERS permission.', 'error', msg);
    }
  },
  help: 'Unbans all the banned users from this guild',
  hide: false,
};
