import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import topics from './routes/topics'
import { connect } from './db/db'

const app = express()

app.set('port', (process.env.PORT || 5000))

app.set('json spaces', 4)

app.use(cors())

app.use(bodyParser.json())

app.use('/topics', topics)

connect()
	.then(() => {
		app.listen(app.get('port'), function () {
			console.log('Listening on port ' + app.get('port'))
		})
	})
	.catch(error => {
		throw error
	})
