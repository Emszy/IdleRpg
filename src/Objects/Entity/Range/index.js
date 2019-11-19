import Projectiles from "../Projectiles"

export default class Range {
	constructor(items) {
		this.projectiles = new Projectiles();
		this.items = items
	}

	shoot(player, enemy, damage) {
		if (player.armor.arrows.id === -1) {
			return false
		}
		else {
			this.projectiles.fire(player, player.armor.arrows, enemy, damage);
		}

	}

	checkCollision(enemies) {
		return (this.projectiles.checkArrowCollision(enemies));
	}

	log() {
		console.log(this.projectiles);
	}
}