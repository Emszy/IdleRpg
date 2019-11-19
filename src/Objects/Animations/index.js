import {timer} from "../../Helpers/functions"

export default class Animation {

	constructor(player) {

		this.player = player
		this.shirt = false
		this.pants = false
		this.hair = false

		this.weapon = false;
		this.shield = false;
		this.chest = false;
		this.legs = false;
		this.boots = false;
		this.helm = false;

		this.pickaxe = false;
		this.axe = false;
		this.bow = false;
		this.arrows = false;
		this.deathTimer = this.makeTimer(this.player.images.hurt.directions.up.end, 200);
		this.walkTimer = this.makeTimer(this.player.images.walk.directions.up.end, 40);
		this.stopTimer = this.makeTimer(this.player.images.idle.directions.up.end, 50);
		this.magicTimer = this.makeTimer(this.player.images.magic.directions.up.end, 200)
		this.shootTimer = this.makeTimer(this.player.images.shoot.directions.up.end - 3, 100)
		this.swingTimer = this.makeTimer(this.player.images.swing.directions.up.end, 200)
		this.thrustTimer = this.makeTimer(this.player.images.thrust.directions.up.end, 250)
	}

	add(article, item) {
		this[article] = item;
	}

	remove(article) {
		this[article] = false;
	}

	changePlayer(player) {
		this.player = player;
	}

	// need item assets for boots and legs

	addShirt(shirt) {
		this.shirt = shirt;
	}

	addPants(pants) {
		this.pants = pants;
	}

	addHair(hair) {
		this.hair = hair;
	}


	makeTimer(end, animationTime) {
		return ({
			index : 0,
			end : end,
			done : false,
			defaultExpire: animationTime,
			delayTimer : timer(animationTime),

			timer : function() {
				if (this.delayTimer.check()) {
					this.index++;
					if (this.index > this.end) {
						this.done = true
						this.index = 0;
					}
					return true
				}
				return (false)
			},

			setExpiration : function(newExpirationTime) {
				this.delayTimer.setExpiration(newExpirationTime);
			},

			defaultExpiration : function() {
				this.delayTimer.setExpiration(this.defaultExpire);
			}
		})

	}


	animate(player, ctx, animation, direction, timer) {
		let size = this.player.size
		let clipY = this.player.images[animation].directions[direction].index * 64
		let playerX = player.body.pos.x
		let playerY = player.body.pos.y

		this.draw(this.player.images[animation].img, size * timer.index, clipY, size, playerX, playerY, ctx)
		
		if (animation === "shoot") {
			this.draw(this.player.images.arrows.img, size * timer.index, clipY, size, playerX, playerY, ctx)
		}
		
		if (this.shirt) {
			this.draw(this.shirt.images[animation].img, size * timer.index, clipY, size, playerX, playerY, ctx)
		}

		if (this.pants) {
			this.draw(this.pants.images[animation].img, size * timer.index, clipY, size, playerX, playerY, ctx)
		}

		if (this.chest) {
			this.draw(this.chest.images[animation].img, size * timer.index, this.chest.images[animation].directions[direction].index * 64, size, playerX, playerY, ctx)

		}

		if (this.shield) {
			this.draw(this.shield.images[animation].img, size * timer.index, this.shield.images[animation].directions[direction].index * 64, size, playerX, playerY, ctx)
		}

		if (this.helm) {
			this.draw(this.helm.images[animation].img, size * timer.index, this.helm.images[animation].directions[direction].index * 64, size, playerX, playerY, ctx)
		} else if (this.hair) {
			this.draw(this.hair.images[animation].img, size * timer.index, this.hair.images[animation].directions[direction].index * 64, size, playerX, playerY, ctx)
		}

	}

	death(player, ctx) {
		//this is just up to keep the format correct
		this.animate(player, ctx, "hurt", "up", this.deathTimer)
		this.deathTimer.timer();
		if (this.deathTimer.done) {
			return true
		}
	}

	walk(direction, player,  ctx) {
		this.animate(player, ctx, "walk", direction, this.walkTimer)
		return (this.walkTimer.timer());
	}

	stop(direction, player,  ctx) {
		this.animate(player, ctx, "idle", direction, this.stopTimer)
		return (this.stopTimer.timer());
	}

	magic(direction, player,  ctx) {
		this.animate(player, ctx, "magic", direction, this.magicTimer)
		return (this.magicTimer.timer());
	}

	shoot(direction, player,  ctx) {
			this.animate(player, ctx, "shoot", direction, this.shootTimer)
			return (this.shootTimer.timer());
	}

	swing(direction, player,  ctx) {
			this.animate(player, ctx, "swing", direction, this.swingTimer)
			return (this.swingTimer.timer());
	}

	thrust(direction, player,  ctx) {
			this.animate(player, ctx, "thrust", direction, this.thrustTimer)
			return (this.thrustTimer.timer());
	}

	rightHand(weapon, direction, player, timer, ctx) {
		if (weapon) {
			let size = this.player.size
			let playerX = player.body.pos.x
			let playerY = player.body.pos.y
			this.draw(weapon.images.swing.img, size * timer.index, weapon.images.swing.directions[direction].index * 64, size, playerX, playerY, ctx)
		}
	}

	woodcut(direction, player, ctx) {
		this.swing(direction, player, ctx);
		this.rightHand(this.axe, direction, player, this.swingTimer, ctx)
	}

	mine(direction, player, ctx) {
		this.swing(direction, player, ctx);
		this.rightHand(this.pickaxe, direction, player, this.swingTimer, ctx)
	}

	fight(direction, player, ctx) {
		this.swing(direction, player, ctx);
		this.rightHand(this.weapon, direction, player, this.swingTimer, ctx)
	}

	range(direction, player, ctx) {
		this.shoot(direction, player, ctx);
		this.rightHand(this.bow, direction, player, this.shootTimer, ctx)
	}


	draw(img, clipX, clipY, size, playerX, playerY, ctx) {
        ctx.drawImage(img, 
                      clipX,
                      clipY, 
                      size, 
                      size,
                      playerX,
                      playerY,
                      size, 
                      size
                    );
       

    }


	timer() {
				this.time++;
				if (this.time > 6) {
					this.time = 0;
					return true
				}
				return false
			}

	increment() {
				if (this.timer()) {
					this.index++;
					if (this.index > this.len) {
						this.index = 0;
					}

					this.clip.pos.x = this.index * 64;	
				}
			}
}