require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const axios = require('axios');
const CircularJSON = require('circular-json');

const app = express();
const logger = morgan('dev');

const config = require('../config/config');
const serverIp = config.serverIp;

console.log(config);

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/middle/api/movie/:movieId', (req, res) => {
  const { movieId } = req.params;
  const options = {
    // url: `http://middle:1337/api/movie/${movieId}`,
    // url: `http://54.193.118.56:1337/api/movie/${movieId}`,
    url: `http://${serverIp}:1337/api/movie/${movieId}`,
    method: 'get',
  };
  console.log('Getting...', options.url);
  axios(options)
    .then(results => {
      console.log('Proxy success');
      res.send(JSON.stringify(results.data));
    })
    .catch(err => console.log(err));
});

app.get('/middle/api/review/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  const options = {
    // url: `http://middle:1337/api/review/${reviewId}`
    url: `http://${serverIp}:1337/api/review/${reviewId}`,
    method: 'get',
  };
  console.log('getting ', options.url);
  axios(options)
    .then(results => {
      console.log('Proxy got reviews', results.data);
      res.send(results.data);
    })
    .catch(err => {
      console.log('ERROR from proxy server', err);
    });
});

// http://54.215.237.90:5000/main/api/title/87 
app.get('/main/api/title/:id', (req, res) => {
  const { id } = req.params;
  const options = {
    url: `http://${serverIp}:8000/api/title/${id}`,
    method: 'get',
  };
  console.log(options.url);
  axios(options)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('ERROR FROM /main/api', err);
    });
});

app.get('/suggested/api/s', (req, res) => {
  const options = {
    url: `http://${serverIp}:8080/suggested/api/s`,
    method: 'get',
  };
  console.log('Getting... ', options.url);
  axios(options)
    .then(results => {
      console.log('SUGGESTED RESULTS RECIEVED', results.data[0]);
      // let json = CircularJSON.stringify(results);
      // console.log(json);

      res.send(results.data);
    })
    .catch(err => console.log(err));
})

app.get('/', (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;