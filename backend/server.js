const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running port ${port}`));