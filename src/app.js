const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const logger = morgan('dev');

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// need to route requests

module.exports = app;