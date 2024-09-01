import {Schema, model} from 'mongoose';


const usersOAuthSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {
    collection: 'usersOAuth'
})

const usersOAuthModel = model('usersOAuth', usersOAuthSchema);

export default usersOAuthModel;