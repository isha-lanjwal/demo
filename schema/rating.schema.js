const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    user_name: { type:String,required: true},
    rating_description: { type: String, required: true},
    rating: {type:Number,required : true},
}, { strict: false, timestamps: { createdAt: 'created_at' } });

const RatingModel =  mongoose.model('Rating', ratingSchema);
module.exports = RatingModel;