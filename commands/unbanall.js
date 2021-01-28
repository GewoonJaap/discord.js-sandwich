module.exports = {
  main: function (bot, msg) {
    if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.id == bot.OWNERID) {
      if (!msg.guild.me.hasPermission('BAN_MEMBERS')) {
        return bot.sendNotification('Please grant me the BAN_MEMBERS permission.', 'error', msg);
      }
      let amountOfBanned = 0;
      msg.guild
        .fetchBans()
        .then(bans => {
          if (bans.size == 0) {
            bot.sendNotification(`There are no banned users`, 'success', msg);
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
      return bot.sendNotification('You need to be an Administrator to do this!', 'error', msg);
    }
  },
  help: 'Unbans all the banned users from this guild',
  hide: false,
};
