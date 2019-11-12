
// anywhere there is nameThenRange means there is a random int betwee start - end

let settings = {

	player : {
		startingGold : 100,
		startingAttack : 1,
		startingHealth : 100,
		hungerDecay : 1100,
		thirstDecay : 900,
		rangeSpeed: 25,
		thirstHealthDecay : 10,
		hungerHealthDecay : 10,

		farm : {
			seedGrowTimerMin : 100,
			seedGrowTimerMax : 500,
			seedCostToPlant : 5,
		},

		waterWell : {
			collectionTimer : 80,
		}
	},

	inventory : {
		sellPrice : 0.5
	},


	enemies : {

		baseGoldRange : {
			start: 5,
			end : 20,
			exponent : {
				start: 1.03,
				end : 1.1,
			}
		},

		attack : {
			base : 1.02,
			exponent : 1.2
		},

		health : {
			base : 2,
			exponent : 1.7
		},

		// attack of weapon divided by a divisor equals attack speed, higher divisor = lower speed
		attackSpeedDivisor : 6,

		itemDropCountRange : {
			start : 1,
			end : 2,
		},

		spawnCountRange : {
			start : 1,
			end : 4,
		},

		positionRange : {
			start : 0,
			end : 50,
		},
		
		walkVelocity : {
			x : 1,
			y: 1
		},

	},

	bosses : {
		baseGoldRange : {
			start: 50,
			end : 100,
			exponent : { 
				start: 1.2, 
				end: 1.3,
			},
			multiplier : 10,
		},

		attack : {
			base : 1.4,
			exponent : 1.02
		},

		health : {
			base : 2,
			exponent : 1.5
		},

		// attack of weapon divided by a divisor equals attack speed, higher divisor = lower speed
		attackSpeedDivisor : 6,

		itemDropCountRange : {
			start : 1,
			end : 2,
		},

		spawnCountRange : {
			start : 1,
			end : 2,
		},

		positionRange : {
			start : 0,
			end : 50,
		},
	},

	animals : {
		spawnCountRange : {
			start : 1,
			end : 2,
		},
		positionRange : {
			start : 0,
			end : 50,
		},

		baseGoldRange : {
			start: 0,
			end : 0,
			exponent : 0,
		},

		attack : {
			base : 1.1,
			exponent : 1.02
		},

		health : {
			base : 1.8,
			exponent : 1.2
		},
		walkVelocity : {
			x : 2,
			y: 2
		},

		// attack of weapon divided by a divisor equals attack speed, higher divisor = lower speed
		attackSpeedDivisor : 6,

		itemDropCountRange : {
			start : 1,
			end : 2,
		},
	},

	resources : {
		health : {
			base : 1.8,
			exponent : 1.2
		},
		spawnCountRange : {
			start : 1,
			end : 20,
		},
		positionRange : {
			start : 0,
			end : 50,
		},
		wood : {
				spawnCountRange : {
				start : 1,
				end : 4,
			},
		},

		ore : {
				spawnCountRange : {
				start : 1,
				end : 4,
			},
		}
	}
	
}


export {settings}