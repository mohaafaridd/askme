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

const publicPath = path.join(__dirname, '..', 'build');

app.use(express.static(publicPath));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(connectRoutes());

server.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
