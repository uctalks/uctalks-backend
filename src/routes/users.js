import Router from 'express'
import * as db from '../db/utils/users.db'

const users = Router() // create a '/users' route


// responds with all users from the database
users.get('/', (req, res) => db.getUsers()
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))


// responds with all users from the database
users.get('/:id', (req, res) => db.getUserById(req.params.id)
	.then(data => res.json(data))
	.catch(() => res.status(500).send('db error')))


export default users
