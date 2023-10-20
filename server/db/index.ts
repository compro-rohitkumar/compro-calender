import mongoose from 'mongoose';

const db= async (nitroApp: any) => {
    const config = useRuntimeConfig();
    console.log(process.env.MONGODB_URI, config.MONGODB_URI);
    mongoose.connect(config.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

export default db;