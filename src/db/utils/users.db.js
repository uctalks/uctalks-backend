import Users from '../models/Users'

/**
 * @returns {Promise} to get all users
 */
export const getUsers = () => Users.getUsers()


/**
 * @returns {Promise} to get user by id
 */
export const getUserById = id => Users.getUserById(id)
