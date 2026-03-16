const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev-shared-secret';

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { verifyToken, secret };
