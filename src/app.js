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

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/middle/api/movie/:movieId', (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const options = {
    // url: `http://middle:1337/api/movie/${movieId}`,
    url: `http://54.193.118.56:1337/api/movie/${movieId}`,
    method: 'get',
  };
  axios(options)
    .then(results => {
      console.log('Proxy success');
      res.send(JSON.stringify(results.data));
    })
    .catch(err => console.log(err));
});

app.get('/middle/api/review/:reviewId', (req, res) => {
  console.log('req.params', req.params);
  const { reviewId } = req.params;
  const options = {
    // url: `http://middle:1337/api/review/${reviewId}`
    url: `http://54.193.118.56:1337/api/review/${reviewId}`,
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
  console.log('req.params', req.params);
  const { id } = req.params;
  const options = {
    url: `http://54.193.118.56:8000/api/title/${id}`,
    method: 'get',
  };

  axios(options)
    .then(response => {
      console.log('MAIN', response);
      res.send(response.data);
    })
    .catch(err => {
      console.log('ERROR FROM /main/api', err);
    });
});

app.get('/suggested/api/s', (req, res) => {
  console.log('now its working.........?')
  console.log('getting', `http://54.193.118.56:8080/api/s`);
  const options = {
    url: `http://54.193.118.56:8080/suggested/api/s`,
    method: 'get',
  };
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
  console.log('are my changes getting reflected?')
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

console.log('this is not working');

module.exports = app;