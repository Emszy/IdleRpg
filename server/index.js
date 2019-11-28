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




app.get('*', (req, res) => {
  
});



app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});