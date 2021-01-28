const helper = require('../util/helper');
module.exports = {
  main: async function (bot, msg) {
    if (!(msg.member.hasPermission('ADMINISTRATOR') || msg.member.id == bot.OWNERID)) {
      return bot.sendNotification('You need to be an Administrator to do this!', 'error', msg);
    }
    if (!msg.guild.me.hasPermission('MANAGE_NICKNAMES')) {
      return bot.sendNotification('Please grant me the MANAGE_NICKNAMES permission.', 'error', msg);
    }
    bot.sendNotification(`Resetting the nicknames, this might take a while..`, 'info', msg);
    const list = bot.guilds.cache.get(msg.guild.id);
    let resetNicknames = 0;
    let failed = 0;
    await list.members.fetch().then(async members => {
      members = members.array();
      await helper.asyncForEach(members, async member => {
        await member.setNickname('').catch(e => {
          failed++;
          console.log(failed);
          resetNicknames--;
        });
        resetNicknames++;
      });
    });
    console.log('done reset');
    if (failed > 1) {
      bot.sendNotification(
        `Faild to reset the usernames of ${failed} users. Make sure to put the Sandwich role above the other roles.`,
        'error',
        msg
      );
    }
    if (resetNicknames > 0) {
      bot.sendNotification(`Resetted the nicknames for ${resetNicknames} users`, 'success', msg);
    }
  },
  help: 'Reset all nicknames in this guild',
  hide: false,
};
