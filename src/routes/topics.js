import Router from 'express'
import * as db from '../db/db'

const topics = Router() // create a '/topics' route


// responds with all topics from the database
topics.get('/', (req, res) => db.getTopics()
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))


// inserts new topic to the database and responds with newly created topic
topics.post('/', (req, res) => db.insertTopic(req.body.newTopicProps)
	.then(topic => res.send(topic))
	.catch(err => res.status(500).send(err)))


// updates a topic specified by id with provided properties, except points
topics.put('/:id', (req, res) => {
	if (!(req.body.updatedTopicProps instanceof Object) || req.body.updatedTopicProps instanceof Array) {
		return res.status(400).send('\'updatedTopicProps\' should be an object')
	}
	
	if (req.body.updatedTopicProps.points) {
		return res.status(400).send('use \'/:id/points\' endpoint for update of points')
	}

	db.updateTopicById(req.params.id, req.body.updatedTopicProps)
		.then(topic => res.send(topic))
		.catch(err => res.status(500).send(err))
})


// updates points of a topic specified by id
topics.put('/:id/points', (req, res) => {
	if (req.body.direction !== 'up' && req.body.direction !== 'down') {
		return res.status(400).send('Not \'up\' or \'down\' parameter')
	}

	db.updateTopicVotesById(req.params.id, req.body.direction)
		.then(topic => res.send(topic))
		.catch(err => res.status(500).send(err))
})


// deletes a topic specified by id
topics.delete('/:id', (req, res) => db.deleteTopicById(req.params.id)
	.then(data => res.send(data))
	.catch(err => res.status(500).send(err)))

export default topics
