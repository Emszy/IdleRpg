import Enemy from "../Enemy"
import { enemyImages, npc } from "../Animations/images"
import Animation from "../../Objects/Animations"
import AnimalAnimation from "../../Objects/Animations/animalAnimation"
import {randomInt} from "../../Helpers/functions"

import {settings} from "../../Helpers/settings"
export default class Enemies {

	constructor () {
			this.arr = [];
   			this.count = randomInt(1,1);
   			this.target = 0;
   			this.complete = false;
   	}


	create = function(level, skills, items) {
		if (level > 0 && level % 10 === 0) {
			this.createBoss(level, skills, items)
		} else {
			this.createEnemy(level, skills, items);
		}
	}

	chooseAnimal(level) {
		if (level >= 0 && level < 20) {
  			return (npc.chicken);
	  	}
		else if (level >= 20 && level < 40) {
			return (npc.cow)
		}

		else if (level >= 40 && level < 60) {
			return (npc.pig)
		}

	    else if (level >= 60 && level < 80) {
			return (npc.turkey)
	    }

	    else if (level >= 80 && level < 100) {
			return (npc.llama)
	    }
	    else {
			return (npc.llama)
	    }
	}

	createAnimals (level, skills, items) {
		this.arr = [];
		this.count = randomInt(settings.animals.spawnCountRange.start, settings.animals.spawnCountRange.end)
		for (let i = 0; i < this.count; i++) {
			let x = randomInt(settings.animals.positionRange.start,settings.animals.positionRange.end) * 5;
			let y = randomInt(settings.animals.positionRange.start,settings.animals.positionRange.end) * 5;
			let gold = 0;
			let animal = new Enemy(x,y,64,64, gold, items);
			let weapon = items.randomWeapon(level)
			let attackSpeed = Math.round(animal.weapon.bonus / settings.animals.attackSpeedDivisor);
			let itemCount = randomInt(settings.animals.itemDropCountRange.start, settings.animals.itemDropCountRange.end);

			animal.skills.attack.setupLvl(level + 1, settings.animals.attack.base, settings.animals.attack.exponent);
			animal.skills.health.setupLvl(level + 1, settings.animals.health.base, settings.animals.health.exponent);
			animal.animation = new AnimalAnimation(this.chooseAnimal(level));
			animal.body.createPath(x, y);
			animal.body.setVelocity(settings.animals.walkVelocity.x, settings.animals.walkVelocity.y)
			weapon.use(animal);
			animal.skills.attackSpeed.set(attackSpeed);

			for (let j = itemCount; j >= 0; j--) {
				animal.inventory.add(items.randomFood(level));
			}
			this.arr[i] = animal;
		}
		this.target = 0;
		this.complete = false;
	}

	

	createEnemy (level, skills, items) {
		this.arr = [];
		this.count = randomInt(settings.enemies.spawnCountRange.start, settings.enemies.spawnCountRange.end)
		for (let i = 0; i < this.count; i++) {
			let x = randomInt(settings.enemies.positionRange.start,settings.enemies.positionRange.end) * 5;
			let y = randomInt(settings.enemies.positionRange.start,settings.enemies.positionRange.end) * 5;
			let goldMultiplierStart = level + 1 * (Math.pow(level, settings.enemies.baseGoldRange.exponent.start));
			let goldMultiplierEnd = level + 1 * (Math.pow(level, settings.enemies.baseGoldRange.exponent.end));
			let baseGoldRange = randomInt(settings.enemies.baseGoldRange.start, settings.enemies.baseGoldRange.end)
			let gold = randomInt(goldMultiplierStart + baseGoldRange, goldMultiplierEnd + baseGoldRange);
			let enemy = new Enemy(x,y,64,64,gold, items);
			let weapon = items.randomWeapon(level)
			let attackSpeed = Math.round(enemy.weapon.bonus / settings.enemies.attackSpeedDivisor);
			
			enemy.skills.attack.setupLvl(level + 1, settings.enemies.attack.base, settings.enemies.attack.exponent);
			enemy.skills.health.setupLvl(level + 1, settings.enemies.health.base, settings.enemies.health.exponent);
			enemy.animation = this.randomEnemy(weapon, level)
			weapon.use(enemy);
			enemy.skills.attackSpeed.set(attackSpeed);
			enemy.inventory.addRandomItem(level, randomInt(settings.enemies.itemDropCountRange.start, settings.enemies.itemDropCountRange.end));
			this.arr[i] = enemy
		}
		this.target = 0;
		this.complete = false;
	}

	createBoss(level, skills, items) {
		this.arr = [];
		this.count = randomInt(settings.bosses.spawnCountRange.start, settings.bosses.spawnCountRange.end)
		for (let i = 0; i < this.count; i++) {
			let x = randomInt(settings.bosses.positionRange.start,settings.bosses.positionRange.end) * 5;
			let y = randomInt(settings.bosses.positionRange.start,settings.bosses.positionRange.end) * 5;


			let goldMultiplierStart = level + 1 * (Math.pow(level, settings.bosses.baseGoldRange.exponent.start));
			let goldMultiplierEnd = level + 1 * (Math.pow(level, settings.bosses.baseGoldRange.exponent.end));
			let baseGoldRange = randomInt(settings.bosses.baseGoldRange.start, settings.bosses.baseGoldRange.end)
			let gold = randomInt(goldMultiplierStart + baseGoldRange, goldMultiplierEnd + baseGoldRange);
			gold = gold * settings.bosses.baseGoldRange.multiplier;
			

			let boss = new Enemy(x,y,64,64, gold, items);
			let weapon = items.randomWeapon(level)

			boss.animation = new Animation(enemyImages.lightDrake)
			boss.animation.addShirt(enemyImages.lightDrakeTail);
			boss.animation.addPants(enemyImages.lightDrakeWings);
			boss.animation.addWeapon(weapon.img);


			boss.skills.attack.setupLvl(level, settings.bosses.attack.base, settings.bosses.attack.exponent);
			boss.skills.health.setupLvl(level, settings.bosses.health.base, settings.bosses.health.exponent);

			weapon.use(boss);
			let attackSpeed = Math.round(boss.weapon.bonus / settings.bosses.attackSpeedDivisor);
			boss.skills.attackSpeed.set(attackSpeed);
			boss.inventory.addRandomItem(level, randomInt(settings.bosses.itemDropCountRange.start, settings.bosses.itemDropCountRange.end));
			this.arr[i] = boss
		}
		this.target = 0;
		this.complete = false;
	}

	choose_target = function () {
		if (this.target >= this.count - 1) {
			this.target = 0;
			this.complete = true;
		} else {
			if (this.complete === false) {
				this.target++;
			}
		}
	}
	clear() {
		this.arr = [];
		this.count = 0;
		this.complete = true
	}

	randomEnemy(weapon, level) {
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
		animation.addWeapon(weapon.img);
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

