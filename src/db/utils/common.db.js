import mongoose from 'mongoose'

const dbUrl = 'mongodb://uctalks:uctalks@ds157799.mlab.com:57799/heroku_x17nwlbv'

// use native promises
mongoose.Promise = global.Promise


/**
 * @returns {Promise} to connect to the database
 */
export const connect = () => mongoose.connect(dbUrl)