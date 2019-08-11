const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { connectDB } = require('./database/mongoose');

const { connectRoutes } = require('./routes/routes');

const app = express();

const server = http.createServer(app);

const port = process.env.PORT;

connectDB();

app.use(cookieParser());

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(connectRoutes());

server.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
