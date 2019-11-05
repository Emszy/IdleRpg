import { enemyImages, playerShirts, playerPants, playerHair, playerTools, playerWeapons, playerArmor } from "../Animations/images"

import Animation from "../../Objects/Animations"
import {randomInt} from "../../Helpers/functions"
import Entity from '../Entity'
import {settings} from "../../Helpers/settings"

export default class Enemies {
	constructor(items) {
		this.items = items
	}

	basic(name, level) {
		let arr = [];
		for (var i = 0; i < randomInt(1,4); i++) {
			
				let enemy = new Entity({
					name : name,
					x : randomInt(0, 450),
					y : randomInt(0, 450),
					width : 64,
					height : 64,
					startingGold : 100,
					
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
						mining : 1,
						woodcutting : 1,
						hunting : 1,
						hungerDecay : 1000,
						thirstDecay : 800,
					},
					animation : { 
									body: this.randomEnemy(level),
									shirt : playerShirts.black,
									pants :	playerPants.black,
									hair : playerHair.black,
								},
					items : this.items
				})
				enemy.inventory.add(this.items.randomItemDrop(level))
				enemy.inventory.add(this.items.randomItemDrop(level))
				enemy.inventory.add(this.items.randomItemDrop(level))
				enemy.inventory.add(this.items.randomItemDrop(level))
				enemy.inventory.add(this.items.randomItemDrop(level))
				enemy.body.createPath(enemy.body.pos.x,enemy.body.pos.y)
				enemy.body.setVelocity(settings.enemies.walkVelocity.x, settings.enemies.walkVelocity.y)

			arr.push(enemy)
		}
		return (arr);
	}



	randomEnemy(level) {
			let animation = new Animation(enemyImages.lightDrake)
			if (level >= 0 && level < 20) {
				animation = this.maleor();
			}
			else if (level >= 20 && level < 40) {
				animation = this.lightDrake();
			}

			else if (level >= 40 && level < 60) {
				animation = this.lightDrake();
			}

		    else if (level >= 60 && level < 80) {
				animation = this.lightDrake();
			}

		    else if (level >= 80 && level < 100) {
				animation = this.lightDrake();
			}
		    else {
				animation = this.lightDrake();
			}
			// animation.addWeapon(weapon.img);
			return animation
		}

		lightDrake() {
			let animation = new Animation(enemyImages.lightDrake)
			animation.addShirt(enemyImages.lightDrakeTail);
			animation.addPants(enemyImages.lightDrakeWings);
			return animation
		}

		blueDrake() {
			let animation = new Animation(enemyImages.blueDrake)
			animation.addShirt(enemyImages.blueDrakeTail);
			animation.addPants(enemyImages.blueDrakeWings);
			animation.addHair(enemyImages.blueDrakeWingsFront);
			animation.addBoots(enemyImages.blueDrakeTailFront);
			return animation
		}
		skeleton() {
			let animation = new Animation(enemyImages.skeleton)
			return animation
		}
		maleor() {
			let animation = new Animation(enemyImages.maleor)
			return animation
		}

		blueImp() {
			let animation = new Animation(enemyImages.blueImp)
			return animation
		}
}
