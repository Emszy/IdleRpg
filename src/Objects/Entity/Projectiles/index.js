export default class Projectiles {
	constructor() {
		this.active = [];
	}

	getVelocity(x, y, x1, y1) {
		var dx = (x1 - x);
		var dy = (y1 - y);
		var mag = Math.sqrt(dx * dx + dy * dy);              
		let velocityX = (dx / mag);
		let velocityY = (dy / mag);
		return ({x : velocityX, y: velocityY})
	}

	getArrowDirectionImg(velocity, item) {
		let img = false;
		if (velocity.x === 1 && velocity.y === 0) {
			img = item.animation.east;
		}
		if (velocity.x === -1 && velocity.y === 0) {
			img = item.animation.west;
		}
		if (velocity.x === 0 && velocity.y === 1) {
			img = item.animation.south;
		}
		if (velocity.x === 0 && velocity.y === -1) {
			img = item.animation.north;
		} 
		if (velocity.x > 0 && velocity.y > 0) {
			img = item.animation.southEast;
		}
		if (velocity.x > 0 && velocity.y < 0) {
			img = item.animation.northEast;
		}
		if (velocity.x < 0 && velocity.y > 0) {
			img = item.animation.southWest;
		}
		if (velocity.x < 0 && velocity.y < 0) {
			img = item.animation.northWest;
		}
		// console.log(velocity, img)
		return (img);

	}

	fire(player, item, target, damage) {
			let projectile = item.copy()
			item.quantity -= 1;
			let velocity = this.getVelocity(player.body.pos.x + (player.body.size.x / 2), 
											player.body.pos.y + (player.body.size.y / 2), 
											target.body.pos.x + (target.body.size.x / 2), 
											target.body.pos.y + (target.body.size.y / 2));
			projectile.setVelocity(velocity.x, velocity.y);
			projectile.setPos(player.body.pos.x, player.body.pos.y);
			let img = this.getArrowDirectionImg(velocity, item);
			projectile.setSize(32, 32);
			projectile.bonus = damage;
			this.active.push({projectile: projectile, img:img}); 
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
				collision.index = i;
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