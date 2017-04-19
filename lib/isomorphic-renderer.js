import React from 'react';
import scaffold from './scaffold.js';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { styleSheet } from 'styled-components'

import getLocalContext from './get-local-context';
import withLocalContext from './with-local-context';

const defaultStageContext = {
  stage: 'local',
  resourceBase: '',
  assetBase: ''
};

function getImageUrls() {
  return [
      "RAD.jpg",
      "close.svg",
      "down_arrow.svg",
      "gallery_info.png",
      "hamburger.svg",
      "hero_2.png",
      "insta_shim.png",
      "machine_1.png",
      "machine_2.png",
      "machine_3.png",
      "machine_4.png",
      "machine_5.png",
      "machine_6.png",
      "press.png",
      "social_shim.png",
      "src_1_img_1.png",
      "src_1_img_2.png",
      "store_item_1.png",
      "store_item_2.png",
      "store_item_3.png",
      "store_item_4.png",
      "store_item_5.png",
      "tom_mug.png",
      "video_preview.png"
  ];
}

/*
  Extract stage variables from API gateway
*/
function getStageContext(req) {
  let stageContext;
  const apiGatewayEventHeader = req.headers['x-apigateway-event']
  if (apiGatewayEventHeader) {
    try {
      stageContext = JSON.parse(apiGatewayEventHeader).stageVariables;
    } catch (e) {}
  }
  return stageContext || defaultStageContext;
}

function renderPage({renderProps, stageContext, imageUrls}) {
  const localContext = getLocalContext({stageContext});
  /*
    Hijack createHref function to synchronize assetUrl
    with anchor tags
  */
  const oldCreateHref = renderProps.router.createHref;
  renderProps.router.createHref = path =>
    localContext.resourceUrl(oldCreateHref(path))

  /*
    Render React application root
  */
  const RouterContextWithLocalContext = withLocalContext(
    RouterContext,
    localContext
  );

  const appContent = renderToString(
    <RouterContextWithLocalContext {...renderProps} />
  );

  /*
    Inject app content into the HTML scaffold
  */
  return scaffold(
    {...renderProps, localContext, styleSheet, imageUrls},
    appContent
  );
}

const isomorphicRenderer = routes => (req, res) => {
  match({
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      const html = renderPage({
        renderProps,
        stageContext: getStageContext(req),
        imageUrls: getImageUrls()
      });
      res.status(200).send(html);

    } else {
      res.status(404).send('Not found');
    }
  })
};

export default isomorphicRenderer;
