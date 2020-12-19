const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
module.exports = {
  main: async function (bot, msg) {
    try {
      const quality = parseInt(msg.args[0]) || 0.5;
      const image = msg.args[1] || msg.author.displayAvatarURL({ format: 'png', size: 512 });
      const { body } = await request.get(image);
      const data = await loadImage(body);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(data, 0, 0);
      const attachment = canvas.toBuffer('image/jpeg', { quality: quality / 10 });
      if (Buffer.byteLength(attachment) > 8e6) return msg.reply('Resulting image was above 8 MB.');
      return msg.channel.send({ files: [{ attachment, name: 'needs-more-jpeg.jpeg' }] });
    } catch (err) {
      return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  },
  help: 'Deserves some JPEG',
  args: '<quality 0.1-10> [img url]',
  hide: false,
};
