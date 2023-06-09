import express from 'express';
import mongoose from 'mongoose';
import {config} from '../config.js'


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