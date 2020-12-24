const request = require('request');
module.exports = {
  execute: function (url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          body = JSON.parse(body);
          resolve({ status: true, data: body });
        } else {
          resolve({ status: false });
        }
      });
    });
  },
};
