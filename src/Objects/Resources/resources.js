import Resource from "./index"
import {randomInt} from "../../Helpers/functions"
import {settings} from "../../Helpers/settings"

export default class Resources {
	constructor(items, level) {
		this.arr = [];
		this.items = items;
		this.count = randomInt(settings.resources.spawnCountRange.start, settings.resources.spawnCountRange.end);
		this.complete = false;
		this.target = 0;
		for (var x = 0; x < this.count; x++) {
			let x = randomInt(settings.resources.positionRange.start, settings.resources.positionRange.end) * 5;
			let y = randomInt(settings.resources.positionRange.start, settings.resources.positionRange.end) * 5;
			let newResource = new Resource(x, y, 32, 32, items);
			newResource.skills.health.setupLvl(level + 1, settings.resources.health.base, settings.resources.health.exponent);
			this.arr.push(newResource)
		}
	}


	
	clear() {
		this.arr = [];
		this.count = 0;
	}

	createOres(level) {
		for (var x = 0; x < this.count; x++) {
			this.arr[x].createOres(level);
		}
	}

	createWood(level) {
		for (var x = 0; x < this.count; x++) {
			this.arr[x].createWood(level);
		}
	}

	choose_target() {
		if (this.target >= this.count - 1) {
			this.target = 0;
			this.complete = true;
		} else {
			if (this.complete === false) {
				this.target++;
			}
		}
	}

	log() {
		for (var x = 0; x < this.count; x++) {
			console.log(this.arr[x]);
		}
	}

}