
module.exports = (app, db) => {  

	app.get('/inventory', (req, res) => {
		
				db.inventoryItems.findAll({
					where : {
						user_id: req.session.userId,
					},
				}).then(inventory => {
					if (inventory) {
						console.log(inventory)
						res.json({code: 1, message: "Get inventory Success", inventory: inventory})
					} else {
						res.json({code : -1, message: "No Session Available"})
					}
				});

	})

	app.post('/saveInventory', (req, res) => {
		
				let inventory = req.body.inventory
				let items = [];
				db.inventoryItems.destroy({
					where: {
						user_id : req.session.userId
					}
				}).then(function() {
						for (var i = 0; i < inventory.length; i++) {
							if (inventory[i].id != -1) {
								items.push({
									user_id : req.session.userId,
									name : inventory[i].name,
									item_id: inventory[i].id,
									item_index: inventory[i].item_index,
									subCategory_id: inventory[i].subCategory_id,
									category_id :inventory[i].category_id,
									quantity : inventory[i].quantity,
								})
							}
						}

				  	db.inventoryItems.bulkCreate(items).then(function() {
				  		res.json({code : 1, message: "Inventory save Successful"})
				  	}, function(err){
				  		// console.log(err)
				  		res.json({code : -1, message: "save Not Successful"})

				  	})
				})
				

	})


}