const express = require('express');
const config = require('../../config');
const myMERN_module = require('../myMERN_moduleSync.js');

const app = express();

app.get('/:name', (req, res) => {
    let name = req.params.name
    if(!name) res.status(400).send('Missing params')

    try{
        myMERN_module.read(name)
        res.status(200).json(name + ' est lu')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.post('/:name', (req, res) => {
    let name = req.params.name
    if(!name) throw 'missing params'

    try{
        myMERN_module.create(name)
        res.status(200).json(name + ' est créé')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.put('/:name/:content', (req, res) => {
    let {name, content} = req.params
    if(!name || !content) throw 'missing params'

    try{
        myMERN_module.update(name, content)
        res.status(200).json(content + ' inséré dans ' + name)
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.delete('/:name', (req, res) => {
    let name= req.params.name
    if(!name) throw 'missing params'

    try{
        myMERN_module.delete(name)
        res.status(200).json(name + ' a été supprimé')
    } catch(err){
        res.status(500).json('Internal error')
    }
})

app.listen(config.app.port)