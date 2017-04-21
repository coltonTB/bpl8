var fs = require('fs');
var exec = require('child_process').exec;

var routes = require('./routes.json');

function downloadRoute(route, i) {
  setTimeout(function() {
    exec('curl localhost:3000' + route, function(error, stdout, stderr) {
      var routeName = route === '/' ? '/index.html' : route;
      fs.writeFileSync('./dist/static-site' + routeName, stdout);
    });
  }, 200 * i);
}

exec('mkdir ./dist/static-site', function() {
  routes.forEach(downloadRoute);
});
