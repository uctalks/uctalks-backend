import mongoose from 'mongoose'

// use native promises
mongoose.Promise = global.Promise

/**
 * @returns {Promise} to connect to the database
 */
export const connect = () => mongoose.connect(process.env.MONGODB_URI)
