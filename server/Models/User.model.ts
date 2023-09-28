import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        maxlength: 50
    },
    Events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    id:{
        type: String,
        unique:true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true});

const user = mongoose.model('User', UserSchema);
export default user;