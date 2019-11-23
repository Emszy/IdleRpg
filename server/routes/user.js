const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app, db) => {  
	// get all users
	app.get('/user', (req, res) => {
		if (!req.session.loggedIn) {
				res.json({code : -1});
				return ;
		}
		db.users.findOne({
			where : {
				id: req.session.userId,
			},
			 attributes: ["name", "id"],
		}).then(user => {
			if (user) {

				res.json({code: 1, user: user})
			} else {
				res.json({code : -1, message: "No Session Available"})
			}
		});

	})

	app.get('/checkSession', (req, res) => {
		if (!req.session.loggedIn) {
			res.json({code : -1});
		} else {
			res.json({code : 1});
		}
	})

	app.get('/logout', (req, res) => {
		if (!req.session.loggedIn) {
			res.json({code : -1, message: "You aren't logged in Yet!"});
			return ;
		}
	    req.session.regenerate(function(err) {
		 	if (err) {
		 		console.log(err);
		 		res.json({code : 1, message: "Something Went Wrong with Logout"});

		 	} else {
		 		res.json({code : 1, message: "Logout Successful"});
		 	}
		})
	})


	app.post('/save', (req, res) => {
		 db.users.findOne({
			where : {
				id: req.session.userId,
			},
		}).then(user => {
			if (user) {
		      user.update({
		        name: req.body.player.name,
		        info: req.body.player.info,
		        gold: req.body.gold,
		      })
		      .then(user => {
		      	res.json({code : 1, message: "save Successful"})

		      })
		    }
			else {
				res.json({code : -1, message: "save  Unsuccessful"})
			}
		});
	})
 		
	app.post('/login', (req, res) => {
		db.users.findOne({
			where : {
				email: req.body.email,
			},
			 attributes: ["id", "password"],
		}).then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, response) {
					if (response === true) {
						req.session.loggedIn = true;
						req.session.userId = user.id
			    		res.json({code : 1, message: "Login Successful"})
					} else {
						res.json({code : -1, message: "Login Unsuccessful, Please Try Again or Register"})
					}
				});

			} else {
				res.json({code : -1, message: "Login Unsuccessful, Please Try Again or Register"})
			}
		});
	})

	app.post('/register', (req, res) => {
		if (!req.body.name || !req.body.password) {

			res.json({code : -1, message: "credsNeeded"});
			return ;
		}

		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			db.users.findOrCreate({
								where: 
									{
										name: req.body.name
									},
								defaults : {
							        password:  hash,
							        gold : 100,
								}
							})
			  .then(([user, created]) => {
	    	if (created) {
	    		req.session.loggedIn = true;
				req.session.userId = user.id
				delete user.password

	    		res.json({code : 2, message: "Register Successful", user:user})
	    	} else {
	    		if (user) {
					bcrypt.compare(req.body.password, user.password, function(err, response) {
						if (response === true) {
							db.users.findOne({
							      where : {id : user.id},
							      include: [
							        {
							          model: db.inventoryItems,
							        },
							        {
							          model: db.skills,
							        }
							      ]
							    }).then(users => {
							    	delete users.password
									req.session.loggedIn = true;
									req.session.userId = users.id
						    		res.json({code : 1, message: "Login Successful", user:users})
							     
							    });
						} else {
							res.json({code : -1, message: "Login Unsuccessful, Please Try Again or Register"})
						}
					});

				} else {
					res.json({code : -1, message: "Login Unsuccessful, Please Try Again or Register"})
				}
				
	    	}			
		});
	})
})

}