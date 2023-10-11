import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    user_name: { type:String,required: true, unique: true},
    email: { type: String, required: true, unique: true},
    contact_number: {type:Number,required : true, unique: true},
}, { strict: false, timestamps: { createdAt: 'created_at' } });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;