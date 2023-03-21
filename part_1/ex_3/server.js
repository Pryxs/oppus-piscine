const express = require('express');
const fs = require('fs');
const config = require('../../config');

const app = express();

app.get('/', (req, res) => {
    let html = fs.readFileSync('./part_1/views/base.html', 'utf8')
    res.send(html)
})

app.listen(config.app.port)