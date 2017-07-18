import AWS from 'aws-sdk';
import fs from 'fs';
import async from 'async';
import dotty from 'dotty';
import packageJson from '../package.json';

const s3 = new AWS.S3();
const CONTENT_LOCATION = `${__dirname}/../../content/content.json`;

export function fetchSiteContent(stageContext, callback) {
  switch(stageContext.stage) {
    case 'local':
    case 'static':
      fs.readFile(CONTENT_LOCATION, (err, res) => {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(res));
      });
      break;
    case 'lambda':
      const params = {
        Bucket: packageJson.config.s3BucketName,
        Key: 'content/content.json',
        ResponseContentType: 'application/json'
      };
      s3.getObject(params, (err, res) => {
        if (err) {
          return callback(err);
        }
        const rawData = dotty.get(res, 'Body');
        callback(null, JSON.parse(rawData))
      });
      break;
    default:
      callback(null, {});
  }
}

export function updateSiteContent(stageContext, {path, data}, callback) {
  switch(stageContext.stage) {
    case 'local':
    case 'static':
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
