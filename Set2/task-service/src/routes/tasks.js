const express       = require('express');
const { pool }      = require('../db/db');
const requireAuth   = require('../authmiddle/authmiddleware');

const router = express.Router();

router.use(requireAuth);

// GET /api/tasks/ — ดึงรายการ Task
router.get('/', async (req, res) => {
  try {
    let result;
    const userId = req.user.sub || req.user.id;

    if (req.user.role === 'admin') {
      result = await pool.query(`SELECT * FROM tasks ORDER BY created_at DESC`);
    } else {
      result = await pool.query(
        `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
      );
    }
    res.json(result.rows);
  } catch (err) {
    console.error('GET tasks error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks/ — สร้าง Task ใหม่
router.post('/', async (req, res) => {
  const { title, description, status = 'TODO', priority = 'medium' } = req.body;

  if (!title) return res.status(400).json({ error: 'title is required' });

  const userId = req.user.sub || req.user.id;

  try {
    let dbStatus = String(status).toUpperCase();
    if (dbStatus === 'DOING') dbStatus = 'IN_PROGRESS';

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, title, description, dbStatus, priority]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST task error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/tasks/:id — อัปเดต Task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;
  const userId = req.user.sub || req.user.id;

  try {
    const currentTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (!currentTask.rows.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = currentTask.rows[0];

    if (task.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: You cannot update this task' });
    }

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (status !== undefined) {
      let dbStatus = String(status).toUpperCase();
      if (dbStatus === 'DOING') dbStatus = 'IN_PROGRESS';
      updates.push(`status = $${paramIndex++}`);
      values.push(dbStatus);
    }
    if (priority !== undefined) {
      updates.push(`priority = $${paramIndex++}`);
      values.push(priority);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE tasks
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tasks/:id — ลบ Task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub || req.user.id;

  try {
    const currentTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (!currentTask.rows.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = currentTask.rows[0];

    if (task.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: You cannot delete this task' });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
