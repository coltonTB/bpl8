import fs from 'fs';

export default function fetchSiteContent(stageContext, callback) {
  if (stageContext.stage === 'local') {
    const content = fs.readFileSync(__dirname + '/../../content/content.json');
    return callback(null, JSON.parse(content));
  }
}
