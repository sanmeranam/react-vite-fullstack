import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    }
});


export default model('user', userSchema, 'user');