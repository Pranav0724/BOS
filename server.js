const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


