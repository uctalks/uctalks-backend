import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import { auth0Url } from './auth0-url'

export const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${auth0Url}.well-known/jwks.json`,
	}),
	audience: `https://${process.env.AUTH_AUDIENCE}.herokuapp.com`,
	issuer: auth0Url,
	algorithms: ['RS256'],
})
