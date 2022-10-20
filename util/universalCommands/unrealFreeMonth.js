const { MessageEmbed } = require('discord.js');
const request = require('../apiRequest');
module.exports = {
  execute: async function () {
    const data = await request.execute(
      'https://www.unrealengine.com/marketplace/api/assets?lang=en-US&start=0&count=100&sortBy=effectiveDate&sortDir=DESC&tag[]=4910'
    );
    if (data.status) {
      let freeAssets = [];
      let freeAssetsEmbeds = [];
      const assets = data.data.data.elements;
      for (let i = 0; i < assets.length; i++) {
        if (assets[i].status == 'ACTIVE') {
          freeAssets.push(assets[i]);
        }
      }
      freeAssets.forEach(asset => {
        const embed = new MessageEmbed()
          .setColor('0x0000FF')
          .setTitle(`Free Unreal Engine asset for the month: ${asset.title}`)
          .setDescription(`${asset.title} by ${asset.seller.name}`)
          .setThumbnail(asset.thumbnail)
          .setImage(asset.featured)
          .setURL(`https://www.unrealengine.com/marketplace/en-US/product/${asset.urlSlug}`)
          .setTimestamp();
        console.log(`Created embed for ${asset.title}`);
        freeAssetsEmbeds.push(embed);
      });
      return freeAssetsEmbeds;
    } else {
      const embed = new MessageEmbed()
        .setColor('0x0000ff')
        .setTitle(`Free assets of the month: NOT FOUND`)
        .setDescription("Sorry, we couldn't fetch the free assets of the month :(")
        .setTimestamp();
      return [embed];
    }
  },
  description: 'Get the Unreal Engine free assets of the month',
};
