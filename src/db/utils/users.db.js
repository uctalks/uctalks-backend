import User from '../models/user'


/**
 * @returns {Promise} to get all users
 */
export const getUsers = () => User.find()


/**
 * @returns {Promise} to get all users
 */
export const getUserById = sub => User.findOne({ sub })


/**
 * @param {String} sub (provided by Google, not Mongo) of the user to be updated
 * @param {Object} userProps to be inserted
 * @returns {Promise} to add/update a user
 */
export const addOrUpdateUserById = (sub, userProps) => User.findOneAndUpdate({ sub }, userProps, { new: true, upsert: true })
