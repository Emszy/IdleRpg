import RigidBody from '../../Helpers/rigidBody'
import Skills from '../../Helpers/Skills'
import Inventory from "../../Objects/Inventory"
import {trees, ore} from "../Animations/images";
import ResourceAnimation from "../Animations/resourceAnimation"
import {randomInt} from "../../Helpers/functions"
import {settings} from "../../Helpers/settings"
import Entity from '../Entity'

export default class Resources {
	constructor(items) {
		this.items = items;
		let oreItems = items.returnItems(1,0);
		let woodItems = items.returnItems(1,1);
	}

	ores(level) {
		let arr = [];
		for (var i = 0; i < randomInt(1,4); i++) {
				let settings = this.createOres();
				let ore = new Entity({
					name : this.oreItems[settings.oreItemIndex].info.name,
					x : randomInt(0, 450),
					y : randomInt(0, 450),
					width : 64,
					height : 64,
					startingGold : 0,
					
					status : {
						dead : false,
						deaths : 0,
						currLevel : 1,
						highestLevel : 0,
						teleported : false,
					},
					
					skills : {
						attack : 1,
						health : 5,
						defense : 1,
						attackSpeed : 1,
						range : 1,
						magic : 1,
						thirst : 1,
						hunger : 1,
						mining : settings.miningLvl,
						woodcutting : 1,
						hunting : 1,
						hungerDecay : 1000,
						thirstDecay : 800,
					},
					animation : { 
									body: settings.animation,
								},
					items : this.items
				})
				ore.inventory.add(this.oreItems[settings.oreItemIndex].info.copy())
				ore.inventory.add(this.oreItems[settings.oreItemIndex].info.copy())
				ore.inventory.add(this.oreItems[settings.oreItemIndex].info.copy())
				ore.inventory.add(this.oreItems[settings.oreItemIndex].info.copy())
				ore.inventory.add(this.oreItems[settings.oreItemIndex].info.copy())

			arr.push(ore)
		}
		return (arr);
	}



	// constructor(x,y,width,height, items) {
	// 	this.items = items
	// 	this.body = new RigidBody(x, y, width, height);
	// 	this.skills = new Skills();
	// 	this.inventory = new Inventory(items);
	// 	this.miningLvl = 1;
	// 	this.woodCuttingLvl = 1;
	// 	this.dead = false;
	// }

	createOres(level) {
		let animation = new ResourceAnimation(ore.tin)
		let miningLvl = 1;
		let num = 4;

			if (level >= 0 && level < 20) {
				num = randomInt(0,1);
				if (num === 0) {
					animation = new ResourceAnimation(ore.tin)
				} else {
					animation = new ResourceAnimation(ore.copper)
				}
				miningLvl = 1;
			} else if (level >= 20 && level < 40) {
				num = 2;
				miningLvl = 20
				animation = new ResourceAnimation(ore.iron)
			} else if (level >= 40 && level < 60) {
				num = 3;
				miningLvl = 40
				animation = new ResourceAnimation(ore.gold)

			} else if (level >= 60 && level < 80) {
				num = 4;
				miningLvl = 60;
				animation = new ResourceAnimation(ore.platinum)

			} else {
				num = 5;
				miningLvl = 80;
				animation = new ResourceAnimation(ore.diamond)
			}

			return ({
				oreItemIndex : num,
				miningLvl : miningLvl,
				animation : animation,
			})
		}


	// createWood(level) {
	// 	let wood = this.items.categories[1].subcategory[1].items;

	// 		let num = 4;
	// 		if (level >= 0 && level < 20) {
	// 			num = 0
	// 			this.woodCuttingLvl = 1;
	// 			this.animation = new ResourceAnimation(trees.oak)

	// 		} else if (level >= 20 && level < 40) {
	// 			num = 1;
	// 			this.woodCuttingLvl = 20
	// 			this.animation = new ResourceAnimation(trees.maple)

	// 		} else if (level >= 40 && level < 60) {
	// 			num = 2;
	// 			this.woodCuttingLvl = 40
	// 			this.animation = new ResourceAnimation(trees.mahogony)

	// 		} else if (level >= 60 && level < 80) {
	// 			num = 3;
	// 			this.woodCuttingLvl = 60;
	// 			this.animation = new ResourceAnimation(trees.magic)

	// 		} else if (level >= 80) {
	// 			num = 4;
	// 			this.woodCuttingLvl = 80;
	// 			this.animation = new ResourceAnimation(trees.super)

	// 		}
	// 		let amount = randomInt(settings.resources.wood.spawnCountRange.start, settings.resources.wood.spawnCountRange.end)

	// 		for (var x = 0; x < amount; x++) {
	// 			this.inventory.add(wood[num].info.copy());
	// 		}
	// }

	

	// dropInventory() {
	// 	return this.inventory;
	// }
	
	// takeDamage(damage) {
	// 	this.skills.health.take(damage);
	// 	return (this.isDead());
	// }

	// isDead() {
	// 	if (this.skills.health.isZero()) {
	// 		this.dead = true;
	// 		return(this.dropInventory());
	// 	}
	// 	return (false);
	// }

	// getHealth() {
	// 	return this.skills.health.getCurrent();
	// }


}