const imageToAscii = require('image-to-ascii');
module.exports = {
  main: (bot, msg) => {
    let url = msg.content;
    msg.attachments.forEach(attachment => {
      // do something with the attachment
      url = attachment.url;
    });
    imageToAscii(
      url,
      {
        colored: false,
      },
      (err, converted) => {
        if (err) return bot.sendNotification(`Invalid image! Please use .ascii <imgurl>`, 'error', msg);
        if (converted.length >= 2000 - 6)
          return msg.channel.send(`Sorry, couldn't progress your image. The ascii result is longer than 2000 characters :(`);
        msg.channel.send('```' + converted + '```').catch(console.error);
      }
    );
  },
  hide: false,
  help: 'Transform an image into ascii art',
  args: '<string>',
};
