//include express
const express = require('express');

const router = express.Router();

const parser = require('body-parser');

// use body parser
router.use(parser.json());

const Places = require('./places')

// api
router.get('/user/:id/location', (request, response) => {
	const id = parseInt(request.params.id, 10);

	response.header('Content-Type', 'application/json');
	response.send(Places.getLocationsByUser(id))
});

router.post('/user/:id/location', (request, response) => {
	const id = parseInt(request.params.id, 10);
	const body = request.body;

	response.header('Content-Type', 'application/json');
	response.send(Places.addNewLocationForUser(id, body));
});

module.exports = router;

















