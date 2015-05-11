
var config = require('./config');

module.exports = {
  client_id: config.client_id,
    token: config.token,
  api: 'https://api.soundcloud.com',
  pageSize: 32,
  callback_url: 'http://localhost:8080',
};

