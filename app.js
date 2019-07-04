const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');

const { connectDB } = require('./backend/database/mongoose');

const { connectRoutes } = require('./backend/routes/routes');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT;

connectDB();

app.set('io', io);

app.use(cookieParser());

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(connectRoutes());

server.listen(port, () => {
  console.log(`Server is on port ${port}`);
})
