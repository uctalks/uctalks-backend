const
	express = require('express'),
	bodyParser = require('body-parser'),
	dbClient = require('mongodb').MongoClient,
	app = express(),

	// @TODO refactor authorisation
	user = 'uctalks',
	password = 'uctalks',

	dbUrl = `mongodb://${user}:${password}@ds157799.mlab.com:57799/heroku_x17nwlbv`;

let db;

app.set('port', (process.env.PORT || 5000));
app.set('json spaces', 4);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
	db.collection('topics').find().toArray()
		.then(data => res.json(data))
		.catch(error => res.status(500).send('db error'));
});

app.post('/', (req, res) => {
	const name = req.body.name;

	if (typeof name !== 'string') {
		return res.status(400).send('Invalid request');
	}

	const newTopic = { name };

	// @TODO prevent duplicates

	db.collection('topics').insertOne(newTopic)
		.then(topic => res.send(topic.insertedId))
		.catch(error => res.status(500).send('db error'));
});

dbClient.connect(dbUrl)
	.then(database => {
		db = database;

		app.listen(app.get('port'), function () {
			console.log('Listening on port ' + app.get('port'));
		});
	})
	.catch(error => {
		throw error
	});