'use strict';

module.exports = {
	db: 'mongodb://pokeuser:pikachu1090@kahana.mongohq.com:10056/app28485715',
	app: {
		title: 'Pokecity - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '840678929289353',
		clientSecret: process.env.FACEBOOK_SECRET || 'fdc926da13b109af0fd87db45c350f62',
		callbackURL: 'http://pokecity.herokuapp.com/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'Mj9nBNQj30lJJpjJtS2Gvd5pN',
		clientSecret: process.env.TWITTER_SECRET || 'B5K8Fm5W49RvLBezdkDkscV2QXCx2BjJhFPUzGvgFz0YNAaYb8',
		callbackURL: 'http://pokecity.herokuapp.com/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};