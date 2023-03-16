const express = require('express');
const config = require('../../config');

const app = express();
app.set('views', './part_1/views');
app.set('view engine', 'ejs');

app.get('/name/:name?', (req, res) => {
    // route params
    let name = req.params.name ?? 'unknown'

    // query params
    let age = req.query.age
    
    res.render('name-age', {
        name,
        age
    });
})

app.listen(config.app.port)