export function tryParse(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return {};
  }
}

export function onMessage(e, cb) {
   const message = tryParse(e.data);
   if (message.topic === '__refresh_content') {
     cb();
   }
}

export function sendMessage(e) {
  const path = e.pathname.substr(1);
  const event = {
    topic: '__viewer_route_change',
    path
  };
  window.top.postMessage(JSON.stringify(event), '*');
}
