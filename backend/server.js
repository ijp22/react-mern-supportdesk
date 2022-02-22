const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the MERN Support Desk API' });
});

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
