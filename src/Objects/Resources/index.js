import RigidBody from '../../Helpers/rigidBody'
import Skills from '../../Helpers/Skills'
import Inventory from "../../Objects/Inventory"
import {trees, ore} from "../Animations/images";
import ResourceAnimation from "../Animations/resourceAnimation"
import {randomInt} from "../../Helpers/functions"
import {settings} from "../../Helpers/settings"

export default class Resource {

	constructor(x,y,width,height, items) {
		this.items = items
		this.body = new RigidBody(x, y, width, height);
		this.skills = new Skills();
		this.inventory = new Inventory(items);
		this.miningLvl = 1;
		this.woodCuttingLvl = 1;
		this.dead = false;
	}

	createOres(level) {
		let ores = this.items.categories[1].subcategory[0].items;
		this.animation = new ResourceAnimation(ore.tin)

		
			let num = 4;
			if (level >= 0 && level < 20) {
				num = randomInt(0,1);
				if (num === 0) {
					this.animation = new ResourceAnimation(ore.tin)
				} else {
					this.animation = new ResourceAnimation(ore.copper)
				}
				this.miningLvl = 1;
			} else if (level >= 20 && level < 40) {
				num = 2;
				this.miningLvl = 20
				this.animation = new ResourceAnimation(ore.iron)
			} else if (level >= 40 && level < 60) {
				num = 3;
				this.miningLvl = 40
				this.animation = new ResourceAnimation(ore.gold)

			} else if (level >= 60 && level < 80) {
				num = 4;
				this.miningLvl = 60;
				this.animation = new ResourceAnimation(ore.platinum)

			} else {
				num = 5;
				this.miningLvl = 80;
				this.animation = new ResourceAnimation(ore.diamond)

			}
		

				let amount = randomInt(settings.resources.ore.spawnCountRange.start, settings.resources.ore.spawnCountRange.end)
				for (var x = 0; x < amount; x++) {
				this.inventory.add(ores[num].info.copy());
		}


	}

	createWood(level) {
		let wood = this.items.categories[1].subcategory[1].items;

			let num = 4;
			if (level >= 0 && level < 20) {
				num = 0
				this.woodCuttingLvl = 1;
				this.animation = new ResourceAnimation(trees.oak)

			} else if (level >= 20 && level < 40) {
				num = 1;
				this.woodCuttingLvl = 20
				this.animation = new ResourceAnimation(trees.maple)

			} else if (level >= 40 && level < 60) {
				num = 2;
				this.woodCuttingLvl = 40
				this.animation = new ResourceAnimation(trees.mahogony)

			} else if (level >= 60 && level < 80) {
				num = 3;
				this.woodCuttingLvl = 60;
				this.animation = new ResourceAnimation(trees.magic)

			} else if (level >= 80) {
				num = 4;
				this.woodCuttingLvl = 80;
				this.animation = new ResourceAnimation(trees.super)

			}
			let amount = randomInt(settings.resources.wood.spawnCountRange.start, settings.resources.wood.spawnCountRange.end)

			for (var x = 0; x < amount; x++) {
				this.inventory.add(wood[num].info.copy());
			}
	}

	

	dropInventory() {
		return this.inventory;
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


}