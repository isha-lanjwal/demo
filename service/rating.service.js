import { RatingModel, UserModel } from '../schema/index.js';
import responseCode  from '../constants/responseCode.js';

class RatingService {
    static addRating(req_body) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!req_body || !req_body.user_name || !req_body.rating_description || !req_body.rating) {
                    resolve({
                        message: "Insufficient Parameters",
                        messageCode: 422
                    });
                }
                const isUser = await UserModel.countDocuments({user_name: req_body.user_name
                }).exec();
                if(isUser){
                    const oldUser = await RatingModel.countDocuments({user_name: req_body.user_name
                    }).exec();
                    if (oldUser) {
                        resolve({
                            messageCode: 409,
                            message: 'User Has Already Given Ratings'
                        });
                    } else {
                        let rating = new RatingModel(req_body);
                        await rating.save();
                        resolve({
                            content: rating,
                            messageCode: responseCode["200"]
                        });
                    }
                }else{
                    resolve({
                        message: "User does not exist",
                        messageCode: 404
                    });
                }
              
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        });
    }

    static getAll(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const pageSize = Number(data.size) || 10;
                const offset = Number(data.offset) || 0;
                let rating = await RatingModel.find()
                    .skip(offset)
                    .limit(pageSize)
                    .exec();
                resolve(rating);
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        })
    }
    static getAvg(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let rating = await RatingModel.aggregate([{$group:{_id:null,avg:{$avg:"$rating"}}}]).exec();
                resolve(rating);
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        })
    }
}

export default RatingService