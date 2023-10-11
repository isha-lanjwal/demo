import mongoose from 'mongoose';
import mongoConfig  from '../constants/mongoConfig.js';
import UserModel from './user.schema.js';
import RatingModel from "./rating.schema.js";

const connectDb = () => {
  return mongoose.connect(process.env.DB || mongoConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export {connectDb,UserModel,RatingModel}

