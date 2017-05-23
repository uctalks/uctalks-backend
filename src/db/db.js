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
 * @param {String} id to find in the database
 * @returns {Promise} to get a topic by id
 */
export const getTopicById = id => Topic.findById(id)


/**
 * @param {String} name to find in the database
 * @returns {Promise} to get a topic by name
 */
export const getTopicByName = name => Topic.findOne({ name })


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
 * @param {Object} topic document from the database to be updated
 * @param {String} direction to be inserted
 * @param {String} userId to be added to array of users, which liked the topic
 * @returns {Promise} to update a topic's likes
 */
export const updateTopicLikes = (topic, direction, userId) => {
	switch (direction) {

	case 'like':
		topic.likes++
		topic.usersLikedIds.push(userId)
		break

	case 'dislike':
		topic.likes--
		topic.usersLikedIds = topic.usersLikedIds.filter(userLikedId => userLikedId !== userId)
		break
	}

	return topic.save()
}


/**
 * @param {String} id of the topic to be deleted
 * @returns {Promise} to delete a topic
 */
export const deleteTopicById = id => Topic.findByIdAndRemove(id)
