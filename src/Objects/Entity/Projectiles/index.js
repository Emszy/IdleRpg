export default class Projectiles {
	constructor() {
		this.active = [];
	}

	getVelocity(x, y, x1, y1) {
		var dx = (x1 - x);
		var dy = (y1 - y);
		var mag = Math.sqrt(dx * dx + dy * dy);              
		let velocityX = (dx / mag) * 5;
		let velocityY = (dy / mag) * 5;
		return ({x : velocityX, y: velocityY})
	}

	fire(player, item, target) {
			let projectile = item.copy()
			let velocity = this.getVelocity(player.body.pos.x, player.body.pos.y, target.body.pos.x, target.body.pos.y);
			projectile.setVelocity(velocity.x, velocity.y);
			projectile.setPos(player.body.pos.x, player.body.pos.y)
			projectile.setSize(5, 7);
			this.active.push({projectile: projectile}); 
	}

	projectileOutOfBounds(projectile) {
		if (projectile.body.pos.x < 0 || projectile.body.pos.x > 500 || projectile.body.pos.y < 0 || projectile.body.pos.y > 500) {
			return true
		}
		return false;
	}

	checkArrowCollision(enemies) {
		for (var i = 0; i < enemies.length; i++) {
			this.moveFiredArrows();
			let collision = this.arrowCollision(enemies[i])
			if (collision.hit) {
				return (collision)
			}
		}
		return (false);
	}

	arrowCollision(enemy) {
		for (var i = 0; i < this.active.length; i++) {
			if (this.active[i]) {
				if (this.projectileOutOfBounds(this.active[i].projectile)) {
					this.active.splice(i, 1);
					return ({hit: false, damage: 0});
				}

				if (this.active[i].projectile.body.collide(enemy.body)) {
					let damage = this.active[i].projectile.bonus
					this.active.splice(i, 1);
					return ({hit: true, damage: damage});
				}
			}
		}
		return ({hit: false, damage: 0});


	}

	moveFiredArrows() {
		for (var i = 0; i < this.active.length; i++) {
			if (this.active[i]) {
				this.active[i].projectile.body.pos.x += this.active[i].projectile.body.velocity.x;
				this.active[i].projectile.body.pos.y += this.active[i].projectile.body.velocity.y;
			}
		}
	}

	clearActive() {
		this.active = [];
	}


}