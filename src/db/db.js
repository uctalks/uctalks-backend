import mongoose from 'mongoose'
import Topic from './models/topic'

const dbUrl = 'mongodb://uctalks:uctalks@ds157799.mlab.com:57799/heroku_x17nwlbv'

// use native promises
mongoose.Promise = global.Promise


/**
 * @returns {Promise} to connect to the database
 */
export const connect = () => mongoose.connect(dbUrl)


/**
 * @returns {Promise} to get all topics
 */
export const getTopics = () => Topic.find()


/**
 * @param {String} name to find in the database
 * @returns {Promise} to get a topic by name
 */
export const getTopicByName = name => Topic.findOne({name})


/**
 * @param {Object} newTopicProps props of the new topic to insert to the database
 * @returns {Promise} to insert newTopic
 */
export const insertTopic = newTopicProps => new Topic(newTopicProps).save()


/**
 * @param {String} id of the topic to be updated
 * @param {Object} updatedTopicProps to be inserted
 * @returns {Promise} to update a topic
 */
export const updateTopicById = (id, updatedTopicProps) => Topic.findByIdAndUpdate(id, updatedTopicProps, { new: true })


/**
 * @param {String} id of the topic to be updated
 * @param {String} direction to be inserted
 * @returns {Promise} to update a topic's points
 */
export const updateTopicVotesById = (id, direction) => Topic
	.findByIdAndUpdate(id, { $inc: { points: direction === 'up' ? 1 : -1 } }, { new: true })


/**
 * @param {String} id of the topic to be deleted
 * @returns {Promise} to delete a topic
 */
export const deleteTopicById = id => Topic.findByIdAndRemove(id)
