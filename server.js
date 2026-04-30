const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_crud';

// Parse JSON request bodies.
app.use(express.json());

// Serve the frontend from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// API routes.
app.use('/api/students', studentRoutes);

// Basic API health check.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all error handler for API responses.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal server error.' });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
