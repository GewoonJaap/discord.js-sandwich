const request = require('request');
module.exports = {
  execute: function (url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          try{
          body = JSON.parse(body);
          } catch(e){
          }
          resolve({ status: true, data: body, headers: res.headers });
        } else {
          resolve({ status: false });
        }
      });
    });
  },
  post: function (url, headers, data) {
    const options = {
      url: url,
      method: 'POST',
      headers: headers,
      body: data,
      json: true,
    };

    return new Promise(function (resolve, reject) {
      request.post(options, async function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve({ status: true, data: body, headers: res.headers });
        } else {
          resolve({ status: false });
        }
      });
    });
  },
  streamToString: function (stream) {
    return Buffer.from(stream).toString('utf8');
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
      stream.on('error', err => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  },
};
