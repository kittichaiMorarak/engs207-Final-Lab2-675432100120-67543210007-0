const express = require('express');
const cors = require('cors');
const authMiddleware = require('./authmiddle/authmiddleware');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/tasks/health', (req, res) => {
  res.json({ status: 'ok', service: 'task-service' });
});

app.use('/api/tasks', authMiddleware, taskRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Task Service running on port ${PORT}`));
