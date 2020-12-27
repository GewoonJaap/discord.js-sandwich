const spaceX = require('../util/spaceX/spaceX');
const { MessageEmbed } = require('discord.js');
const helper = require('../util/helper');
module.exports = {
  main: async function (bot, msg) {
    let launch;
    if (msg.args.length != 0) {
      const option = msg.args[0].toString().toLowerCase();
      switch (option) {
        case 'latest':
          launch = await spaceX.GetLatestLaunch();
          break;
        case 'next':
          launch = await spaceX.GetUpcomingLaunch();
          break;
        default:
          launch = await spaceX.GetUpcomingLaunch();
          break;
      }
    }
    if (!launch) launch = await spaceX.GetUpcomingLaunch();
    if (!launch.status) return message.reply(`Something went wrong while trying to fetch the data!`);

    const rocketInfo = `${launch.data.name} uses the ${launch.data.rocket.name} rocket produced by ${launch.data.rocket.company}.\nThe ${launch.data.rocket.name} rocket has ${launch.data.rocket.landing_legs.number} landing legs made from: ${launch.data.rocket.landing_legs.material}. The ${launch.data.rocket.name} rocket uses ${launch.data.rocket.engines.number} ${launch.data.rocket.engines.type} ${launch.data.rocket.engines.version} engines. The engines burn for ${launch.data.rocket.first_stage.burn_time_sec} seconds, using ${launch.data.rocket.first_stage.fuel_amount_tons} tons of fuel.\n${launch.data.rocket.description}\n${launch.data.rocket.wikipedia}`;
    const embed = new MessageEmbed()
      .setColor('005288')
      .setThumbnail(
        launch.data.links.patch.large ||
          launch.data.links.patch.small ||
          helper.randomFromArray(launch.data.rocket.flickr_images) ||
          'https://i.imgur.com/iXwW2Pv.png'
      )
      .setTitle(`SpaceX Launch info for: ${launch.data.rocket.name} | ${launch.data.name}`)
      .addField(`🚀 Rocket:`, rocketInfo, false)
      .setTimestamp();
    msg.channel.send(msg.author, { embed });
  },
  help: 'Get info about the upcoming rocket launch from SpaceX',
};
