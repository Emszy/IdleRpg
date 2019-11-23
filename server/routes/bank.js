
module.exports = (app, db) => {  

	app.get('/bank', (req, res) => {
		
				db.bankItems.findAll({
					where : {
						user_id: req.session.userId,
					},
				}).then(bank => {
					if (bank) {
						console.log(bank)
						res.json({code: 1, message: "Get BANK Success", bank: bank})
					} else {
						res.json({code : -1, message: "No Session Available"})
					}
				});

	})

	app.post('/saveBank', (req, res) => {
				let inventory = req.body.bank
				let items = [];
				db.bankItems.destroy({
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

				  	db.bankItems.bulkCreate(items).then(function() {
				  		res.json({code : 1, message: "bank save Successful"})
				  	}, function(err){
				  		// console.log(err)
				  		res.json({code : -1, message: "Bank Save Not Successful"})

				  	})
				})
				

	})


}