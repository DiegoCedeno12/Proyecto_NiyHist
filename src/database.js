require('dotenv').config();
import mongoose from 'mongoose';

const { NIYHIST_MONGODB_HOST, NIYHIST_MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${NIYHIST_MONGODB_HOST}/${NIYHIST_MONGODB_DATABASE}`

mongoose.set('strictQuery', true);


(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Databases is connected');
    } catch (error) {
        console.error(error);
    }
})()