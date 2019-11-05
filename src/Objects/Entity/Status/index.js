export default class Status {
	constructor(settings) {
		this.dead = settings.dead || false;
		this.deaths = settings.deaths || 0;
		this.currLevel = settings.currLevel || 0;
		this.highestLevel = settings.highestLevel || 0;
		this.teleported = settings.teleported || false;
		this.location = settings.location || "home";
		this.destination = settings.destination || "home";

		this.actions = {
				walk : this.toggleSwitch(false),
				mine : this.toggleSwitch(true),
				woodCut : this.toggleSwitch(true),
				home : this.toggleSwitch(false),
				hunt : this.toggleSwitch(true),
				farm : this.toggleSwitch(false),
				currentDirection : "north",
				action : "stop"
		}
	}


	toggleSwitch(state) {
		return ({
					state : false,
					start : function() {
						this.state = true;
					},
					stop : function() {
						this.state = false;
					}
				})
	}

	log() {
		console.log(this)
	}
}