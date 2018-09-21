const httpProxy = require('http-proxy');
const app = require('./app');

app.listen(5000, () => {
  console.log('Proxy server listening on 5000');
});