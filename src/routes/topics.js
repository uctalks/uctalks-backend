import Router from 'express'
import * as db from '../db/db'

const topics = Router() // create a '/topics' route


// responds with all topics from the database
topics.get('/', (req, res) => {
	db.getTopics()
		.then(data => res.json(data))
		.catch(() => res.status(500).send('db error'))
})


// inserts new topic to the database and responds with newly created topic
topics.post('/', (req, res) => {
	const name = req.body.name

	if (typeof name !== 'string') {
		return res.status(400).send('Invalid request')
	}

	const newTopic = { name }

	db.insertTopic(newTopic)
		.then(topic => res.send(topic))
		.catch(err => res.status(500).send(err))
})


// updates a topic specified by id with provided properties
topics.put('/:id', (req, res) => {
	const updatedProps = req.body.updatedProps

	if (!(updatedProps instanceof Object) || updatedProps instanceof Array) {
		res.status(500).send('Incorrect request (\'updatedTopic\' is not an object')
	}

	db.updateTopicById(req.params.id, updatedProps)
		.then(() => res.sendStatus(200))
		.catch(error => res.status(500).send({ errorMessage: 'Database error', error }))
})


export default topics
