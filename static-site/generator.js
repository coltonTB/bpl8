var fs = require('fs');
var exec = require('child_process').exec;

var routes = require('./routes.json');

function downloadRoute(route, i) {
  setTimeout(function() {
    exec('curl -H x-static-generator:true localhost:3000' + route, function(error, stdout, stderr) {
      var routeName = route === '/' ? '/index.html' : route;
      fs.writeFileSync('./dist/static-pages' + routeName, stdout);
      process.stdout.write('\t- ' + routeName + '\n');
    });
  }, 200 * i);
}

exec('curl localhost:3000/health', function(error, stdout, stderr) {
  if (stdout !== 'OK') {
    process.stderr.write('Server process is not healthy. Exiting\n');
    process.abort();
  }
  exec('mkdir ./dist/static-pages', function() {
    routes.forEach(downloadRoute);
    process.stdout.write('Generating static pages\n');
  });
});
