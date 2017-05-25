import Router from 'express'
import * as db from '../db/utils/users.db'

const users = Router() // create a '/users' route


// responds with all users from the database
users.get('/all', (req, res) => db.getUsers()
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))


// responds with all users from the database
users.get('/by/:sub', (req, res) => db.getUserById(req.params.sub)
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))

// updates a user specified by id with provided properties, except likes
users.post('/', (req, res) => {
	if (!(req.body.userProps instanceof Object) || req.body.userProps instanceof Array) {
		return res.status(400).send('\'userProps\' should be an object')
	}

	db.addOrUpdateUserById(req.body.userProps.sub, req.body.userProps)
		.then(user => res.send(user))
		.catch(err => res.status(500).send(err))
})


export default users
