const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const uuidv4 = require('uuid/v4');
var session = require('express-session');

const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
const jsonParser = bodyParser.json();

app.use(jsonParser); // use it globally
app.use(pino);

const userRoute = require("./routes/user");
const skillsRoute = require("./routes/skills");
const inventoryRoute = require("./routes/inventory");
const bankRoute = require("./routes/bank");
const armorRoute = require("./routes/armor");

app.use(session({
	  	genid: function(req) {
	    	return uuidv4() // use UUIDs for session IDs
	  	},
	  	secret: "OOOOH A SECRET KEY GOES HERE",
	  	resave: false,
		saveUninitialized: true,

	}))

const { db } = require('./sequelize')


userRoute(app, db);
skillsRoute(app, db);
inventoryRoute(app, db);
bankRoute(app, db);
armorRoute(app, db);




app.get('/api/name', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});



app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);