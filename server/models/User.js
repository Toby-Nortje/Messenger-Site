import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    displayName: {
        type: String,
        required: false,
        default : function () {
            const _t = this; // tslint:disable-line
            return _t.email;
        }
        
    },
    picturePath: {
        type: String,
        default: 'default-user-image.jpg'
    },
    friends: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    }}, {timestamps: true});

    const User = mongoose.model('User', userSchema);

    export default User;