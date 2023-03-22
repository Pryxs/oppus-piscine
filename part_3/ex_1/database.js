import mongoose from 'mongoose';
import {config} from '../config.js'

const {host, port, name} = config.db

export const dbConnect = async() => {
    try{
        await mongoose.connect(`mongodb://${host}:${port}/${name}`)
        console.log('Connection successfull')
    } catch(error){
        console.log('Connection failed')
    }
}
