const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const logger = morgan('dev');

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/middle/api/movie/:movieId', (req, res) => {
  console.log('IN PROXY SERVER!!');
  // res.send('hello world');
  console.log('req.params', req.params);
  const { movieId } = req.params;
  console.log(movieId);
  const options = {
    url: `http://middle:1337/api/movie/${movieId}`,
    method: 'get',
  };
  axios(options)
    .then(results => {
      console.log('Proxy succes');
      res.send(JSON.stringify(results.data));
    })
    .catch(err => console.log(err));
});

app.get('middle/api/review/:id', (req, res) => {
  console.log(req.url);
  // const options = {
  //   url: 
  // }
  console.log(res.data);
});

app.get('/', (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// need to route requests

module.exports = app;