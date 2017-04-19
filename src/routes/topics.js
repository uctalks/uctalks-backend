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


// updates a topic specified by id with provided properties
topics.put('/:id', (req, res) => db.updateTopicById(req.params.id, req.body.updatedProps)
	.then(topic => res.send(topic))
	.catch(err => res.status(500).send(err)))


export default topics
