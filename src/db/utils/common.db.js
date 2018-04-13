import mongoose from 'mongoose'

const dbUrl = process.ENV.MONGODB_URI

// use native promises
mongoose.Promise = global.Promise

/**
 * @returns {Promise} to connect to the database
 */
export const connect = () => mongoose.connect(dbUrl)
