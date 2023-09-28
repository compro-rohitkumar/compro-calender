import mongoose from 'mongoose'
import {Nitro} from 'nitropack'

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig()
    mongoose.connect('mongodb+srv://Rohit:Rohit@cluster0.nkw34yi.mongodb.net/').then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })
}
