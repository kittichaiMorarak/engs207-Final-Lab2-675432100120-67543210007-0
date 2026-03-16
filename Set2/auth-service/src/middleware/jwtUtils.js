const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev-shared-secret';
const expires = process.env.JWT_EXPIRES_IN || '1h';

const generateToken = (payload) => {
  return jwt.sign(
    { sub: payload.id, username: payload.username, email: payload.email, role: payload.role },
    secret,
    { expiresIn: expires }
  );
};

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { generateToken, verifyToken, secret };
