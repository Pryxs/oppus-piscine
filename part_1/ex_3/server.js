import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import {config} from '../config.js'

const dirname =  path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get('/', (req, res) => {
    let html = fs.readFileSync(dirname + '/views/base.html', 'utf8')
    res.send(html)
})

app.listen(config.app.port) 