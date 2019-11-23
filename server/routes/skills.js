
module.exports = (app, db) => {  

	app.get('/skills', (req, res) => {
		
				db.skills.findAll({
					where : {
						user_id: req.session.userId,
					},
				}).then(skills => {
					if (skills) {
						console.log(skills)
						res.json({code: 1, message: "Get Skills Success", skills: skills})
					} else {
						res.json({code : -1, message: "No Session Available"})
					}
				});

	})

	app.post('/saveSkills', (req, res) => {
		
				let skills = req.body.skills
				let skillKeys = Object.keys(skills)
				let key = false;
				let createSkills = [];

				for (key of skillKeys) {
					createSkills.push({
						user_id: req.session.userId,
 		  				skill_id: skills[key].skill_id,
					  	value: skills[key].value,
						current : skills[key].current,
						name: key,
						boost : skills[key].boost,
						xp : skills[key].xp,
						threshold : skills[key].threshold,
					})
				}
		  	db.skills.bulkCreate(createSkills).then(function() {
		  		res.json({code : 1, message: "Skill save Successful"})
		  	}, function(err){
		  		res.json({code : -1, message: "save Not Successful"})

		  	})

	})

	app.post('/updateSkills', (req, res) => {
		  	
			let skills = req.body.skills
			let skillKeys = Object.keys(skills)
			let key = false;

			for (key of skillKeys) {
				db.skills.update({ 
				  	value: skills[key].value,
					current : skills[key].current,
					name: key,
					boost : skills[key].boost,
					xp : skills[key].xp,
					threshold : skills[key].threshold,
				}, {
				  where: {skill_id: skills[key].skill_id, user_id : req.session.userId},
				  returning: true, // needed for affectedRows to be populated
				}).then(function() {
			  	}, function(err){
			  		res.json({code : -1, message: "Update Not Successful"})
			  		return -1;
			  	})
			}
			res.json({code : 1, message: "Skill Update Successful"})
	})

}