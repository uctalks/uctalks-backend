import MongoClient from 'mongodb'
import ObjectID from 'mongodb'

const dbUrl = 'mongodb://uctalks:uctalks@ds157799.mlab.com:57799/heroku_x17nwlbv'

let topics // topics collection in the database


/**
 * @returns {Promise} to connect to the database
 */
export function connect() {
	return MongoClient.connect(dbUrl).then(db => topics = db.collection('topics'))
}


/**
 * @returns {Promise} to get all topics
 */
export function getTopics() {
	return topics.find().toArray()
}


/**
 * @param {String} name to find in the database
 * @returns {Promise} to get a topic by name
 */
export function getTopicByName(name) {
	return topics.findOne({name})
}


/**
 * @param {Object} newTopic to insert to the database
 * @returns {Promise} to insert newTopic
 */
export function insertTopic(newTopic) {
	return topics.insertOne(newTopic)
}


/**
 * @param {String} id of the topic to be updated
 * @param {Object} updatedProps to be
 * @returns {Promise} to insert newTopic
 */
export function updateTopicById(id, updatedProps) {
	return topics.update({ _id: ObjectID(id) }, updatedProps)
}
