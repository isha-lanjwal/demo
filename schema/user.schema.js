const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    user_name: { type:String,required: true, unique: true},
    email: { type: String, required: true, unique: true},
    contact_number: {type:Number,required : true, unique: true},
}, { strict: false, timestamps: { createdAt: 'created_at' } });

const UserModel =  mongoose.model('User', userSchema);
module.exports = UserModel;