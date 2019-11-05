import { enemyImages, playerShirts, playerPants, playerHair, playerTools, playerWeapons, playerArmor } from "../Animations/images"

import Animation from "../../Objects/Animations"
import {randomInt} from "../../Helpers/functions"
import Entity from '../Entity'

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

// export default Enemy;



// import RigidBody from '../../Helpers/rigidBody'
// import Skills from '../../Helpers/Skills'
// import Inventory from "../../Objects/Inventory"

// export default class Enemy {
	
// 	constructor(x, y, width, height, gold, items) {
// 		this.body = new RigidBody(x, y, width, height);
// 		this.body.createPath();
// 		this.skills = new Skills();
// 		this.inventory = new Inventory(items);
// 		this.weapon = items.none();
// 		this.setGold(gold);
// 		this.dead = false;
// 	}
	
// 	addWeapon(weapon) {
// 		this.weapon = weapon;
// 	}

// 	setGold (gold) {
// 		this.inventory.addGold(gold);
// 	}

// 	setAttack(lvl) {
// 		this.skills.attack = lvl;
// 	}

// 	setAttackSpeed(lvl) {
// 		this.skills.attackSpeed = lvl;
// 	}

// 	setHealth(lvl) {
// 		this.skills.health = lvl;
// 	}

// 	dropGold() {
// 		return this.inventory.gold;
// 	}

// 	dropInventory() {
// 		return this.inventory;
// 	}

// 	fight() {
// 		return (this.skills.attack.enemyTimer(this.skills.attackSpeed.get()));
// 	}

// 	takeDamage(damage) {
// 		this.skills.health.take(damage);
// 		return (this.isDead());
// 	}

// 	isDead() {
// 		if (this.skills.health.isZero()) {
// 			this.dead = true;
// 			return(this.dropInventory());
// 		}
// 		return (false);
// 	}

// 	getHealth() {
// 		return this.skills.health.getCurrent();

// 	}

// 	setName(name) {
// 		this.name = name;
// 	}

// 	getName() {
// 		return this.name;
// 	}

// 	log() {
// 		console.log(this.body.pos.x, this.body.pos.y);
// 		console.log(this.body.size.x, this.body.size.y);
// 		console.log(this.skills);
// 		console.log(this.inventory);
// 	}

// }
