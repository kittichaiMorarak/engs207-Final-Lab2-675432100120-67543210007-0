const express = require('express');
const cors = require('cors');
const authMiddleware = require('./authmiddle/authmiddleware');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/users/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

app.use('/api/users', authMiddleware, userRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
