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
    const embed = new MessageEmbed();
    embed.setColor('005288');
    embed.setDescription(
      launch.data.details || `Here you have some info about the rocket launch: ${launch.data.rocket.name} | ${launch.data.name}`
    );
    embed.setURL(
      launch.data.links.presskit ||
        launch.data.links.webcast ||
        launch.data.links.article ||
        launch.data.links.wikipedia ||
        'https://www.spacex.com/launches/'
    );
    embed.setThumbnail(
      launch.data.links.patch.large ||
        launch.data.links.patch.small ||
        helper.randomFromArray(launch.data.links.flickr.original) ||
        helper.randomFromArray(launch.data.rocket.flickr_images) ||
        'https://i.imgur.com/iXwW2Pv.png'
    );
    embed.setImage(
      helper.randomFromArray(launch.data.links.flickr.original) ||
        helper.randomFromArray(launch.data.rocket.flickr_images) ||
        'https://i.imgur.com/iXwW2Pv.png'
    );
    embed.setTitle(`SpaceX Launch info for: ${launch.data.rocket.name} | ${launch.data.name}`);
    if (launch.data.rocket)
      embed.addField(
        `🚀 Rocket:`,
        `**${launch.data.name}** uses the **${launch.data.rocket.name}** rocket produced by **${launch.data.rocket.company}**.\nThe **${launch.data.rocket.name}** rocket has **${launch.data.rocket.landing_legs.number}** landing legs made from: **${launch.data.rocket.landing_legs.material}**. The **${launch.data.rocket.name}** rocket uses **${launch.data.rocket.engines.number} ${launch.data.rocket.engines.type} ${launch.data.rocket.engines.version}** engines. The engines burn for **${launch.data.rocket.first_stage.burn_time_sec}** seconds, using **${launch.data.rocket.first_stage.fuel_amount_tons}** tons of fuel.\n${launch.data.rocket.description}\n${launch.data.rocket.wikipedia}`,
        false
      );
    if (launch.data.payloads && launch.data.payloads.length > 0) {
      launch.data.payloads.forEach(payload => {
        embed.addField(
          `📦 Payload:`,
          `This rocket will carry a **${payload.name} ${payload.type}**. The customers: **${payload.customers.join(', ')}**`,
          false
        );
      });
    }
    if (launch.data.failures && launch.data.failures.length > 0) {
      embed.addField(
        `🛠️ Failures:`,
        `This launch has the following failures: **${launch.data.failures
          .map(function (failure) {
            return failure.reason;
          })
          .join(', ')}**`
      );
    }
    if (launch.data.launchpad) {
      embed.addField(
        `🏗️ Launchpad:`,
        `For this mission the **${launch.data.launchpad.name}** launchpad is being used, also known as: **${launch.data.launchpad.full_name}**.\nThis launchpad is located in **${launch.data.launchpad.locality} ${launch.data.launchpad.region}**.\nFrom this launchpad, **${launch.data.launchpad.launch_attempts}** rockets where launched, **${launch.data.launchpad.launch_successes}** of which were successful.`,
        false
      );
      embed.addField(`🏗️ Launchpad details:`, `${launch.data.launchpad.details}`, false);
    }
    embed.addField(`🔗 Links:`, `${GetLinks(launch.data.links)}`, false);

    embed.setTimestamp(new Date(launch.data.date_unix * 1000).toISOString());
    embed.setFooter(
      `${launch.data.rocket.name} | ${launch.data.name} | Data by: https://github.com/r-spacex/SpaceX-API`,
      launch.data.links.patch.large || launch.data.links.patch.small || bot.user.avatarURL()
    );
    msg.channel.send(msg.author, { embed });
  },
  help: 'Get info about the upcoming rocket launch from SpaceX',
};

function GetLinks(linksObject) {
  let links = '';
  if (linksObject.presskit) links += `**Presskit**: ${linksObject.presskit}\n`;
  if (linksObject.webcast) links += `**Webcast**: ${linksObject.webcast}\n`;
  if (linksObject.article) links += `**Article**: ${linksObject.article}\n`;
  if (linksObject.wikipedia) links += `**Wikipedia**: ${linksObject.wikipedia}\n`;
  if (links.trim().length == 0) links = '**No links available**';
  return links;
}
