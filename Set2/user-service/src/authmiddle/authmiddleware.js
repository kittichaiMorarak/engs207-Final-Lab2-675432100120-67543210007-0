const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev-shared-secret';

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
};
