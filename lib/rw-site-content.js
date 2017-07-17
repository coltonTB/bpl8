import fs from 'fs';
import http from 'http';
import async from 'async';

const CONTENT_LOCATION = `${__dirname}/../../content/content.json`;

const fetch = (url, callback) => {
  http.get(url, res => {
    const error = res.status !== 200;
    let rawData = '';
    res.setEncoding('utf8');
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        callback(null, parsedData)
      } catch (e) {
        callback(e, {});
      }
    });
  }).on('error', e => callback(e, {}));
}

export function fetchSiteContent(stageContext, callback) {
  switch(stageContext.stage) {
    case 'local':
    case 'static':
      fs.readFile(CONTENT_LOCATION, (err, res) => {
        callback(err, JSON.parse(res));
      });
      break;
    case 'lambda':
      const contentUrl = stageContext.contentUrl;
      fetch(contentUrl, (err, json) => {
        callback(err, json);
      });
      break;
    default:
      callback(null, {});
  }
}

export function updateSiteContent(stageContext, {path, data}, callback) {
  switch(stageContext.stage) {
    case 'local':
      async.waterfall([
        async.apply(fs.readFile, CONTENT_LOCATION),
        (file, cb) => {
          const content = JSON.parse(file);
          content[path] = data;
          cb(null, JSON.stringify(content));
        },
        (content, cb) => {
          console.log(content);
          fs.writeFile(CONTENT_LOCATION, content, cb)
        }
      ], (callback));
      break;
    case 'lambda':
      const contentUrl = stageContext.contentUrl;
      fetch(contentUrl, (err, json) => {
        callback(err, json);
      });
      break;
    default:
      callback(null, {});
  }
}
