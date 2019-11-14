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
		this.target = false;
		this.name = settings.name;
		this.info = "information for the person";
		this.items = settings.items;
		this.body = new RigidBody(settings.x, settings.y, settings.width, settings.height);
		this.skills = new Skills(settings.skills);
		this.armor = new Armor(settings.items, settings.animation);
		this.home = new Home(settings.items);
		this.inventory = new Inventory(settings.items);
		this.inventory.addGold(settings.startingGold);
		this.magic = new Magic(settings.items);
		this.status = new Status(settings.status);
		this.range = new Range();

		this.redrawHome = true;
	}

	homeDrawUpdate() {
		if (this.status.currLevel === 0) {
			this.redrawHome = true;
		}
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
	}

	setDestination() {
		if (this.status.actions.walk.state === true && this.status.actions.home.state === true && this.status.actions.farm.state === true) {
			this.status.destination = "farm";
		} else if (this.status.actions.walk.state === true && this.status.actions.home.state === false && this.status.actions.farm.state === true) {
			this.status.destination = "farm";
		} else if (this.status.actions.walk.state === true && this.status.actions.home.state === true && this.status.actions.farm.state === false) {
			this.status.destination = "home";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === true && this.status.actions.farm.state === false) {
			this.status.destination = "home";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === false && this.status.actions.farm.state === true) {
			this.status.destination = "farm";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === false && this.status.actions.farm.state === false) {
			this.status.destination = "none";
		} else if (this.status.actions.walk.state === false && this.status.actions.home.state === true && this.status.actions.farm.state === true) {
			this.status.destination = "home";
		} else {
			this.status.destination = "wild"
		}

	}

	setAction(enemies, ores, trees, animals) {
		if (enemies.length) {
			this.status.action = "fighting";
		} else if (this.status.actions.mine.state === true && ores.length) {
			this.status.action = "mining";
		} else if (this.status.actions.woodCut.state === true && trees.length) {
			this.status.action = "woodCutting";
 		} else if (this.status.actions.hunt.state === true && animals.length) {
			this.status.action = "hunting";
 		} else {
 			this.status.action = "walk";
 		}
	}

	 setAnimationAction() {
      if (this.status.action === "fighting") {
      	this.body.action = "fight";
      } else if (this.status.action === "mining") {
      	this.body.action = "mine";
      } else if (this.status.action === "woodCutting") {
        this.body.action = "woodcut";
      } else if (this.status.action === "hunting") {
        this.body.action = "fight";
      } else {
      	this.body.action = "walk";
      }
   }


	newLevel(x, y, map) {
		this.body.setPos(x,y)
		this.status.currLevel++;
		if (this.status.highestLevel < this.status.currLevel) {
			this.status.highestLevel = this.status.currLevel;
			map.addInventory();
		}
		this.homeDrawUpdate();

	}

	teleLevel(x, y, map) {		
		if (this.status.highestLevel < this.status.currLevel) {
			this.status.highestLevel = this.status.currLevel;
		}
	}

	prevLevel(x, y) {
		this.body.setPos(x,y)
		this.status.currLevel--;
		this.homeDrawUpdate();
	}

	nextLevel(x, y) {
		this.body.setPos(x,y)
		this.status.currLevel++;
		this.homeDrawUpdate();
	}

	display() {
		console.log("location", this.status.location)
		console.log("destination", this.status.destination)
 		console.log("action", this.status.action)
 		console.log("bodyAction", this.body.action)
	}

}