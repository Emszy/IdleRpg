
import Entity from '../Entity'
import {playerImages, playerShirts, playerPants, playerHair, playerTools, playerWeapons, playerArmor} from "../Animations/images"
import Animation from "../Animations"

export default class Player {
	main (name, items) {
		return (new Entity({
				name : name,
				x : 0,
				y : 0,
				width : 64,
				height : 64,
				startingGold : 100,
				
				status : {
					dead : false,
					deaths : 0,
					currLevel : 0,
					highestLevel : 0,
					teleported : false,
					location : "home",
					destination : "home",
				},
				
				skills : {
					attack : 1,
					health : 100,
					defense : 1,
					attackSpeed : 1,
					range : 1,
					magic : 1,
					thirst : 10,
					hunger : 10,
					mining : 1,
					woodcutting : 1,
					hunting : 1,
					hungerDecay : 300,
					thirstDecay : 100,
				},
				animation : {
						body : new Animation(playerImages.coffee),
						shirt : playerShirts.black,
						pants : playerPants.black,
						hair : playerHair.black,
				},

				items : items


			})
		)

	}
}








// import RigidBody from '../../Helpers/rigidBody'
// import Inventory from "../../Objects/Inventory"
// import Skills from '../../Helpers/Skills'
// import Animation from "../../Objects/Animations"
// import PlayerArmor from './armor'
// import Magic from './magic'
// import Home from "./home"

// import {settings} from "../../Helpers/settings"

// export default class Player {
	
// 	constructor(x, y, width, height, items) {
// 		this.body = new RigidBody(x, y, width, height);
// 		this.skills = new Skills();
// 		this.armor = new PlayerArmor(items);
// 		this.home = new Home(items);
// 		this.magic = new Magic(items);
// 		this.inventory = new Inventory(items);	
// 		this.inventory.gold = settings.player.startingGold
// 		this.skills.hunger.setDecayValue(settings.player.hungerDecay);
// 		this.skills.thirst.setDecayValue(settings.player.thirstDecay);
// 		this.skills.attack.set(settings.player.startingAttack);
// 		this.skills.health.set(settings.player.startingHealth);
// 		this.items = items;

		
// 		this.dead = false;
// 		this.deaths = 0;
// 		this.currLevel = 1;
// 		this.highestLevel = 0;
// 		this.teleported = false;
// 		this.firedArrows = [];

// 	}
	
// 	setName(name) {
// 		this.name = name;
// 	}

// 	getName() {
// 		return this.name;
// 	}

// 	fight() {
// 		let damage = this.skills.attack.timer(this.armor.attackSpeedBonus)
// 		if (damage > 0) {
// 			 damage = damage + this.armor.attackBonus
// 		}
// 		return(damage)
// 	}


// 	getVelocity(x, y, x1, y1) {
// 		var dx = (x1 - x);
// 		var dy = (y1 - y);
// 		var mag = Math.sqrt(dx * dx + dy * dy);              
// 		let velocityX = (dx / mag) * 5;
// 		let velocityY = (dy / mag) * 5;
// 		return ({x : velocityX, y: velocityY})
// 	}

// 	fireArrow(target) {

// 		if (this.armor.arrows.id === -1) {
// 			return false
// 		}

// 		if (this.armor.arrows.quantity <= 0) {
// 			this.armor.arrows = this.items.none();
// 			return false;
// 		}

// 		let timer = this.skills.range.timer(settings.player.rangeSpeed)
// 		if (timer > 0 && this.armor.bow.id !== -1) {
// 			this.armor.arrows.quantity--;
// 			let arrow = this.armor.arrows.copy()
// 			let velocity = this.getVelocity(this.body.pos.x, this.body.pos.y, target.body.pos.x, target.body.pos.y);
// 			arrow.setVelocity(velocity.x, velocity.y);
// 			arrow.setPos(this.body.pos.x, this.body.pos.y)
// 			arrow.setSize(5, 7);
// 			this.firedArrows.push({arrow: arrow, target: target}); 
// 		}
// 	}

// 	arrowOutOfBounds(arrow) {
// 		if (arrow.body.pos.x < 0 || arrow.body.pos.x > 500 || arrow.body.pos.y < 0 || arrow.body.pos.y > 500) {
// 			return true
// 		}
// 		return false;
// 	}

// 	arrowCollision() {
// 		for (var i = 0; i < this.firedArrows.length; i++) {
// 			if (this.firedArrows[i]) {
// 				if (this.arrowOutOfBounds(this.firedArrows[i].arrow)) {
// 					this.firedArrows.splice(i, 1);
// 					return ({hit: false, damage: 0});
// 				}

