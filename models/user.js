const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username cannot be empty. Please enter a username.']
    },
    email: { type: String, required: [true ,'Email is required'], unique: true },
    role: { type: String, enum: ['owner', 'customer'], default: 'customer' }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
