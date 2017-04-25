import content from '../content/content.json';

export default function fetchSiteContent(stageContext, callback) {
  if (stageContext.stage === 'local') {
    return callback(null, content);
  }
}
