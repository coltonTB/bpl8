import fs from 'fs';
import http from 'http';

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

export default function fetchSiteContent(stageContext, callback) {

  switch(stageContext.stage) {
    case 'local':
    case 'static':
      fs.readFile(`${__dirname}/../../content/content.json`, (err, res) => {
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
