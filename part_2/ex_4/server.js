const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');

const app = express();

const {host, port, name} = config.db

const dbConnect = async() => {
    try{
        await mongoose.connect(`mongodb://${host}:${port}/${name}`)
        console.log('Connection successfull')
    } catch(error){
        console.log('Connection failed')
    }
}

dbConnect();

app.listen(config.app.port)