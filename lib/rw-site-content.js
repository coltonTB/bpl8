import AWS from 'aws-sdk';
import fs from 'fs';
import async from 'async';
import dotty from 'dotty';
import packageJson from '../package.json';
import staticRoutes from '../static-routes.json';

const s3 = new AWS.S3();
const lambda = new AWS.Lambda({region: 'us-west-1'});
const CONTENT_LOCATION = `${__dirname}/../../content/content.json`;
const s3Params = {
  Bucket: packageJson.config.s3BucketName,
  Key: 'content/content.json'
};
const errorUndefined = () => new Error('Behavior is undefined for this stage value');

function getContentFromDisc(callback) {
  fs.readFile(CONTENT_LOCATION, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(res));
  });
}
function getContentFromS3(callback) {
  s3.getObject(s3Params, (err, res) => {
    if (err) {
      return callback(err);
    }
    const rawData = dotty.get(res, 'Body');
    callback(null, JSON.parse(rawData))
  });
}
const mergeContent = (path, data) => (staleContent, cb) => {
  cb(null, JSON.stringify({
    ...staleContent,
    [path]: data
  }));
}

export function fetchSiteContent(stageContext, callback) {
  switch(stageContext.stage) {
    case 'local':
    case 'prod':
      getContentFromDisc(callback);
      break;
    case 'static':
    case 'lambda':
      getContentFromS3(callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function updateSiteContent(stageContext, {path, data}, callback) {
  switch(stageContext.stage) {
    case 'local':
      async.waterfall([
        async.apply(getContentFromDisc),
        mergeContent(path, data),
        (content, cb) => fs.writeFile(CONTENT_LOCATION, content, cb)
      ], callback);
      break;
    case 'lambda':
      async.waterfall([
        async.apply(getContentFromS3),
        mergeContent(path, data),
        (content, cb) => s3.putObject({...s3Params, Body: content}, cb)
      ], callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function publishSite(stageContext, callback) {
  switch(stageContext.stage) {
    case 'lambda':
      lambda.invoke({
        FunctionName: 'StaticPublisher',
        Payload: JSON.stringify({
          stageContext,
          packageConfig: packageJson.config,
          routes: staticRoutes
        })
      }, callback);
      break;
    default:
      callback(errorUndefined());
  }
}
