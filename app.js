const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectDB } = require('./backend/database/mongoose');

const app = express();
connectDB();

const port = process.env.PORT;

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
})