const { Pool } = require('pg');

let poolConfig = {};

if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  poolConfig = {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.slice(1),
    user: url.username,
    password: url.password,
  };
} else {
  poolConfig = {
    host: process.env.DB_HOST || process.env.TASK_DB_HOST || 'task-db',
    port: parseInt(process.env.DB_PORT) || parseInt(process.env.TASK_DB_PORT) || 5432,
    database: process.env.DB_NAME || process.env.TASK_DB_NAME || 'taskdb',
    user: process.env.DB_USER || process.env.TASK_DB_USER || 'admin',
    password: process.env.DB_PASSWORD || process.env.TASK_DB_PASSWORD || 'secret',
  };
}

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  console.log('[Task-DB] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[Task-DB] Unexpected error', err);
});

module.exports = { pool };
