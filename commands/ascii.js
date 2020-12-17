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
        msg.channel.send('```' + converted + '```').catch(console.error);
      }
    );
  },
  hide: false,
  help: 'Transform an image into ascii art',
  args: '<string>',
};

function isURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(str);
}
