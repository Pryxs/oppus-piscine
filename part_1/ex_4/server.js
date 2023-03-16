const express = require('express');
const config = require('../../config');

const app = express();
app.set('views', './part_1/views');
app.set('view engine', 'ejs');

app.get('/name/:name?', (req, res) => {
    let name = req.params.name ?? 'unknown'
    
    res.render('name', {
        name
    });
})

app.listen(config.app.port)