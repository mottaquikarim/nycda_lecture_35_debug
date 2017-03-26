//include express 
const express = require('express');

//create an express application
const app = express();

// grab authentication routes
const Auth = require('./authRoutes');

// grab the api routes
const API = require('./apiRoutes');

// serve the public folder
app.use('/', express.static('./public'));

app.use(Auth);

app.use('/api', API);

//have the application listen on a specific port
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
















