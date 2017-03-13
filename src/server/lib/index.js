import isomorphicRenderer from './isomorphic-renderer';
import contextMiddleware from './context-middleware';
import headerRenderer from './header-renderer-middleware';
import assetUrl from './asset-url-middleware';

export const applyMiddleware = ({routes, header}) => (req, res, next) => {
  const args = [req, res, next];

  contextMiddleware(...args);
  assetUrl(...args);
  headerRenderer(header)(...args);
  isomorphicRenderer(routes)(...args);

  next();
}
