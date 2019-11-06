import {userInterface} from "../../Animations/images"

export default class Status {
	constructor(settings) {
		this.type = settings.type || "enemy";
		this.dead = settings.dead || false;
		this.deaths = settings.deaths || 0;
		this.currLevel = settings.currLevel || 0;
		this.highestLevel = settings.highestLevel || 0;
		this.teleported = settings.teleported || false;
		this.location = settings.location || "home";
		this.destination = settings.destination || "home";
		this.action = "stop";
		this.currentDirection = "north"

		this.actions = {
				walk : this.toggleSwitch("Walk", true),
				home : this.toggleSwitch("Home", true),
				farm : this.toggleSwitch("Farm", false),
				mine : this.toggleSwitch("Mine", false),
				woodCut : this.toggleSwitch("WoodCut", false),
				hunt : this.toggleSwitch("Hunt", false),
		}
	}


	toggleSwitch(name, state) {

		return ({
					name : name,
					state : state,

					start : function() {
						this.state = true;
					},

					stop : function() {
						this.state = false;
					},

					label : function() {
						if (this.state) {
							return this.name + "\nStop";
						} else {
							return this.name + "\nStart";
						}
					},

					button : function() {
						if (this.state) {
							return userInterface.redButton
						} else {
							return userInterface.greenButton
						}
					}




				})
	}

	log() {
		console.log(this)
	}
}