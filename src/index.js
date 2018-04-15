import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import topics from './routes/topics'
import users from './routes/users'
import { connect } from './db/utils/common.db'
import { jwtCheck } from './auth'

const 
	app = express(), // create server
	port = process.env.PORT || 5000 // set port depending on the environment

// prettify the response
app.set('json spaces', 4)

// allow CORS
app.use(cors())

// parse json during request/response
app.use(bodyParser.json())

// accept only authorized requests
// app.use(jwtCheck) // TODO enable back once client is done

// '/topics' route
app.use('/topics', topics)

// '/users' route
app.use('/users', users)

// connect to the database
connect()
	.then(() => app.listen(port, () => global.console.log(`Listening on port ${port}`)))
	.catch(() => global.console.error('Not able to connect to the database'))
