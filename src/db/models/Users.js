import request from 'request'
import { auth0Url } from '../../auth/index'

const options = {
	method: 'POST',
	url: `${auth0Url}oauth/token`,
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify({
		client_id: process.env.AUTH_CLIENT_ID,
		client_secret: process.env.AUTH_CLIENT_SECRET,
		audience: `${auth0Url}api/v2/`,
		grant_type: 'client_credentials',
	}),
}

class Users {
	constructor() {
		this._tokenPromise = this.getToken()

		// TODO consider something more elegant for token refresh
		setInterval(() => {
			this._tokenPromise = this.getToken()
		}, 12 * 60 * 60 * 1000)
	}

	getToken() {
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				if (error) reject(new Error(error))

				const data = JSON.parse(body)

				resolve(data.access_token)
			})
		})
	}

	getUsers() {
		return this._tokenPromise.then(token => {
			const options = {
				method: 'GET',
				url: `${auth0Url}api/v2/users`,
				headers: { authorization: `Bearer ${token}` },
			}

			return new Promise((resolve, reject) => {
				request(options, (error, response, body) => {
					if (error) reject(new Error(error))

					resolve(JSON.parse(body))
				})
			})
		})
	}

	getUserById(id) {
		return this._tokenPromise.then(token => {
			const options = {
				method: 'GET',
				url: `${auth0Url}api/v2/users/${id}`,
				headers: { authorization: `Bearer ${token}` },
			}

			return new Promise((resolve, reject) => {
				request(options, (error, response, body) => {
					if (error) reject(new Error(error))

					resolve(JSON.parse(body))
				})
			})
		})
	}
}

export default new Users()
