import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, resp, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp.status(401).json({ error: 'Token not found' });
  }

  try {
    const [, token] = authHeader.split(' ');
    const decode = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decode.id;
    return next();
  } catch (error) {
    return resp.status(401).json({ error: 'Token invalid' });
  }
};
