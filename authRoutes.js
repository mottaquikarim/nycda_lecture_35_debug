const express = require('express');

const authApp = express();

const Users = require('./users')

// parser session middleware
const parser = require('body-parser');

// pull in session middleware
const expressSession = require('express-session');

// use body parser
authApp.use(parser.json());

authApp.use(expressSession({
	secret: 'LOLSECRETZ'
}));

authApp.use((request, response, next) => {})

authApp.post('/auth/signup', (request, response) => {
    // grab appropriate data from request payload
	const {body} = request;
	const {email, name, password} = body;

    // create new user
	const isCreated = Users.createNewUser(email, name, password);

	response.header('Content-Type', 'application/json');
    // if user successfully created, respond with success
	if (isCreated) {
		response.send({success: true})
	}
    // otherwise, send 400
	else {
		response.header('Content-Type', 'application/json');
		response.status(400)
		response.send({error: 'some fields not valid LOL'})
	}
});

// login route
authApp.post('/auth/login', (request, response) => {
    // grab appropriate data from request payload
	const body = request.body;
	const {email, password} = body;

    // attempt to log in user
	const loggedInState = Users.login(email.toLowerCase(), password);

	if (loggedInState.error === true) {
		// user has not logged in
		if (typeof request.session.numAttempts === "undefined") {
			request.session.numAttempts = 0;
		}
		else {
			request.session.numAttempts++;
		}
		response.header('Content-Type', 'application/json');
		response.send(loggedInState)
		return;
	}

    // TODO: handle the case where user logs in successfully

	response.header('Content-Type', 'application/json');
	response.send({error: 'foobar'})
});

module.exports = authApp;
