const request = require('request');
module.exports = {
  execute: function () {
    return new Promise(function (resolve, reject) {
      request(
        'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=NL&allowCountries=NL',
        function (error, res, body) {
          if (!error && res.statusCode == 200) {
            body = JSON.parse(body);
            resolve({ status: true, data: body });
          } else {
            reject({ status: false });
          }
        }
      );
    });
  },
};
