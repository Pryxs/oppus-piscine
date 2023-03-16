const express = require('express');
const config = require('../../config');

const app = express();

app.get('/', (req, res) => {
  res.send('Great ! It\'s work')
})

app.listen(config.app.port)