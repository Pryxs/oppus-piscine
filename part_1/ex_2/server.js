import express from 'express'
import {config} from '../config.js'

const app = express();

app.get('/', (req, res) => {
  res.send('Great ! It\'s work')
})

app.listen(config.app.port)