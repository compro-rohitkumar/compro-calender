import mongoose from 'mongoose'
import {Nitro} from 'nitropack'

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig()
    mongoose.connect(config.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })
}
