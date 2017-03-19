import React from 'react';

const renderHeader = headerRenderer => (req, res, next) => {
  res.locals.renderHeader = () => {
    return headerRenderer({
      assetUrl: res.locals.assetUrl,
      resourceUrl: res.locals.resourceUrl
    });
  };
  next();
}

export default renderHeader;
