import express from 'express'
import {myMERN_module} from './myMERN_module.js'
import {config} from '../config.js'

const app = express();

const mernModule = myMERN_module()

app.get('/', (req, res) => {
    mernModule.create('titi')
    mernModule.update('titi', 'Totor le plus fort')
    res.send('titi')
})

app.listen(config.app.port)