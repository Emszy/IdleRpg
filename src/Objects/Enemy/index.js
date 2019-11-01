import RigidBody from '../../Helpers/rigidBody'
import Skills from '../../Helpers/Skills'
import Inventory from "../../Objects/Inventory"
import Animation from "../../Objects/Animations"
export default class Enemy {
	
	constructor(x, y, width, height, gold, items) {
		this.body = new RigidBody(x, y, width, height);
		this.body.createPath();
		this.skills = new Skills();
		this.inventory = new Inventory(items);
		this.weapon = items.none();
		this.setGold(gold);
		this.dead = false;
	}
	
	addWeapon(weapon) {
		this.weapon = weapon;
	}

	setGold (gold) {
		this.inventory.addGold(gold);
	}

	setAttack(lvl) {
		this.skills.attack = lvl;
	}

	setAttackSpeed(lvl) {
		this.skills.attackSpeed = lvl;
	}

	setHealth(lvl) {
		this.skills.health = lvl;
	}

	dropGold() {
		return this.inventory.gold;
	}

	dropInventory() {
		return this.inventory;
	}

	fight() {
		return (this.skills.attack.enemyTimer(this.skills.attackSpeed.get()));
	}

	takeDamage(damage) {
		this.skills.health.take(damage);
		return (this.isDead());
	}

	isDead() {
		if (this.skills.health.isZero()) {
			this.dead = true;
			return(this.dropInventory());
		}
		return (false);
	}

	getHealth() {
		return this.skills.health.getCurrent();

	}

	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	log() {
		console.log(this.body.pos.x, this.body.pos.y);
		console.log(this.body.size.x, this.body.size.y);
		console.log(this.skills);
		console.log(this.inventory);
	}

}
