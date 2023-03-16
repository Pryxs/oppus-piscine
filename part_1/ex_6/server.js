const express = require('express');
const config = require('../../config');
const myMERN_module = require('../myMERN_module.js');

const app = express();

app.get('/', (req, res) => {
    myMERN_module.update('toto', 'blabla')
    res.send('toto')
})

app.listen(config.app.port)