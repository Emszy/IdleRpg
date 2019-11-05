import RigidBody from '../../Helpers/rigidBody'

import Skills from "./Skills"
import Inventory from "../../Objects/Inventory"
import Armor from './Armor'
import Home from './Home'
import Range from './Range'
import Magic from './Magic'
import Status from './Status'


export default class Entity {
	
	constructor(settings) {
		this.name = settings.name;
		this.items = settings.items;
		this.body = new RigidBody(settings.x, settings.y, settings.width, settings.height);
		this.skills = new Skills(settings.skills);
		this.armor = new Armor(settings.items, settings.animation);
		this.home = new Home(settings.items);
		this.inventory = new Inventory(settings.items);
		this.magic = new Magic(settings.items);
		this.status = new Status(settings.status);
		this.range = new Range();
	}

	setLocation() {
		if (this.status.currLevel === 0) {
			this.status.location = "home";
		} else if (this.status.currLevel === -1) {
			this.status.location = "farm";
		} else if (this.status.currLevel > 0) {
			this.status.location = "wild";
		} else {
			this.status.location = "lost";
		}
		// console.log("location", this.status.location)
	}

	setDestination() {
		if (this.status.actions.walk.state === true && this.status.actions.home.state === true && this.status.actions.farm.state === true) {
			this.status.actions.destination = "farm";
		} else if (this.status.actions.walk.state === true && this.status.actions.home.state === false && this.status.actions.farm.state === true) {
			this.status.actions.destination = "farm";
		} else if (this.status.actions.walk.state === true && this.status.actions.home.state === true && this.status.actions.farm.state === false) {
			this.status.actions.destination = "home";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === true && this.status.actions.farm.state === false) {
			this.status.actions.destination = "home";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === false && this.status.actions.farm.state === true) {
			this.status.actions.destination = "farm";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === false && this.status.actions.farm.state === false) {
			this.status.actions.destination = "none";
		} else {
			this.status.actions.destination = "wild"
		}
		// console.log("Destination", this.status.actions.destination)
	}



	setAction(enemies, ores, trees, animals) {

		if (enemies.length) {
			this.status.actions.action = "fighting";
		} else if (this.status.actions.mine.state === true && ores.length) {
			this.status.actions.action = "mining";
		} else if (this.status.actions.woodCut.state === true && trees.length) {
			this.status.actions.action = "woodCutting";
 		} else if (this.status.actions.hunt.state === true && animals.length) {
			this.status.actions.action = "hunting";
 		} else {
 			this.status.actions.action = "walk";
 		}

 		// console.log("Action", this.status.actions.action)
	}





	newLevel(x, y, map) {
		this.body.setPos(x,y)
		
		this.status.currLevel++;
		if (this.status.highestLevel < this.status.currLevel) {
			this.status.highestLevel = this.status.currLevel;
			map.addInventory();
		}
	}

	teleLevel(x, y, map) {		
		if (this.status.highestLevel < this.status.currLevel) {
			this.status.highestLevel = this.status.currLevel;
		}
	}

	prevLevel(x, y) {
		this.body.setPos(x,y)
		this.status.currLevel--;
	}

	nextLevel(x, y) {
		this.body.setPos(x,y)
		this.status.currLevel++;
	}

}