const { UserModel } = require('../schema');
const responseCode = require('../constants/responseCode');

class UserService {
    static addUser(user_body) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!user_body || !user_body.user_name || !user_body.name || !user_body.email || !user_body.age || !user_body.contact_number) {
                    resolve({
                        message: "Insufficient Parameters",
                        messageCode: 422
                    });
                }
                const oldUser = await UserModel.countDocuments({
                    $or: [{
                        email: user_body.email
                    },
                    {
                        user_name: user_body.user_name
                    },
                    {
                        contact_number: user_body.contact_number
                    }
                    ]
                }).exec();
                if (oldUser) {
                    resolve({
                        messageCode: 409,
                        message: 'User Already Exists'
                    });
                } else {
                    let user = new UserModel(user_body);
                    await user.save();
                    resolve({
                        content: user,
                        messageCode: responseCode["200"]
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

    static getAll(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    page,
                    size
                } = query;
                delete query.page;
                delete query.size;
                const pageSize = Number(size) || 10;
                const pageNo = Number(page) || 1;
                let user = await UserModel.find(query)
                    .skip((pageSize * pageNo) - pageSize)
                    .limit(pageSize)
                    .exec();
                resolve(user);
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        })
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    resolve({
                        message: "Insufficient Parameters(user_id)",
                        messageCode: 422
                    });
                }

                let user = await UserModel
                    .findOne({
                        _id: id,
                    })
                    .lean()
                    .exec();
                resolve({
                    content: {
                        user
                    },
                    messageCode: responseCode["200"]
                });
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        });
    }
    static deleteById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    resolve({
                        message: "Insufficient Parameters(user_id)",
                        messageCode: 422
                    });
                }

                let user = await UserModel
                    .findByIdAndRemove({
                        _id: id,
                    })
                    .lean()
                    .exec();
                resolve({
                    content: {
                        message: "User Removed",
                        messageCode: 200
                    },
                    messageCode: responseCode["200"]
                });
            } catch (error) {
                console.log(error)
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                });
            }
        });
    }
    static updateById(id, update) {

        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    resolve({
                        message: "Insufficient Parameters(user_id)",
                        messageCode: 422
                    });
                }

                let query = {};
                const oldUser = await UserModel
                    .findOne({
                        _id: id
                    })
                    .exec();
                if (oldUser) {
                    query = {
                        $and: [
                        {
                            $or: [{
                                email: update.email
                            }, {
                                user_name: update.user_name
                            }, {
                                contact_number: update.contact_number
                            }]
                        },
                        { _id: { $nin: [id] } },
                        ]
                    };
                    const userExist = await UserModel.findOne(query)
                    if (userExist) {
                        resolve({
                            messageCode: 409,
                            message: `email or username or contact number is already in use with another account`
                        });
                    } else {
                        await UserModel.updateOne({
                            _id: id
                        }, {
                            $set: update
                        }).exec();
                        resolve({
                            messageCode: 200,
                            content: 'User Updated!!'
                        })
                    }
                } else {
                    resolve({
                        messageCode: 404,
                        message: 'User not found'
                    })
                }

            } catch (error) {
                logger.error((new Date).toUTCString() + ' uncaughtException:', error);
                reject({
                    messageCode: 500,
                    message: "Server Error.."
                })
            }
        })
    }
}

module.exports = UserService