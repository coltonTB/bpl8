var app = require('./dist/lambda/server-bundle');

exports.handler = function (event, context) {
  app.awsServerlessProxy(event, context)
};
