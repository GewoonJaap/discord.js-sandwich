let timers = {};
const log = require('fancy-log');
const fs = require('fs');
module.exports = {
  init: function (bot) {
    let files = fs.readdirSync(__dirname);
    for (let file of files) {
      if (file.endsWith('.js') && !file.endsWith('index.js')) {
        timers[file.slice(0, -3)] = require(__dirname + '/' + file);
        setInterval(function () {
          timers[file.slice(0, -3)].execute(bot);
        }, timers[file.slice(0, -3)].time);

        if (bot.DETAILED_LOGGING) log('Loaded ' + file);
      }
    }
    log.info('———— All Timers Loaded! ————');
  },
};
