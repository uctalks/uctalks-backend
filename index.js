const
	express = require('express'),
	bodyParser = require('body-parser'),
	dbClient = require('mongodb').MongoClient,
	ObjectID = require('mongodb').ObjectID,
	app = express(),
	dbUrl = 'mongodb://uctalks:uctalks@ds157799.mlab.com:57799/heroku_x17nwlbv'

let db

app.set('port', (process.env.PORT || 5000))
app.set('json spaces', 4)

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	next()
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
	db.collection('topics').find().toArray()
		.then(data => res.json(data))
		.catch(() => res.status(500).send('db error'))
})

app.post('/', (req, res) => {
	const name = req.body.name

	if (typeof name !== 'string') {
		return res.status(400).send('Invalid request')
	}

	const newTopic = { name }

	db.collection('topics').findOne(newTopic).then(duplicate => {
		if (duplicate) {
			res.status(500).send('Topic with this name already exists')
		} else {
			db.collection('topics').insertOne(newTopic)
				.then(topic => res.send(topic.insertedId))
				.catch(() => res.status(500).send('db error'))
		}
	})
})

app.put('/update-topic/:id/', (req, res) => {
	const updatedTopic = req.body.updatedTopic

	if (updatedTopic instanceof Object && !(updatedTopic instanceof Array)) {
		res.status(500).send('Incorrect request (\'updatedTopic\' is not an object')
	}

	db.collection('topics').update({ _id: ObjectID(req.params.id) }, updatedTopic)
		.then(() => res.sendStatus(200))
		.catch(error => res.status(500).send({ errorMessage: 'Database error', error }))
})

dbClient.connect(dbUrl)
	.then(database => {
		db = database

		app.listen(app.get('port'), function () {
			console.log('Listening on port ' + app.get('port'))
		})
	})
	.catch(error => {
		throw error
	})