const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../authmiddle/authmiddleware');

const router = express.Router();

router.use(requireAuth);

// GET /api/users/me — ดู profile ของตนเอง
router.get('/me', async (req, res) => {
  const userId = req.user.sub || req.user.id;

  try {
    let result = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      const insertResult = await pool.query(
        `INSERT INTO user_profiles (user_id, username, email, role)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, req.user.username, req.user.email, req.user.role]
      );
      return res.json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/me — แก้ไข profile ของตนเอง
router.put('/me', async (req, res) => {
  const userId = req.user.sub || req.user.id;
  const { display_name, bio, avatar_url } = req.body;

  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (display_name !== undefined) {
      updates.push(`display_name = $${paramIndex++}`);
      values.push(display_name);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(bio);
    }
    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramIndex++}`);
      values.push(avatar_url);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE user_profiles
      SET ${updates.join(', ')}
      WHERE user_id = $${paramIndex}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      const insertResult = await pool.query(
        `INSERT INTO user_profiles (user_id, username, email, role, display_name, bio, avatar_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [userId, req.user.username, req.user.email, req.user.role, display_name, bio, avatar_url]
      );
      return res.json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users — ดูรายชื่อผู้ใช้ทั้งหมด (admin only)
router.get('/', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await pool.query('SELECT * FROM user_profiles ORDER BY user_id');
    res.json({ users: result.rows });
  } catch (err) {
    console.error('GET /users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