// 				if (this.firedArrows[i].arrow.body.collide(this.firedArrows[i].target.body)) {
// 					let damage = this.firedArrows[i].arrow.bonus
// 					this.firedArrows.splice(i, 1);
// 					return ({hit: true, damage: damage});
// 				}
// 			}
// 		}
// 		return ({hit: false, damage: 0});


// 	}

// 	moveFiredArrows() {
// 		for (var i = 0; i < this.firedArrows.length; i++) {
// 			if (this.firedArrows[i]) {
// 				this.firedArrows[i].arrow.body.pos.x += this.firedArrows[i].arrow.body.velocity.x;
// 				this.firedArrows[i].arrow.body.pos.y += this.firedArrows[i].arrow.body.velocity.y;
// 			}
// 		}
// 	}

// 	clearFiredArrows() {
// 		this.firedArrows = [];
// 	}

// 	mine() {
// 		let damage = this.skills.mining.timer(this.armor.attackSpeedBonus)
// 		if (damage > 0) {
// 			 damage = damage + this.armor.miningBonus
// 		}
// 		return(damage)
// 	}

// 	woodCut() {
// 		let damage = this.skills.woodcutting.timer(this.armor.attackSpeedBonus)
// 		if (damage > 0) {
// 			 damage = damage + this.armor.woodCuttingBonus
// 		}
// 		return(damage)
// 	}

// 	hunt() {
// 		let damage = this.skills.hunting.timer(this.armor.attackSpeedBonus)
// 		if (damage > 0) {
// 			 damage = damage + this.armor.attackBonus
// 		}
// 		return(damage)
// 	}
	
// 	takeDamage(damage) {


// 		if (damage === 0) {
// 			return 0
// 		}

// 		let bonus = this.armor.defenseBonus;
// 		if (damage - bonus <= 0) {
// 			damage = 1;
// 		} else {
// 			damage = damage - bonus;
// 		}

// 		this.skills.health.take(damage);

// 		this.isDead();
// 	}

// 	thirsty(isTime) {
// 		if (isTime) {
// 			if (this.skills.thirst.isZero()) {
// 				this.skills.health.take(settings.player.thirstHealthDecay);
// 			}
// 		}
		
// 	}

// 	hungry(isTime) {
// 		if (isTime) {
// 			if (this.skills.hunger.isZero()) {
// 				this.skills.health.take(settings.player.hungerHealthDecay);
// 			}
// 		}
// 	}


// 	getHealth() {
// 		return this.skills.health.getCurrent();

// 	}

// 	getThirst() {
// 		return this.skills.thirst.getCurrent();

// 	}

// 	getHunger() {
// 		return this.skills.hunger.getCurrent();

// 	}

// 	isDead() {
// 		if (this.skills.health.isZero() === true) {
// 			this.armor.animation.deathTimer.done = false;
// 			this.dead = true;
// 			this.deaths++;
// 		}
// 	}

// 	revive() {
// 		this.dead = false;
// 		this.body.setPos(32 * 5, -32)
// 		this.skills.health.equalize();
// 		this.skills.thirst.equalize();
// 		this.skills.hunger.equalize();
// 		this.armor.addBonus()
// 		let gold = this.inventory.gold

// 		this.inventory = new Inventory(this.items);
// 		this.inventory.addGold(gold);

		
// 		this.currLevel = 1;

// 	}

// 	dropInventory() {
// 		return (this.inventory);
// 	}

// 	newLevel(x, y, map) {
// 		this.body.setPos(x,y)
		
// 		this.currLevel++;
// 		if (this.highestLevel < this.currLevel) {
// 			this.highestLevel = this.currLevel;
// 			map.addInventory();
// 		}
// 	}

// 	teleLevel(x, y, map) {		
// 		if (this.highestLevel < this.currLevel) {
// 			this.highestLevel = this.currLevel;
// 		}
// 	}

// 	prevLevel(x, y) {
// 		this.body.setPos(x,y)
// 		this.currLevel--;
// 	}

// 	nextLevel(x, y) {
// 		this.body.setPos(x,y)
// 		this.currLevel++;
// 	}

// 	log() {
// 		console.log(this.body.pos.x, this.body.pos.y);
// 		console.log(this.body.size.x, this.body.size.y);
// 		console.log(this.skills);
// 		console.log(this.inventory);

// 	}

// }
