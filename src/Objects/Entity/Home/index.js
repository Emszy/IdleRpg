import RigidBody from '../../../Helpers/rigidBody'
import Inventory from "../../Inventory"
import ResourceAnimation from "../../Animations/resourceAnimation"
import HomeAnimation from "../../Animations/homeAnimation"

import {farmImages, mapAtlas} from "../../Animations/images";
import {settings} from "../../../Helpers/settings"
import {randomInt} from "../../../Helpers/functions"


export default class Home {
	constructor(items) {
		this.waterWell = this.makeWaterWell(items);
		this.bank = this.makeBank(items);
		this.fillBank(items);
		this.buyMenu = this.makeBuyMenu();
		this.farm = this.makeFarm(items);
		this.floorAnimation = new HomeAnimation(mapAtlas.home.floor)
		this.wallAnimation = new HomeAnimation(mapAtlas.home.walls)
		this.floor = [];
		this.makeFloor()

	}

	makeFloor() {
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				this.floor.push({
					index: randomInt(1, 5),
					body : new RigidBody(j * 32, i * 32, 32,32)
				})
			}
		}
	}

	makeFarm(items) {
		let farm = {
			items : items.returnItems(1,2),
			waterItems : items.returnItems(0,2),
			waterLevel: 0,
			body : new RigidBody(5, 283, 8*32, 64),
			plot : new ResourceAnimation(farmImages.plot),
			spaces : [],
			level: 0,
			upgradePrice : [500, 5000, 50000, 150000, 500000, 1000000],
			upgradePriceStr : ["500", "5k", "50k", "150k", "500k", "1m", "MAX"],

			add: function(seed) {
				let match = false;
				for (var i = this.items.length - 1; i >= 0; i--) {
					if (this.items[i].id === seed.id){
						match = true
					}
				}

				if (!match) {
					return false
				}

				for ( i = this.spaces.length - 1; i >= 0; i--) {
					if (this.spaces[i].seed === false) {
						seed = seed.copy();

						seed.quantity = settings.player.farm.seedCostToPlant
						this.spaces[i].seed = seed;
						return (true)
					}
				}
				return (false)
			},

			addWater(water) {
				let match = false;
				let id = -1
				for (var i = this.waterItems.length - 1; i >= 0; i--) {
					if (this.waterItems[i].id === water.id){
						match = true
						id = i;
					}
				}

				if (!match) {
					return false
				}
				this.waterLevel = this.waterLevel + ((id + 1) * 5)

				return true
			},

			waterLevelStr : function() {
				if (this.waterLevel <= 0) {
					return ("Needs Water");
				} else {
					return (this.waterLevel.toString());
				}
			},

			harvest : function(index, inventory) {
				return(this.spaces[index].harvest(inventory))
			},

			timer : function() {
				for (var i = this.spaces.length - 1; i >= 0; i--) {
					if (this.waterLevel > 0) {
						this.waterLevel = this.spaces[i].levelUp(this.waterLevel);
					} else {
						return false;
					}
				}
			},

			createSeedSpaces : function() {
				let x = this.body.pos.x;
				let y = this.body.pos.y;

				let end = 10 * 32;
				let width = 32;
				let height = 32;
				for (let i = 0; i < 96; i += height) {
					for (let j = 0; j < end; j+= width) {
						this.spaces.push(this.makeSeedSlot(x + j, i + y))
					}
				}
			},

			makeSeedSlot : function(x,y) {
				return ({
					seed : false,
					time : 0,
					maxTime : randomInt(settings.player.farm.seedGrowTimerMin, settings.player.farm.seedGrowTimerMax),
					level : 0,
					done : false,
					body : new RigidBody(x, y, 32, 64),




					timer : function() {
						if(!this.seed || this.done) {
							return (false)
						}
						this.time++;
						if (this.time > this.maxTime) {
							this.maxTime = randomInt(settings.player.farm.seedGrowTimerMin, settings.player.farm.seedGrowTimerMax)

							this.time = 0
							
							return (true);
						}
						return false;
					},

					levelUp : function(waterLevel) {
						if (this.timer()) {
							if (this.level < 3) {
								waterLevel -= 1;
								this.level++;
								return waterLevel

							} else {
								this.done = true
								return waterLevel
							}
						}
						return waterLevel

					},

					harvest : function(inventory) {
						if (this.done) {
							let item = this.seed.use();

							inventory.addQuantity(item.item, item.item.quantity)
							this.seed = false;
							this.level = 0;
							this.time = 0;
							this.done = false

						} else {
							return ("Nothing To Harvest")
						}
					}
				})
			}
		}
		farm.createSeedSpaces();
		return (farm);
	}

	makeWaterWell(items) {

		let waterWell = {
			items : items.returnItems(0,2),
			body : new RigidBody(230,60,70, 100),
			level : 0,
			time : 0,
			upgradePrice : [5000, 50000, 150000, 500000, 1000000],
			upgradePriceStr : ["5k", "50k", "150k", "500k", "1m", "MAX"],
			animation: new HomeAnimation(mapAtlas.home.well),

			timer : function() {
				this.time++;

				if (this.time > settings.player.waterWell.collectionTimer) {
					this.time = 0
					return (true);
				}
				return false;
			},

			upgradeStr : function() {
				return ("Upgrade : " + this.getUpgradePriceStr());
			},

			lvlStr : function() {
				return ("level: " + this.level + 1);
			},


			getLvl : function() {
				return (this.level);
			},

			getUpgradePrice : function() {
				return this.upgradePrice[this.level];
			},

			getUpgradePriceStr : function() {
				return this.upgradePriceStr[this.level];
			},

			upgrade : function(inventory) {
				if (this.level === 5) {
					return (false);
				}
				if (inventory.gold > this.getUpgradePrice()) {
					inventory.gold = inventory.gold - this.getUpgradePrice()
					this.level++;
				}
			},

			getWater(inventory) {
				if(this.timer()) {
					inventory.add(this.items[this.level]);
					return true
				}
				return false;
			}



		}
		return (waterWell)
	}

	makeBank(items) {
		let inventory = new Inventory(items, 200);
		let bank = {
			body : new RigidBody(40,60,100, 50),
			animation : new HomeAnimation(mapAtlas.home.chest),
			inventory : inventory
		}
		return (bank)
	}

	addBankItems(items) {
		for (var i = items.length - 1; i >= 0; i--) {
			for (let x = 100; x >= 0; x--) {
				this.bank.inventory.add(items[i])
			}

		}
	}

	fillBank(item) {
		let items = item.returnItems(1,2);
		this.addBankItems(items);
		items = item.returnItems(1,1);
		this.addBankItems(items);
		items = item.returnItems(1,0);
		this.addBankItems(items);
		items = item.returnItems(2,0);
		this.addBankItems(items);
		items = item.returnItems(0,0);
		this.addBankItems(items);
		items = item.returnItems(0,1);
		this.addBankItems(items);
		items = item.returnItems(0,2);
		this.addBankItems(items);
		items = item.returnItems(0,3);
		this.addBankItems(items);
		items = item.returnItems(3,0);
		this.addBankItems(items);




			

	}

	makeBuyMenu(items) {
		let buyMenu = {
			body : new RigidBody(50,170,50, 100),
			items : items,
			animation: new HomeAnimation(mapAtlas.home.craft)
		}
		return (buyMenu)
	}


}