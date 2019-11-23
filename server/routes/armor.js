
module.exports = (app, db) => {  

	app.get('/armor', (req, res) => {
		
				db.armorItems.findAll({
					where : {
						user_id: req.session.userId,
					},
				}).then(armor => {
					if (armor) {
						console.log(armor)
						res.json({code: 1, message: "Get Armor Success", armor: armor})
					} else {
						res.json({code : -1, message: "No Session Available"})
					}
				});

	})

	app.post('/saveArmor', (req, res) => {
		
				let armor = req.body.armor
				let armorKeys = Object.keys(armor)
				let key = false;
				let createArmor = [];

				for (key of armorKeys) {
					createArmor.push({
						user_id : req.session.userId,
						armor_id : armor[key].id,
						key : key,
						name : armor[key].item.name,
						item_id: armor[key].item.id,
						item_index: armor[key].item.item_index,
						subCategory_id: armor[key].item.subCategory_id,
						category_id :armor[key].item.category_id,
						quantity : armor[key].item.quantity,
					})
				}
		  	db.armorItems.bulkCreate(createArmor).then(function() {
		  		res.json({code : 1, message: "Armor save Successful"})
		  	}, function(err){
		  		res.json({code : -1, message: "Armor save Not Successful"})

		  	})

	})

	app.post('/updateArmor', (req, res) => {
		  	
			let armor = req.body.armor
			let armorKeys = Object.keys(armor)
			let key = false;
			for (key of armorKeys) {
				db.armorItems.update({ 
					armor_id : armor[key].id,
					name : armor[key].item.name,
					item_id: armor[key].item.id,
					item_index: armor[key].item.item_index,
					subCategory_id: armor[key].item.subCategory_id,
					category_id :armor[key].item.category_id,
					quantity : armor[key].item.quantity,
				}, {
				  where: {armor_id: armor[key].id, user_id : req.session.userId},
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