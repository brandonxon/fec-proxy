const app = require('./app');

app.listen(5000, () => {
  console.log('this is not working');
  console.log('Proxy server listening on 5000');
});