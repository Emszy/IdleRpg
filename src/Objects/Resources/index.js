import RigidBody from '../../Helpers/rigidBody'
// import Skills from '../../Helpers/Skills'
import Inventory from "../../Objects/Inventory"
import {trees, ore} from "../Animations/images";
import ResourceAnimation from "../Animations/resourceAnimation"
import {randomInt} from "../../Helpers/functions"
import {settings} from "../../Helpers/settings"
import Entity from '../Entity'

export default class Resources {
	constructor(items) {
		this.items = items;
	}

	newResource(level, items, resourceFunc) {
		let arr = [];
		for (var i = 0; i < randomInt(1,4); i++) {
				let settings = resourceFunc(level);
				let resource = new Entity({
					name : items[settings.itemIndex].name,
					x : randomInt(0, 450),
					y : randomInt(0, 450),
					width : settings.width,
					height : settings.height,
					startingGold : 0,
					
					status : {
						dead : false,
						deaths : 0,
						currLevel : 1,
						highestLevel : 0,
						teleported : false,
						type: settings.type
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
									singleImg: settings.animation,
								},
					items : this.items
				})
				for (var i = 0; i < settings.amount; i++) {
					resource.inventory.add(items[settings.itemIndex].copy())
				}
			arr.push(resource)
		}
		return (arr);
	}

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
			
			let amount = randomInt(settings.resources.ore.spawnCountRange.start, settings.resources.ore.spawnCountRange.end)

			return ({
				itemIndex : num,
				miningLvl : level,
				woodCutLvl : 1,
				huntingLvl : 1,
				health : 100,
				animation : animation,
				amount : amount,
				type : "ore",
				width: 64,
				height: 64
			})
		}


	createWood(level) {
			let num = 4;
			let woodCuttingLvl = 1;
			let animation = new ResourceAnimation(trees.oak)
			if (level >= 0 && level < 20) {
				num = 0
				woodCuttingLvl = 1;
				animation = new ResourceAnimation(trees.oak)

			} else if (level >= 20 && level < 40) {
				num = 1;
				woodCuttingLvl = 20
				animation = new ResourceAnimation(trees.maple)

			} else if (level >= 40 && level < 60) {
				num = 2;
				woodCuttingLvl = 40
				animation = new ResourceAnimation(trees.mahogony)

			} else if (level >= 60 && level < 80) {
				num = 3;
				woodCuttingLvl = 60;
				animation = new ResourceAnimation(trees.magic)

			} else {
				num = 4;
				woodCuttingLvl = 80;
				animation = new ResourceAnimation(trees.super)

			}

			let amount = randomInt(settings.resources.wood.spawnCountRange.start, settings.resources.wood.spawnCountRange.end)
			return ({
				itemIndex : num,
				miningLvl : 1,
				woodCutLvl : woodCuttingLvl,
				huntingLvl : 1,
				health : 100,
				animation : animation,
				amount : amount,
				type : "tree",
				width : animation.image.pos.width,
				height : animation.image.pos.height, 
			})
	}

}