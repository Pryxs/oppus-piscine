import express from 'express'
import {myMERN_module} from './myMERN_module.js'
import {config} from '../config.js'

const app = express();

const mernModule = myMERN_module()

app.get('/:name', (req, res) => {
    let name = req.params.name
    if(!name) res.status(400).send('Missing params')

    try{
        mernModule.read(name)
        res.status(200).json(name + ' est lu')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.post('/:name', (req, res) => {
    let name = req.params.name
    if(!name) throw 'missing params'

    try{
        mernModule.create(name)
        res.status(200).json(name + ' est créé')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.put('/:name/:content', (req, res) => {
    let {name, content} = req.params
    if(!name || !content) throw 'missing params'

    try{
        mernModule.update(name, content)
        res.status(200).json(content + ' inséré dans ' + name)
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.delete('/:name', (req, res) => {
    let name= req.params.name
    if(!name) throw 'missing params'

    try{
        mernModule.delete(name)
        res.status(200).json(name + ' a été supprimé')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.listen(config.app.port)