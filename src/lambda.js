var app = require('./server-bundle');

exports.handler = function (event, context) {
  app.awsServerlessProxy(event, context)
};
