const mongoose = require('mongoose');
const mongoConfig = require('../constants/mongoConfig');
const UserModel = require('./user.schema');

const connectDb = () => {
  return mongoose.connect(process.env.DB || mongoConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = {connectDb,UserModel}

