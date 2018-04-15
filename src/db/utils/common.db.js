import mongoose from 'mongoose'

const dbUrl = process.env.NODE_ENV === 'dev'
	? 'mongodb://heroku_vdldqcgs:4a7fhq7hblitjuueflij6a7nlo@ds247047.mlab.com:47047/heroku_vdldqcgs'
	: process.env.MONGODB_URI

// use native promises
mongoose.Promise = global.Promise

/**
 * @returns {Promise} to connect to the database
 */
export const connect = () => mongoose.connect(dbUrl)
