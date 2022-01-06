import {NextApiRequest, NextApiResponse} from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const HOST = process.env.FLIBRARY_API_HOST || '';
const ENTRYPOINT = process.env.FLIBRARY_API_ENTRYPOINT || '';

const KEY = process.env.FLIBRARY_API_KEY || 'key';
const VALUE = process.env.FLIBRARY_API_VALUE || 'value';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers[KEY] === VALUE) {
    httpProxyMiddleware(req, res, {
      target: HOST,
      pathRewrite: [{
        patternStr: '^/api/flibrary',
        replaceStr: ENTRYPOINT,
      }]
    })
  } else {
    res.statusCode = 401;
    res.statusMessage = 'Please provide valid credentials';
    res.end();
  }
}

export default handler;
