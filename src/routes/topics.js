import Router from 'express'
import * as db from '../db/utils/topics.db'

const topics = Router() // create a '/topics' route


// responds with all topics from the database
topics.get('/', (req, res) => db.getTopics()
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))


// inserts new topic to the database and responds with newly created topic
topics.post('/', (req, res) => db.insertTopic(req.body.newTopicProps)
	.then(topic => res.send(topic))
	.catch(err => res.status(500).send(err)))


// updates a topic specified by id with provided properties, except likes
topics.put('/:id', (req, res) => {
	if (!(req.body.updatedTopicProps instanceof Object) || req.body.updatedTopicProps instanceof Array) {
		return res.status(400).send('\'updatedTopicProps\' should be an object')
	}
	
	if (req.body.updatedTopicProps.likes) {
		return res.status(400).send('use \'/:id/likes\' endpoint for update of likes')
	}

	db.updateTopicById(req.params.id, req.body.updatedTopicProps)
		.then(topic => res.send(topic))
		.catch(err => res.status(500).send(err))
})


// updates likes of a topic specified by id
topics.put('/:id/likes', (req, res) => {
	// check liked parameter
	if (typeof req.body.liked !== 'boolean') {
		return res.status(400).send('\'liked\' parameter should be boolean')
	}

	// check userId parameter
	if (typeof req.body.userId !== 'string') {
		return res.status(400).send('\'userId\' should be a string')
	}

	// query topic by provided id in the URL
	db.getTopicById(req.params.id).then(topic => {
		// if topic is not found by id, notify the client
		if (!topic) {
			return res.status(400).send('Topic was not found')
		}

		// if topic is found by id
		if (topic.usersLikedIds.includes(req.body.userId)) {
			// prevent second like
			if (req.body.liked) {
				return res.status(400).send('User already liked this topic')
			}
		} else if (!req.body.liked) {
			// prevent dislike of the topic, which was not liked by the user
			return res.status(400).send('User did not liked this topic previously')
		}

		// query update of the topic's likes
		db.updateTopicLikes(topic, req.body.liked, req.body.userId)
			.then(_topic => res.send(_topic))
			.catch(err => res.status(500).send(err))
	})
})


// deletes a topic specified by id
topics.delete('/:id', (req, res) => db.deleteTopicById(req.params.id)
	.then(data => res.send(data))
	.catch(err => res.status(500).send(err)))

export default topics
