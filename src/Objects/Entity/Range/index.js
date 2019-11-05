import Projectiles from "../Projectiles"

export default class Range {
	constructor() {
		this.projectiles = new Projectiles();
	}

	shoot(player, enemy) {
		if (player.armor.arrows.id === -1) {
			return false
		}
		this.projectiles.fire(player, player.armor.arrows, enemy);
	}

	checkCollision(enemies) {
		this.projectiles.checkArrowCollision(enemies);
	}

	log() {
		console.log(this.projectiles);
	}
}