import {timer} from "../../Helpers/functions"

export default class AnimalAnimation {
	constructor(animal) {
		this.animal = animal;
		this.walkTimer = this.makeTimer(this.animal.images.walk.directions.up.end, 150);
		this.eatTimer = this.makeTimer(this.animal.images.eat.directions.up.end, 150);
		this.deathTimer = this.makeTimer(this.animal.images.eat.directions.up.end, 150);
	}

	makeTimer(end, animationTime) {
		return ({
			index : 0,
			end : end,
			done : false,
			delayTimer : timer(animationTime),
			clear: function() {
				this.time = 0
				this.index = 0
			},

			timer : function() {
				if (this.delayTimer.check()) {
					this.index++;
					if (this.index > this.end) {
						this.done = true
						this.index = 0;
					}
					return true
				}
			}
		})
	}

	animate(animal, ctx, animation, direction, timer) {
		let size = this.animal.size
		let clipY = this.animal.images[animation].directions[direction].index * size
		let animalX = animal.body.pos.x
		let animalY = animal.body.pos.y

		this.draw(this.animal.images[animation].img, size * timer.index, clipY, size, animalX, animalY, ctx, size)
	}

	walk(direction, player,  ctx) {
		this.animate(player, ctx, "walk", direction, this.walkTimer)
		return(this.walkTimer.timer());
	}

	eat(direction, player,  ctx) {
		this.animate(player, ctx, "eat", direction, this.eatTimer)
		return(this.eatTimer.timer());
	}

	draw(img, clipX, clipY, size, resourceX, resourceY, ctx, drawSize = 64) {
        ctx.drawImage(img, 
                      clipX,
                      clipY, 
                      size, 
                      size,
                      resourceX,
                      resourceY,
                      drawSize, 
                      drawSize
                    );
       

    }
}