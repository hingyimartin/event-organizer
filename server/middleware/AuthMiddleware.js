import { verifyAccessToken } from '../utils/TokenHelper.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You dont have permission to use this',
      });
    }
    next();
  };
};

export const authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Access token is missing',
    });
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid access token' });
  }
};
