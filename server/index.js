// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); //middleware which parses HTTP request bodies and makes them available in req.body
const morgan = require('morgan');  //HTTP request logger middleware
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));  //parse bodies of all incoming requests into JSON

// Allow cross-origin resource sharing
app.use(cors());
app.options('*', cors());

// Application Routes
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
