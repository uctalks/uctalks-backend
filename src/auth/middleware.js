import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

export const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://stativka.eu.auth0.com/.well-known/jwks.json',
	}),
	audience: `https://${process.env.NODE_ENV === 'dev' ? 'uct-dev' : 'uctalks'}.herokuapp.com`,
	issuer: 'https://stativka.eu.auth0.com/',
	algorithms: ['RS256'],
})
