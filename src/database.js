import mongoose from 'mongoose';


const MONGODB_URI = "mongodb+srv://admin:Armando.02@api-mongodb.mhrw02x.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);


(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Databases is connected');
    } catch (error) {
        console.error(error);
    }
})()