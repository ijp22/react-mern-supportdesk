import { join } from 'path';
import express, { json, urlencoded, static } from 'express';
const app = express();
const dotenv = require('dotenv').config();
import { errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

// Parser
app.use(json());
app.use(urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Static Folder
  app.use(static(join(__dirname, '../frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the MERN Support Desk API' });
  });
}

app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
