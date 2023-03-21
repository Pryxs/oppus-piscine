import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import {config} from '../config.js'

const dirname =  path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('views', dirname + '/views');
app.set('view engine', 'ejs');

app.get('/name/:name?', (req, res) => {
    let name = req.params.name ?? 'unknown'
    
    res.render('name', {
        name
    });
})

app.listen(config.app.port)