export default class ResourceAnimation {
	constructor(resource) {
		this.image = resource;

		let end = 0;

		if (this.image.end) {
			end = this.image.end
		}
		this.resourceTimer = this.makeTimer(end, 10);

	}

	makeTimer(end, animationTime) {
		return ({
			time : 0,
			index : 0,
			end : end,
			animationTime: animationTime,
			done : false,
			clear: function() {
				this.time = 0
				this.index = 0
			},

			timer : function() {
				this.time ++;
				if (this.time > this.animationTime) {
					this.time = 0;
					this.index++;
					if (this.index > this.end) {
						this.done = true
						this.index = 0;
					}
				}
			}
		})
	}


	drawTree(resource, ctx) {
		ctx.drawImage(this.image.img, 
                      this.image.pos.x,
                      this.image.pos.y, 
                      this.image.pos.width, 
                      this.image.pos.height,
                      resource.body.pos.x,
                      resource.body.pos.y,
                      64, 
                      96,
                    );

	}

	drawOre(resource, ctx) {
		this.draw(this.image.img, this.image.pos.x, this.image.pos.y, this.image.size, resource.body.pos.x, resource.body.pos.y, ctx, 64)

	}

	drawFarmPlot(resource, ctx) {
		let xOffset = 0;
		this.drawFarm(this.image.img, this.image.leftTop.x, this.image.leftTop.y, this.image.leftTop.width, this.image.leftTop.height, resource.body.pos.x - 32, resource.body.pos.y - 32, ctx, 32)
		
		this.drawFarm(this.image.img, this.image.leftMiddle.x, this.image.leftMiddle.y, this.image.leftMiddle.width, this.image.leftMiddle.height, resource.body.pos.x - 32, resource.body.pos.y, ctx, 32)
		this.drawFarm(this.image.img, this.image.leftMiddle.x, this.image.leftMiddle.y, this.image.leftMiddle.width, this.image.leftMiddle.height, resource.body.pos.x - 32, resource.body.pos.y + 32, ctx, 32)
		this.drawFarm(this.image.img, this.image.leftMiddle.x, this.image.leftMiddle.y, this.image.leftMiddle.width, this.image.leftMiddle.height, resource.body.pos.x - 32, resource.body.pos.y + 64, ctx, 32)
		this.drawFarm(this.image.img, this.image.leftBottom.x, this.image.leftBottom.y, this.image.leftBottom.width, this.image.leftBottom.height, resource.body.pos.x - 32, resource.body.pos.y + 96, ctx, 32)

		for (var i = 0; i < 10; i++) {
			this.drawFarm(this.image.img, this.image.middleTop.x, this.image.middleTop.y, this.image.middleTop.width, this.image.middleTop.height, resource.body.pos.x + xOffset, resource.body.pos.y - 32, ctx, 32)
			xOffset+=32
		}
		xOffset = 0;

		for (i = 0; i < 10; i++) {
			this.drawFarm(this.image.img, this.image.bottomMiddle.x, this.image.bottomMiddle.y, this.image.bottomMiddle.width, this.image.bottomMiddle.height, resource.body.pos.x + xOffset, resource.body.pos.y + 96, ctx, 32)
			xOffset+=32
		}
		this.drawFarm(this.image.img, this.image.rightTop.x, this.image.rightTop.y, this.image.rightTop.width, this.image.rightTop.height, resource.body.pos.x + xOffset, resource.body.pos.y - 32, ctx, 32)
		
		this.drawFarm(this.image.img, this.image.rightMiddle.x, this.image.rightMiddle.y, this.image.rightMiddle.width, this.image.rightMiddle.height, resource.body.pos.x + xOffset, resource.body.pos.y, ctx, 32)
		this.drawFarm(this.image.img, this.image.rightMiddle.x, this.image.rightMiddle.y, this.image.rightMiddle.width, this.image.rightMiddle.height, resource.body.pos.x + xOffset, resource.body.pos.y + 32, ctx, 32)
		this.drawFarm(this.image.img, this.image.rightMiddle.x, this.image.rightMiddle.y, this.image.rightMiddle.width, this.image.rightMiddle.height, resource.body.pos.x + xOffset, resource.body.pos.y + 64, ctx, 32)
		this.drawFarm(this.image.img, this.image.bottomRight.x, this.image.bottomRight.y, this.image.bottomRight.width, this.image.bottomRight.height, resource.body.pos.x + xOffset, resource.body.pos.y + 96, ctx, 32)

		xOffset = 0;
		for (i = 0; i < 10; i++) {
			this.drawFarm(this.image.img, this.image.middle.x, this.image.middle.y, this.image.middle.width, this.image.middle.height, resource.body.pos.x + xOffset, resource.body.pos.y, ctx, 32)
			this.drawFarm(this.image.img, this.image.middle.x, this.image.middle.y, this.image.middle.width, this.image.middle.height, resource.body.pos.x + xOffset, resource.body.pos.y + 32, ctx, 32)
			this.drawFarm(this.image.img, this.image.middle.x, this.image.middle.y, this.image.middle.width, this.image.middle.height, resource.body.pos.x + xOffset, resource.body.pos.y + 64, ctx, 32)

			xOffset+=32
		}

	}

	drawPlants(resource, index, ctx) {
			this.drawFarm(this.image.img, this.image.pos.x, this.image.pos.y + (index * this.image.height), this.image.width, this.image.height, resource.body.pos.x, resource.body.pos.y - 40, ctx)

	}

	drawFarm(img, clipX, clipY, width, height, resourceX, resourceY, ctx) {
        ctx.drawImage(img, 
                      clipX,
                      clipY, 
                      width, 
                      height,
                      resourceX,
                      resourceY,
                      width, 
                      height,
                    );
       

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