import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as db from './db/db'

const app = express()

app.set('port', (process.env.PORT || 5000))

app.set('json spaces', 4)

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
	db.getTopics()
		.then(data => res.json(data))
		.catch(() => res.status(500).send('db error'))
})

app.post('/', (req, res) => {
	const name = req.body.name

	if (typeof name !== 'string') {
		return res.status(400).send('Invalid request')
	}

	const newTopic = { name }

	db.insertTopic(newTopic)
		.then(topic => res.send(topic))
		.catch(err => res.status(500).send(err))
})

app.put('/update-topics/:id/', (req, res) => {
	const updatedProps = req.body.updatedProps

	if (!(updatedProps instanceof Object) || updatedProps instanceof Array) {
		res.status(500).send('Incorrect request (\'updatedTopic\' is not an object')
	}

	db.updateTopicById(req.params.id, updatedProps)
		.then(() => res.sendStatus(200))
		.catch(error => res.status(500).send({ errorMessage: 'Database error', error }))
})

db.connect()
	.then(() => {
		app.listen(app.get('port'), function () {
			console.log('Listening on port ' + app.get('port'))
		})
	})
	.catch(error => {
		throw error
	})